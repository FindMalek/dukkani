-- CreateEnum
CREATE TYPE "StorageFileVariantType" AS ENUM ('THUMBNAIL', 'SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "storagefile" (
    "id" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "originalurl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "filesize" INTEGER NOT NULL,
    "optimizedsize" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storagefile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storagefilevariant" (
    "id" TEXT NOT NULL,
    "storagefileid" TEXT NOT NULL,
    "variant" "StorageFileVariantType" NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "filesize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storagefilevariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "storagefile_bucket_idx" ON "storagefile"("bucket");

-- CreateIndex
CREATE INDEX "storagefile_mimetype_idx" ON "storagefile"("mimetype");

-- CreateIndex
CREATE INDEX "storagefilevariant_storagefileid_idx" ON "storagefilevariant"("storagefileid");

-- CreateIndex
CREATE INDEX "storagefilevariant_variant_idx" ON "storagefilevariant"("variant");

-- CreateIndex
CREATE UNIQUE INDEX "storagefilevariant_storagefileid_variant_key" ON "storagefilevariant"("storagefileid", "variant");

-- AddForeignKey
ALTER TABLE "storagefilevariant" ADD CONSTRAINT "storagefilevariant_storagefileid_fkey" FOREIGN KEY ("storagefileid") REFERENCES "storagefile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
