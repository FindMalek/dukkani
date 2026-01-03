/*
  Warnings:

  - You are about to drop the column `endtime` on the `health` table. All the data in the column will be lost.
  - You are about to drop the column `starttime` on the `health` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerid` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customername` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerphone` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `storeid` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salesmetric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `storagefile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `storagefilevariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `storeplan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teammember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `telegramdisconnectconfirmation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `telegramotp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `whatsappmessage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end_time` to the `health` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `health` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_storeid_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_productid_fkey";

-- DropForeignKey
ALTER TABLE "orderitem" DROP CONSTRAINT "orderitem_orderid_fkey";

-- DropForeignKey
ALTER TABLE "orderitem" DROP CONSTRAINT "orderitem_productid_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customerid_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_storeid_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_storeid_fkey";

-- DropForeignKey
ALTER TABLE "salesmetric" DROP CONSTRAINT "salesmetric_storeid_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropForeignKey
ALTER TABLE "storagefilevariant" DROP CONSTRAINT "storagefilevariant_storagefileid_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_ownerid_fkey";

-- DropForeignKey
ALTER TABLE "storeplan" DROP CONSTRAINT "storeplan_storeid_fkey";

-- DropForeignKey
ALTER TABLE "teammember" DROP CONSTRAINT "teammember_storeid_fkey";

-- DropForeignKey
ALTER TABLE "teammember" DROP CONSTRAINT "teammember_userid_fkey";

-- DropForeignKey
ALTER TABLE "telegramdisconnectconfirmation" DROP CONSTRAINT "telegramdisconnectconfirmation_userId_fkey";

-- DropForeignKey
ALTER TABLE "telegramotp" DROP CONSTRAINT "telegramotp_userId_fkey";

-- DropForeignKey
ALTER TABLE "whatsappmessage" DROP CONSTRAINT "whatsappmessage_orderid_fkey";

-- AlterTable
ALTER TABLE "health" DROP COLUMN "endtime",
DROP COLUMN "starttime",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "createdAt",
DROP COLUMN "customerid",
DROP COLUMN "customername",
DROP COLUMN "customerphone",
DROP COLUMN "storeid",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_id" TEXT,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "customer_phone" TEXT NOT NULL,
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "customer";

-- DropTable
DROP TABLE "image";

-- DropTable
DROP TABLE "orderitem";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "salesmetric";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "storagefile";

-- DropTable
DROP TABLE "storagefilevariant";

-- DropTable
DROP TABLE "store";

-- DropTable
DROP TABLE "storeplan";

-- DropTable
DROP TABLE "teammember";

-- DropTable
DROP TABLE "telegramdisconnectconfirmation";

-- DropTable
DROP TABLE "telegramotp";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "verification";

-- DropTable
DROP TABLE "whatsappmessage";

-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL,
    "image" TEXT,
    "telegram_user_name" TEXT,
    "telegram_chat_id" TEXT,
    "onboarding_step" "UserOnboardingStep" NOT NULL DEFAULT 'STORE_SETUP',
    "telegram_linked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "scope" TEXT,
    "password" TEXT,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "id_token" TEXT,
    "access_token_expires_at" TIMESTAMP(3),
    "refresh_token_expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "verifications" (
    "_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_metrics" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "order_count" INTEGER NOT NULL,
    "total_sales" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "sales_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "stock" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storage_files" (
    "id" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "optimized_size" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storage_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "storage_file_variants" (
    "id" TEXT NOT NULL,
    "storage_file_id" TEXT NOT NULL,
    "variant" "StorageFileVariantType" NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "file_size" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storage_file_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "whatsapp_number" TEXT,
    "theme" "StoreTheme",
    "category" "StoreCategory",
    "notification_method" "StoreNotificationMethod" DEFAULT 'EMAIL',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_plans" (
    "id" TEXT NOT NULL,
    "plan_type" "StorePlanType" NOT NULL,
    "order_limit" INTEGER NOT NULL,
    "order_count" INTEGER NOT NULL DEFAULT 0,
    "reset_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "store_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" TEXT NOT NULL,
    "role" "TeamMemberRole" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telegram_otps" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "telegram_otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telegram_disconnect_confirmations" (
    "id" TEXT NOT NULL,
    "telegram_chat_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "telegram_disconnect_confirmations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatsapp_messages" (
    "id" TEXT NOT NULL,
    "status" "WhatsAppMessageStatus" NOT NULL,
    "content" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "whatsapp_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_chat_id_key" ON "users"("telegram_chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "customers_phone_store_id_key" ON "customers"("phone", "store_id");

-- CreateIndex
CREATE UNIQUE INDEX "sales_metrics_store_id_date_key" ON "sales_metrics"("store_id", "date");

-- CreateIndex
CREATE INDEX "storage_files_bucket_idx" ON "storage_files"("bucket");

-- CreateIndex
CREATE INDEX "storage_files_mime_type_idx" ON "storage_files"("mime_type");

-- CreateIndex
CREATE INDEX "storage_file_variants_storage_file_id_idx" ON "storage_file_variants"("storage_file_id");

-- CreateIndex
CREATE INDEX "storage_file_variants_variant_idx" ON "storage_file_variants"("variant");

-- CreateIndex
CREATE UNIQUE INDEX "storage_file_variants_storage_file_id_variant_key" ON "storage_file_variants"("storage_file_id", "variant");

-- CreateIndex
CREATE UNIQUE INDEX "stores_slug_key" ON "stores"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "store_plans_store_id_key" ON "store_plans"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_user_id_store_id_key" ON "team_members"("user_id", "store_id");

-- CreateIndex
CREATE UNIQUE INDEX "telegram_otps_code_key" ON "telegram_otps"("code");

-- CreateIndex
CREATE INDEX "telegram_otps_user_id_idx" ON "telegram_otps"("user_id");

-- CreateIndex
CREATE INDEX "telegram_otps_expires_at_idx" ON "telegram_otps"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "telegram_disconnect_confirmations_telegram_chat_id_key" ON "telegram_disconnect_confirmations"("telegram_chat_id");

-- CreateIndex
CREATE INDEX "telegram_disconnect_confirmations_expires_at_idx" ON "telegram_disconnect_confirmations"("expires_at");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_metrics" ADD CONSTRAINT "sales_metrics_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage_file_variants" ADD CONSTRAINT "storage_file_variants_storage_file_id_fkey" FOREIGN KEY ("storage_file_id") REFERENCES "storage_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_plans" ADD CONSTRAINT "store_plans_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telegram_otps" ADD CONSTRAINT "telegram_otps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telegram_disconnect_confirmations" ADD CONSTRAINT "telegram_disconnect_confirmations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatsapp_messages" ADD CONSTRAINT "whatsapp_messages_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
