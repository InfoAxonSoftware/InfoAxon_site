import {PrismaClient} from '@prisma/client';
import {hardwareProducts} from '../../src/data/hardwareData.js';
const prisma=new PrismaClient();
const slugify=v=>v.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
async function main(){
 let imported=0;
 for(let i=0;i<hardwareProducts.length;i++){
  const p=hardwareProducts[i],categorySlug=slugify(p.category);
  const category=await prisma.productCategory.upsert({where:{slug:categorySlug},update:{name:p.category},create:{name:p.category,slug:categorySlug,displayOrder:i+1}});
  const slug=slugify(p.id||p.name);
  const existing=await prisma.product.findFirst({where:{OR:[{slug},{name:p.name}]}});
  const data={name:p.name,categoryId:category.id,shortDescription:p.spec||p.name,fullDescription:p.spec||null,price:Number(p.price)||0,warranty:p.warranty||null,stockQuantity:p.inStock?10:0,stockStatus:p.inStock?'IN_STOCK':'OUT_OF_STOCK',imageUrl:p.image||null,compatibilityType:p.compatibilityType||categorySlug,featured:Boolean(p.featured),enabled:true,displayOrder:i+1};
  if(existing)await prisma.product.update({where:{id:existing.id},data});
  else await prisma.product.create({data:{...data,slug,specifications:{}}});
  imported++;
 }
 console.log('Hardware import complete:',imported,'products');
}
main().finally(()=>prisma.$disconnect());
