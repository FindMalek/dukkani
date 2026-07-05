-- CreateEnum
CREATE TYPE "Governorate" AS ENUM ('TUNIS', 'ARIANA', 'BEN_AROUS', 'MANOUBA', 'NABEUL', 'ZAGHOUAN', 'BIZERTE', 'BEJA', 'JENDOUBA', 'KEF', 'SILIANA', 'KAIROUAN', 'KASSERINE', 'SIDI_BOUZID', 'SOUSSE', 'MONASTIR', 'MAHDIA', 'SFAX', 'GABES', 'MEDENINE', 'TATAOUINE', 'GAFSA', 'TOZEUR', 'KEBILI');

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "governorate" "Governorate";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "notes" TEXT;
