import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';
import { validate } from '../validators/common.js';

const router=Router();
const required=z.string().trim().min(1).max(5000);
const optional=z.string().trim().max(1000).nullable().optional().transform(v=>v||null);
const order=z.coerce.number().int().min(0).max(100000);
const featureSchema=z.object({number:required.max(20),title:required.max(200),description:required.max(2000),imageUrl:optional,enabled:z.boolean(),displayOrder:order}).strict();
const packageFeatureSchema=z.object({text:required.max(500),featured:z.boolean(),enabled:z.boolean(),displayOrder:order}).strict();
const addonSchema=z.object({text:required.max(500),displayOrder:order}).strict();
const packageSchema=z.object({name:required.max(160),slug:required.max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),startingPrice:z.coerce.number().finite().min(0).max(999999999),suitableFor:required.max(500),summary:required.max(2000),supportPeriod:required.max(200),licenceNote:optional,mostPopular:z.boolean(),enabled:z.boolean(),displayOrder:order,features:z.array(packageFeatureSchema).max(200),addons:z.array(addonSchema).max(100)}).strict();
const solutionSchema=z.object({title:required.max(200),shortTitle:optional,slug:required.max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),description:required,icon:optional,imageUrl:optional,enabled:z.boolean(),displayOrder:order,keyFeatures:z.array(featureSchema).max(100),packages:z.array(packageSchema).max(3,'A solution supports up to 3 pricing packages')}).strict();
const include={keyFeatures:{orderBy:[{displayOrder:'asc'},{number:'asc'}]},packages:{include:{features:{orderBy:{displayOrder:'asc'}},addons:{orderBy:{displayOrder:'asc'}}},orderBy:[{displayOrder:'asc'},{name:'asc'}]}};

router.get('/',async(req,res)=>res.json(await prisma.solution.findMany({include,orderBy:[{displayOrder:'asc'},{title:'asc'}]})));
router.get('/:id',async(req,res)=>{const item=await prisma.solution.findUnique({where:{id:req.params.id},include});item?res.json(item):res.status(404).json({message:'Solution not found'})});
const save=async(req,res)=>{
  const {keyFeatures,packages,...solutionData}=req.body;
  const result=await prisma.$transaction(async tx=>{
    const solution=req.params.id
      ? await tx.solution.update({where:{id:req.params.id},data:solutionData})
      : await tx.solution.create({data:solutionData});
    if(req.params.id){
      await tx.solutionKeyFeature.deleteMany({where:{solutionId:solution.id}});
      await tx.softwarePackage.deleteMany({where:{solutionId:solution.id}});
    }
    if(keyFeatures.length)await tx.solutionKeyFeature.createMany({data:keyFeatures.map(row=>({...row,solutionId:solution.id}))});
    for(const pkg of packages){
      const {features,addons,...packageData}=pkg;
      await tx.softwarePackage.create({data:{...packageData,solutionId:solution.id,features:{create:features},addons:{create:addons}}});
    }
    return tx.solution.findUnique({where:{id:solution.id},include});
  });
  res.status(req.params.id?200:201).json(result);
};
router.post('/',validate(solutionSchema),save);
router.put('/:id',validate(solutionSchema),save);
router.patch('/:id/status',validate(z.object({enabled:z.boolean()}).strict()),async(req,res)=>res.json(await prisma.solution.update({where:{id:req.params.id},data:{enabled:req.body.enabled},select:{id:true,enabled:true}})));
router.delete('/:id',async(req,res)=>{await prisma.solution.delete({where:{id:req.params.id}});res.status(204).end()});
export default router;
