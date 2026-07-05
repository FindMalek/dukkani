-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "name_manually_set" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "customer_name_variants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normalized_name" TEXT NOT NULL,
    "times_used" INTEGER NOT NULL DEFAULT 1,
    "first_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_used_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "customer_name_variants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_name_variants_customer_id_normalized_name_key" ON "customer_name_variants"("customer_id", "normalized_name");

-- AddForeignKey
ALTER TABLE "customer_name_variants" ADD CONSTRAINT "customer_name_variants_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
