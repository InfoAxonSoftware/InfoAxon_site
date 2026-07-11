import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
const router = Router();
router.use(requireAdmin);
router.get('/overview', async (req,res) => {
  const [totalProducts,inStock,outOfStock,featured,categories,packages,inquiries,quotations,projects,solutions,recentInquiries,recentQuotations,recentProducts] = await Promise.all([
    prisma.product.count(),prisma.product.count({where:{stockQuantity:{gt:0}}}),prisma.product.count({where:{stockQuantity:0}}),prisma.product.count({where:{featured:true}}),prisma.productCategory.count(),prisma.softwarePackage.count({where:{enabled:true}}),prisma.contactInquiry.count(),prisma.quotationRequest.count(),prisma.project.count(),prisma.solution.count(),prisma.contactInquiry.findMany({take:5,orderBy:{createdAt:'desc'}}),prisma.quotationRequest.findMany({take:5,orderBy:{createdAt:'desc'},include:{softwarePackage:true}}),prisma.product.findMany({take:5,orderBy:{updatedAt:'desc'},include:{category:true}})
  ]);
  res.json({counts:{totalProducts,inStock,outOfStock,featured,categories,packages,inquiries,quotations,projects,solutions},recentInquiries,recentQuotations,recentProducts});
});
router.post('/uploads',upload.single('image'),(req,res)=>req.file?res.status(201).json({imageUrl:`/uploads/${req.file.filename}`}):res.status(400).json({message:'Select an image to upload'}));
const resources={
  products:{model:'product',include:{category:true},orderBy:[{displayOrder:'asc'},{updatedAt:'desc'}]},categories:{model:'productCategory',include:{_count:{select:{products:true}}},orderBy:{displayOrder:'asc'}},packages:{model:'softwarePackage',include:{features:{orderBy:{displayOrder:'asc'}},addons:{orderBy:{displayOrder:'asc'}}},orderBy:{displayOrder:'asc'}},features:{model:'packageFeature',include:{package:true},orderBy:{displayOrder:'asc'}},addons:{model:'packageAddon',include:{package:true},orderBy:{displayOrder:'asc'}},compatibility:{model:'compatibilityRule',include:{category:true,suggestedProduct:true,alternatives:{include:{product:true}}},orderBy:{displayOrder:'asc'}},'erp-features':{model:'erpKeyFeature',orderBy:{displayOrder:'asc'}},solutions:{model:'solution',orderBy:{displayOrder:'asc'}},projects:{model:'project',orderBy:{displayOrder:'asc'}},inquiries:{model:'contactInquiry',orderBy:{createdAt:'desc'}},quotations:{model:'quotationRequest',include:{softwarePackage:true,items:true},orderBy:{createdAt:'desc'}},settings:{model:'websiteSetting',orderBy:{key:'asc'}}
};
for(const [path,c] of Object.entries(resources)){
  router.get(`/${path}`,async(req,res)=>res.json(await prisma[c.model].findMany({include:c.include,orderBy:c.orderBy})));
  router.get(`/${path}/:id`,async(req,res)=>{const item=await prisma[c.model].findUnique({where:{id:req.params.id},include:c.include});item?res.json(item):res.status(404).json({message:'Record not found'});});
  router.post(`/${path}`,async(req,res)=>res.status(201).json(await prisma[c.model].create({data:req.body,include:c.include})));
  router.put(`/${path}/:id`,async(req,res)=>res.json(await prisma[c.model].update({where:{id:req.params.id},data:req.body,include:c.include})));
  router.delete(`/${path}/:id`,async(req,res)=>{await prisma[c.model].delete({where:{id:req.params.id}});res.status(204).end();});
}
router.get('/company',async(req,res)=>res.json(await prisma.companyInfo.findUnique({where:{id:'company'}})));
router.put('/company',async(req,res)=>res.json(await prisma.companyInfo.upsert({where:{id:'company'},create:{id:'company',...req.body},update:req.body})));
export default router;
