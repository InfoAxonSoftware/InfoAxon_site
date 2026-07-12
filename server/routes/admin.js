import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { validate } from '../validators/common.js';
import adminSolutions from './admin-solutions.js';
import adminProducts from './admin-products.js';
import adminRequests from './admin-requests.js';
import adminAdvertisements from './admin-advertisements.js';
import adminProjects from './admin-projects.js';

const router = Router();
router.use(requireAdmin);
router.use('/solutions',adminSolutions);
router.use('/products',adminProducts);
router.use('/advertisements',adminAdvertisements);
router.use('/projects',adminProjects);
router.use(adminRequests);
const text = (min=1,max=5000) => z.string().trim().min(min).max(max);
const optionalText = (max=5000) => z.string().trim().max(max).nullable().optional().transform(v=>v||null);
const bool = z.boolean().optional().default(false);
const order = z.coerce.number().int().min(0).max(100000).optional().default(0);
const money = z.coerce.number().finite().min(0).max(999999999);
const nullableId = z.string().trim().nullable().optional().transform(v=>v||null);
const jsonRecord = z.record(z.string(), z.unknown()).nullable().optional();
const rowFeature = z.object({id:z.string().optional(),text:text(1,500),featured:bool,enabled:z.boolean().optional().default(true),displayOrder:order}).strict();
const rowAddon = z.object({id:z.string().optional(),text:text(1,500),displayOrder:order}).strict();

const schemas = {
  products:z.object({name:text(1,160),slug:text(1,160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),categoryId:text(),shortDescription:text(1,500),fullDescription:optionalText(),specifications:jsonRecord,price:money,warranty:optionalText(200),stockQuantity:z.coerce.number().int().min(0),stockStatus:z.enum(['IN_STOCK','LOW_STOCK','OUT_OF_STOCK','TO_ORDER']),imageUrl:optionalText(1000),featured:bool,enabled:z.boolean().optional().default(true),displayOrder:order}).strict(),
  categories:z.object({name:text(1,160),slug:text(1,160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),enabled:z.boolean().optional().default(true),displayOrder:order}).strict(),
  packages:z.object({name:text(1,160),slug:text(1,160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),startingPrice:money,suitableFor:text(1,500),summary:text(1,2000),supportPeriod:text(1,200),licenceNote:optionalText(500),mostPopular:bool,enabled:z.boolean().optional().default(true),displayOrder:order,features:z.array(rowFeature).max(200).default([]),addons:z.array(rowAddon).max(200).default([])}).strict(),
  features:z.object({packageId:text(),text:text(1,500),featured:bool,enabled:z.boolean().optional().default(true),displayOrder:order}).strict(),
  addons:z.object({packageId:text(),text:text(1,500),displayOrder:order}).strict(),
  compatibility:z.object({name:text(1,200),categoryId:nullableId,productId:nullableId,level:z.enum(['REQUIRED','RECOMMENDED']),message:text(1,500),explanation:text(1,2000),suggestedProductId:nullableId,allowOwnedConfirmation:bool,enabled:z.boolean().optional().default(true),displayOrder:order}).strict().refine(v=>Boolean(v.categoryId)!==Boolean(v.productId),{message:'Choose either a product category or a product',path:['categoryId']}),
  'erp-features':z.object({number:text(1,20),title:text(1,200),description:text(1,2000),imageUrl:optionalText(1000),enabled:z.boolean().optional().default(true),displayOrder:order}).strict(),
  solutions:z.object({slug:text(1,160),title:text(1,200),subtitle:optionalText(300),description:text(1,5000),icon:optionalText(100),imageUrl:optionalText(1000),content:jsonRecord,enabled:z.boolean().optional().default(true),displayOrder:order}).strict(),
  projects:z.object({slug:text(1,160),title:text(1,200),category:optionalText(200),description:text(1,5000),imageUrl:optionalText(1000),content:jsonRecord,featured:bool,enabled:z.boolean().optional().default(true),displayOrder:order}).strict(),
  settings:z.object({key:text(1,160).regex(/^[A-Za-z0-9_.-]+$/),value:z.unknown(),type:z.enum(['text','number','boolean','JSON']),enabled:z.boolean().optional().default(true),description:optionalText(500)}).strict()
};
const companySchema=z.object({name:text(1,200),phone:optionalText(50),whatsapp:optionalText(50),email:z.union([z.string().trim().email(),z.literal(''),z.null()]).optional().transform(v=>v||null),address:optionalText(1000),socialLinks:z.record(z.string(),z.string().max(1000)).nullable().optional(),footerDetails:optionalText(2000),content:z.record(z.string(),z.unknown()).nullable().optional()}).strict();
const mutable={};
const includes={};
const ordering={projects:{displayOrder:'asc'}};

