ALTER TABLE "Solution" ADD COLUMN "shortTitle" TEXT;
ALTER TABLE "SoftwarePackage" ADD COLUMN "solutionId" TEXT;

CREATE TABLE "SolutionKeyFeature" (
  "id" TEXT NOT NULL,
  "solutionId" TEXT NOT NULL,
  "number" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT,
  "enabled" BOOLEAN NOT NULL DEFAULT true,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SolutionKeyFeature_pkey" PRIMARY KEY ("id")
);

UPDATE "SoftwarePackage"
SET "solutionId" = (SELECT "id" FROM "Solution" WHERE "slug" = 'custom-erp-pos' LIMIT 1)
WHERE "slug" IN ('erp-starter','erp-professional','erp-enterprise');

INSERT INTO "SolutionKeyFeature" ("id","solutionId","number","title","description","imageUrl","enabled","displayOrder","createdAt","updatedAt")
SELECT 'migrated-' || e."id", s."id", e."number", e."title", e."description", e."imageUrl", e."enabled", e."displayOrder", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "ErpKeyFeature" e
JOIN "Solution" s ON s."slug" = 'custom-erp-pos';

ALTER TABLE "SoftwarePackage" ADD CONSTRAINT "SoftwarePackage_solutionId_fkey"
  FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SolutionKeyFeature" ADD CONSTRAINT "SolutionKeyFeature_solutionId_fkey"
  FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
