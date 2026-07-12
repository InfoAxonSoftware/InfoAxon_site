ALTER TABLE "Product" ADD COLUMN "seoTitle" TEXT, ADD COLUMN "seoDescription" TEXT, ADD COLUMN "canonicalPath" TEXT, ADD COLUMN "ogImage" TEXT, ADD COLUMN "indexable" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Solution" ADD COLUMN "seoTitle" TEXT, ADD COLUMN "seoDescription" TEXT, ADD COLUMN "canonicalPath" TEXT, ADD COLUMN "ogImage" TEXT, ADD COLUMN "indexable" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Project" ADD COLUMN "seoTitle" TEXT, ADD COLUMN "seoDescription" TEXT, ADD COLUMN "canonicalPath" TEXT, ADD COLUMN "ogImage" TEXT, ADD COLUMN "indexable" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Advertisement" ADD COLUMN "seoTitle" TEXT, ADD COLUMN "seoDescription" TEXT, ADD COLUMN "canonicalPath" TEXT, ADD COLUMN "ogImage" TEXT, ADD COLUMN "indexable" BOOLEAN NOT NULL DEFAULT false;