router.get('/overview',async(req,res)=>{const [totalProducts,inStock,outOfStock,featured,categories,packages,inquiries,quotations,projects,solutions,recentInquiries,recentQuotations,recentProducts]=await Promise.all([prisma.product.count(),prisma.product.count({where:{stockQuantity:{gt:0}}}),prisma.product.count({where:{stockQuantity:0}}),prisma.product.count({where:{featured:true}}),prisma.productCategory.count(),prisma.softwarePackage.count({where:{enabled:true}}),prisma.contactInquiry.count(),prisma.quotationRequest.count(),prisma.project.count(),prisma.solution.count(),prisma.contactInquiry.findMany({take:5,orderBy:{createdAt:'desc'}}),prisma.quotationRequest.findMany({take:5,orderBy:{createdAt:'desc'}}),prisma.product.findMany({take:5,orderBy:{updatedAt:'desc'}})]);res.json({counts:{totalProducts,inStock,outOfStock,featured,categories,packages,inquiries,quotations,projects,solutions},recentInquiries,recentQuotations,recentProducts})});
router.post('/uploads',upload.single('image'),(req,res)=>req.file?res.status(201).json({imageUrl:'/uploads/'+req.file.filename}):res.status(400).json({message:'Select an image to upload'}));
router.get('/lookups',async(req,res)=>{const [categories,products]=await Promise.all([prisma.productCategory.findMany({select:{id:true,name:true}}),prisma.product.findMany({select:{id:true,name:true}})]);res.json({categories,products})});

const adminLoad = (message, code, query) => async (req, res, next) => {
  try { res.json(await query()); }
  catch (error) { error.safeMessage=message; error.apiCode=code; next(error); }
};

for(const [path,model] of Object.entries(mutable)){
  router.get('/'+path,async(req,res)=>res.json(await prisma[model].findMany({include:includes[path],orderBy:ordering[path]})));
  router.get('/'+path+'/:id',async(req,res)=>{const item=await prisma[model].findUnique({where:{id:req.params.id},include:includes[path]});item?res.json(item):res.status(404).json({message:'Record not found'})});
  router.post('/'+path,validate(schemas[path]),async(req,res)=>res.status(201).json(await prisma[model].create({data:req.body,include:includes[path]})));
  router.put('/'+path+'/:id',validate(schemas[path]),async(req,res)=>res.json(await prisma[model].update({where:{id:req.params.id},data:req.body,include:includes[path]})));
  router.delete('/'+path+'/:id',async(req,res)=>{if(path==='categories'){const children=await prisma.product.count({where:{categoryId:req.params.id}});if(children&&!['1','true'].includes(String(req.query.cascade)))return res.status(409).json({message:'This category still has products. Move or delete them before deleting the category.',requiresCascade:true,relatedCount:children})}await prisma[model].delete({where:{id:req.params.id}});res.status(204).end()});
}
router.get('/company',async(req,res)=>res.json(await prisma.companyInfo.findUnique({where:{id:'company'}})));
router.put('/company',validate(companySchema),async(req,res)=>{const {content,...canonical}=req.body;const cleaned={...(content||{})};['name','phone','whatsapp','email','address','socialLinks'].forEach(k=>delete cleaned[k]);res.json(await prisma.companyInfo.upsert({where:{id:'company'},create:{id:'company',...canonical,content:cleaned},update:{...canonical,content:cleaned}}))});
export default router;
