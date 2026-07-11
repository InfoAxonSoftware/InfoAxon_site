import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { validate } from '../validators/common.js';

const router = Router();
const productSelect = { id:true, name:true, slug:true, shortDescription:true, fullDescription:true, specifications:true, price:true, warranty:true, stockQuantity:true, stockStatus:true, imageUrl:true, featured:true, displayOrder:true, category:true };
router.get('/products', async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1); const limit = Math.min(48, Math.max(1, Number(req.query.limit) || 12));
  const where = { enabled: true, ...(req.query.search && { name: { contains: String(req.query.search), mode:'insensitive' } }), ...(req.query.category && { category: { slug: String(req.query.category) } }), ...(req.query.featured === 'true' && { featured:true }) };
  if (req.query.minPrice || req.query.maxPrice) where.price = { ...(req.query.minPrice && { gte:Number(req.query.minPrice) }), ...(req.query.maxPrice && { lte:Number(req.query.maxPrice) }) };
  if (req.query.stock === 'in') where.stockQuantity = { gt:0 }; if (req.query.stock === 'out') where.stockQuantity = 0;
  const orderBy = req.query.sort === 'price-asc' ? { price:'asc' } : req.query.sort === 'price-desc' ? { price:'desc' } : req.query.sort === 'newest' ? { createdAt:'desc' } : [{ displayOrder:'asc' }, { name:'asc' }];
  const [items,total] = await Promise.all([prisma.product.findMany({ where, select:productSelect, orderBy, skip:(page-1)*limit, take:limit }), prisma.product.count({ where })]);
  res.json({ items, pagination:{ page, limit, total, pages:Math.ceil(total/limit) } });
});
router.get('/categories', async (req,res) => res.json(await prisma.productCategory.findMany({ where:{enabled:true}, orderBy:[{displayOrder:'asc'},{name:'asc'}] })));
router.get('/software-packages', async (req,res) => res.json(await prisma.softwarePackage.findMany({ where:{enabled:true}, include:{features:{orderBy:{displayOrder:'asc'}},addons:{orderBy:{displayOrder:'asc'}}}, orderBy:{displayOrder:'asc'} })));
router.get('/compatibility-rules', async (req,res) => res.json(await prisma.compatibilityRule.findMany({ where:{enabled:true}, include:{category:true,suggestedProduct:true,alternatives:{include:{product:true}}}, orderBy:{displayOrder:'asc'} })));
router.get('/erp-key-features', async (req,res) => res.json(await prisma.erpKeyFeature.findMany({ where:{enabled:true}, orderBy:{displayOrder:'asc'} })));
router.get('/solutions', async (req,res) => res.json(await prisma.solution.findMany({ where:{enabled:true}, orderBy:{displayOrder:'asc'} })));
router.get('/projects', async (req,res) => res.json(await prisma.project.findMany({ where:{enabled:true}, orderBy:{displayOrder:'asc'} })));
router.get('/company', async (req,res) => res.json(await prisma.companyInfo.findUnique({where:{id:'company'}})));
router.get('/settings', async (req,res) => res.json(await prisma.websiteSetting.findMany()));

const inquirySchema = z.object({ fullName:z.string().min(2).max(120), email:z.string().email(), inquiryType:z.string().min(2).max(80), message:z.string().min(2).max(5000) });
router.post('/inquiries', validate(inquirySchema), async (req,res) => res.status(201).json(await prisma.contactInquiry.create({data:req.body})));
const quotationSchema = z.object({ customerName:z.string().min(2).max(120), businessName:z.string().min(1).max(160), phone:z.string().min(5).max(40), email:z.string().email(), location:z.string().min(2).max(200), purchaseType:z.enum(['software','hardware','complete']), softwarePackageId:z.string().nullable().optional(), items:z.array(z.object({productId:z.string(),quantity:z.number().int().min(1).max(100)})).max(100), notes:z.string().max(5000).optional() });
router.post('/quotations', validate(quotationSchema), async (req,res) => {
  const ids = req.body.items.map(i=>i.productId); const products = await prisma.product.findMany({where:{OR:[{id:{in:ids}},{slug:{in:ids}}],enabled:true}}); const byId = new Map(products.flatMap(p=>[[p.id,p],[p.slug,p]]));
  if (products.length !== new Set(ids).size) return res.status(400).json({message:'One or more products are unavailable'});
  const pkg = req.body.softwarePackageId ? await prisma.softwarePackage.findFirst({where:{OR:[{id:req.body.softwarePackageId},{slug:req.body.softwarePackageId}],enabled:true}}) : null;
  if (req.body.purchaseType !== 'hardware' && !pkg) return res.status(400).json({message:'Select a valid software package'});
  const softwarePrice = pkg ? Number(pkg.startingPrice) : 0;
  const hardwareTotal = req.body.items.reduce((sum,item)=>sum + Number(byId.get(item.productId).price)*item.quantity,0);
  const quotation = await prisma.quotationRequest.create({data:{customerName:req.body.customerName,businessName:req.body.businessName,phone:req.body.phone,email:req.body.email,location:req.body.location,purchaseType:req.body.purchaseType,softwarePackageId:pkg?.id,softwareName:pkg?.name,softwarePrice,estimatedTotal:softwarePrice+hardwareTotal,notes:req.body.notes,items:{create:req.body.items.map(item=>{const p=byId.get(item.productId);return{productId:p.id,productName:p.name,quantity:item.quantity,unitPrice:p.price,lineTotal:Number(p.price)*item.quantity}})}},include:{items:true,softwarePackage:true}});
  res.status(201).json(quotation);
});
export default router;
