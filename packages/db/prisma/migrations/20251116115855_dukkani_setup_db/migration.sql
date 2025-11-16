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

-- CreateTable
CREATE TABLE "customer" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "storeid" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salesmetric" (
    "id" BIGSERIAL NOT NULL,
    "storeid" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    "totalsales" DECIMAL(10,2) NOT NULL,
    "ordercount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "salesmetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" BIGSERIAL NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "customername" TEXT NOT NULL,
    "customerphone" TEXT NOT NULL,
    "address" TEXT,
    "notes" TEXT,
    "storeid" BIGINT NOT NULL,
    "customerid" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderitem" (
    "id" BIGSERIAL NOT NULL,
    "orderid" BIGINT NOT NULL,
    "productid" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderitem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "storeid" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" BIGSERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productid" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" "StoreCategory",
    "theme" "StoreTheme",
    "ownerid" TEXT NOT NULL,
    "whatsappnumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storeplan" (
    "id" BIGSERIAL NOT NULL,
    "storeid" BIGINT NOT NULL,
    "plantype" "StorePlanType" NOT NULL,
    "orderlimit" INTEGER NOT NULL,
    "ordercount" INTEGER NOT NULL DEFAULT 0,
    "resetAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storeplan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teammember" (
    "id" BIGSERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "storeid" BIGINT NOT NULL,
    "role" "TeamMemberRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teammember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatsappmessage" (
    "id" BIGSERIAL NOT NULL,
    "orderid" BIGINT NOT NULL,
    "messageid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "WhatsAppMessageStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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
