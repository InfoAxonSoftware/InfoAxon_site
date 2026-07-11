ALTER TABLE "Product" ADD COLUMN "compatibilityType" TEXT;
UPDATE "Product" SET "compatibilityType"=COALESCE("specifications"->>'compatibilityType', "categoryId");
