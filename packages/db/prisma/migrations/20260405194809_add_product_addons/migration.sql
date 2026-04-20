-- CreateEnum
CREATE TYPE "ProductAddonSelectionType" AS ENUM ('SINGLE', 'MULTIPLE');

-- CreateTable
CREATE TABLE "order_item_addons" (
    "id" TEXT NOT NULL,
    "order_item_id" TEXT NOT NULL,
    "addon_option_id" TEXT,
    "group_name_snapshot" TEXT NOT NULL,
    "option_name_snapshot" TEXT NOT NULL,
    "price_delta_snapshot" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_item_addons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_addon_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "selection_type" "ProductAddonSelectionType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_version_id" TEXT NOT NULL,

    CONSTRAINT "product_addon_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_addon_options" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "price_delta" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "group_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_addon_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_item_addons_order_item_id_idx" ON "order_item_addons"("order_item_id");

-- CreateIndex
CREATE INDEX "order_item_addons_addon_option_id_idx" ON "order_item_addons"("addon_option_id");

-- CreateIndex
CREATE INDEX "product_addon_groups_product_version_id_idx" ON "product_addon_groups"("product_version_id");

-- CreateIndex
CREATE INDEX "product_addon_options_group_id_idx" ON "product_addon_options"("group_id");

-- AddForeignKey
ALTER TABLE "order_item_addons" ADD CONSTRAINT "order_item_addons_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_addons" ADD CONSTRAINT "order_item_addons_addon_option_id_fkey" FOREIGN KEY ("addon_option_id") REFERENCES "product_addon_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_addon_groups" ADD CONSTRAINT "product_addon_groups_product_version_id_fkey" FOREIGN KEY ("product_version_id") REFERENCES "product_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_addon_options" ADD CONSTRAINT "product_addon_options_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "product_addon_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
