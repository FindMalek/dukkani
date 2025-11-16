/*
  Warnings:

  - You are about to drop the `todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WhatsAppMessageStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED');

-- CreateEnum
CREATE TYPE "TeamMemberRole" AS ENUM ('OWNER', 'ADMIN', 'MANAGER', 'STAFF');

-- CreateEnum
CREATE TYPE "StorePlanType" AS ENUM ('FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "StoreCategory" AS ENUM ('FASHION', 'ELECTRONICS', 'FOOD', 'HOME', 'BEAUTY', 'SPORTS', 'BOOKS', 'TOYS', 'OTHER');

-- CreateEnum
CREATE TYPE "StoreTheme" AS ENUM ('LIGHT', 'DARK', 'MINIMAL', 'MODERN', 'CLASSIC');

-- DropTable
DROP TABLE "todo";

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storeid" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salesmetric" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "ordercount" INTEGER NOT NULL,
    "totalsales" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storeid" TEXT NOT NULL,

    CONSTRAINT "salesmetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "customername" TEXT NOT NULL,
    "customerphone" TEXT NOT NULL,
    "address" TEXT,
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeid" TEXT NOT NULL,
    "customerid" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderitem" (
    "id" TEXT NOT NULL,
    "orderid" TEXT NOT NULL,
    "productid" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orderitem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "stock" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeid" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productid" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "whatsappnumber" TEXT,
    "theme" "StoreTheme",
    "category" "StoreCategory",
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerid" TEXT NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storeplan" (
    "id" TEXT NOT NULL,
    "plantype" "StorePlanType" NOT NULL,
    "orderlimit" INTEGER NOT NULL,
    "ordercount" INTEGER NOT NULL DEFAULT 0,
    "resetAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeid" TEXT NOT NULL,

    CONSTRAINT "storeplan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teammember" (
    "id" TEXT NOT NULL,
    "role" "TeamMemberRole" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userid" TEXT NOT NULL,
    "storeid" TEXT NOT NULL,

    CONSTRAINT "teammember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatsappmessage" (
    "id" TEXT NOT NULL,
    "status" "WhatsAppMessageStatus" NOT NULL,
    "content" TEXT NOT NULL,
    "messageid" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sentat" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderid" TEXT NOT NULL,

    CONSTRAINT "whatsappmessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_phone_storeid_key" ON "customer"("phone", "storeid");

-- CreateIndex
CREATE UNIQUE INDEX "salesmetric_storeid_date_key" ON "salesmetric"("storeid", "date");

-- CreateIndex
CREATE UNIQUE INDEX "store_slug_key" ON "store"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "storeplan_storeid_key" ON "storeplan"("storeid");

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesmetric" ADD CONSTRAINT "salesmetric_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerid_fkey" FOREIGN KEY ("customerid") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderitem" ADD CONSTRAINT "orderitem_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderitem" ADD CONSTRAINT "orderitem_productid_fkey" FOREIGN KEY ("productid") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_productid_fkey" FOREIGN KEY ("productid") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storeplan" ADD CONSTRAINT "storeplan_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teammember" ADD CONSTRAINT "teammember_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teammember" ADD CONSTRAINT "teammember_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatsappmessage" ADD CONSTRAINT "whatsappmessage_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
