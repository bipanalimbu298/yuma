import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  getProductsByCategory,
  getNewArrivals,
  getOnSale,
  getProductOptions,
} from "@/lib/data/products";
import { CATEGORY_LABELS } from "@/lib/constants/categories";
import type { Product, ProductCategory } from "@/types/product.types";

type SearchParams = {
  category?: string;
  new?: string;
  sale?: string;
  page?: string;
  size?: string;
  color?: string;
  minPrice?: string;
  maxPrice?: string;
};

function getEffectivePrice(product: Product): number {
  if (product.discount?.percentage > 0) {
    return Math.round(product.price - (product.price * product.discount.percentage) / 100);
  }
  if (product.discount?.amount > 0) {
    return Math.round(product.price - product.discount.amount);
  }
  return product.price;
}

function getFilteredProducts(searchParams: SearchParams) {
  let base: Product[];
  if (searchParams.new === "1") base = getNewArrivals();
  else if (searchParams.sale === "1") base = getOnSale();
  else {
    const category = searchParams.category as ProductCategory | undefined;
    base = getProductsByCategory(category || null);
  }

  const size = searchParams.size?.trim();
  const color = searchParams.color?.trim();
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : null;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : null;

  return base.filter((p) => {
    if (minPrice !== null && !Number.isNaN(minPrice) && getEffectivePrice(p) < minPrice) return false;
    if (maxPrice !== null && !Number.isNaN(maxPrice) && getEffectivePrice(p) > maxPrice) return false;

    if (size) {
      const opts = getProductOptions(p);
      if (!opts.sizes.includes(size)) return false;
    }
    if (color) {
      const opts = getProductOptions(p);
      if (!opts.colors.some((c) => c.name.toLowerCase() === color.toLowerCase())) return false;
    }
    return true;
  });
}

function getPageTitle(searchParams: SearchParams): string {
  if (searchParams.new === "1") return "New Arrivals";
  if (searchParams.sale === "1") return "On Sale";
  const cat = searchParams.category as ProductCategory | undefined;
  if (cat && CATEGORY_LABELS[cat]) return CATEGORY_LABELS[cat];
  return "Shop";
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = getFilteredProducts(searchParams);
  const title = getPageTitle(searchParams);
  const total = products.length;
  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(totalPages, Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1));
  const start = (page - 1) * pageSize;
  const paginatedProducts = products.slice(start, start + pageSize);
  const paginationQuery = new URLSearchParams(
    Object.fromEntries(
      Object.entries(searchParams).filter(([k, v]) => v && k !== "page")
    )
  ).toString();
  const pageLink = (p: number) => (paginationQuery ? `?${paginationQuery}&page=${p}` : `?page=${p}`);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters />
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">{title}</h1>
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {start + 1}-{Math.min(start + pageSize, total)} of {total} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select defaultValue="most-popular">
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <>
                <hr className="border-t-black/10" />
                <Pagination className="justify-between">
                  <PaginationPrevious
                    href={page > 1 ? pageLink(page - 1) : "#"}
                    className="border border-black/10"
                  />
                  <PaginationContent>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href={pageLink(p)}
                            className="text-black/50 font-medium text-sm"
                            isActive={p === page}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                  </PaginationContent>
                  <PaginationNext
                    href={page < totalPages ? pageLink(page + 1) : "#"}
                    className="border border-black/10"
                  />
                </Pagination>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
