ALTER TABLE "Advertisement" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "Advertisement" ADD COLUMN "fitMode" TEXT NOT NULL DEFAULT 'contain';
ALTER TABLE "Advertisement" ADD COLUMN "positionX" TEXT NOT NULL DEFAULT 'center';
ALTER TABLE "Advertisement" ADD COLUMN "positionY" TEXT NOT NULL DEFAULT 'center';
