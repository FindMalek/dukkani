"use client";

import { SupportedCurrency } from "@dukkani/i18n";
import { Button } from "@dukkani/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@dukkani/ui/components/drawer";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FilterProductsForm } from "@/components/app/filter-products-form";

interface ProductSectionHeaderProps {
  storeCurrency: SupportedCurrency;
  categories: { id: string; name: string }[];
  title?: string;
}

export function ProductSectionHeader({
  title,
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
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{tFilter("drawerTitle")}</DrawerTitle>
            </DrawerHeader>
            <div className="mx-auto w-full max-w-sm sm:max-w-md">
              <FilterProductsForm
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
