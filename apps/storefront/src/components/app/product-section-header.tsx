"use client";

import { store } from "@dukkani/common/schemas";
import { Button } from "@dukkani/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@dukkani/ui/components/drawer";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FilterProductsForm } from "@/components/app/filter-products-form";

interface ProductSectionHeaderProps {
  storeId: string;
  storeCurrency: store.SupportedCurrencyInfer;
  categories: { id: string; name: string }[];
  title?: string;
}

export function ProductSectionHeader({
  title,
  storeId,
  storeCurrency,
  categories,
}: ProductSectionHeaderProps) {
  const tFilter = useTranslations("storefront.store.filter");
  const tProducts = useTranslations("storefront.store.products");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const sectionTitle = title ?? tProducts("title");

  return (
    <div className="container mx-auto mb-4 px-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">{sectionTitle}</h2>
        <Drawer open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">
              {tFilter("button")}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[85vh]">
            <div className="mx-auto flex w-full max-w-sm flex-col sm:max-w-md">
              <FilterProductsForm
                storeId={storeId}
                storeCurrency={storeCurrency}
                categories={categories}
                handleCloseDrawer={() => setFilterDrawerOpen(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
