-- CreateIndex
CREATE INDEX "order_item_bundle_children_child_variant_id_idx" ON "order_item_bundle_children"("child_variant_id");

-- CreateIndex
CREATE INDEX "order_items_product_variant_id_idx" ON "order_items"("product_variant_id");
