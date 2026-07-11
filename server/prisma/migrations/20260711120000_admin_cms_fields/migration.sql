ALTER TABLE "CompatibilityRule" ADD COLUMN "name" TEXT;
UPDATE "CompatibilityRule" SET "name" = COALESCE(NULLIF("message", ''), 'Compatibility rule');
ALTER TABLE "CompatibilityRule" ALTER COLUMN "name" SET NOT NULL;
ALTER TABLE "CompatibilityRule" ADD COLUMN "productId" TEXT;
ALTER TABLE "WebsiteSetting" ADD COLUMN "type" TEXT NOT NULL DEFAULT 'text';
ALTER TABLE "WebsiteSetting" ADD COLUMN "enabled" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "WebsiteSetting" ADD COLUMN "description" TEXT;
ALTER TABLE "PackageFeature" ADD COLUMN "enabled" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "CompatibilityRule" ADD CONSTRAINT "CompatibilityRule_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
