import type { ProductCategory } from "@/types/product.types";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "women-dresses": "Dresses",
  "women-tops": "Tops",
  "women-ethnic": "Ethnic",
  "women-casual": "Casual",
  "women-winter": "Winter",
  "women-accessories": "Accessories",
  "kids-girls": "Girls",
  "kids-boys": "Boys",
  "kids-baby": "Baby",
  "kids-seasonal": "Seasonal",
};

export const WOMEN_CATEGORIES: ProductCategory[] = [
  "women-dresses",
  "women-tops",
  "women-ethnic",
  "women-casual",
  "women-winter",
  "women-accessories",
];

export const KIDS_CATEGORIES: ProductCategory[] = [
  "kids-girls",
  "kids-boys",
  "kids-baby",
  "kids-seasonal",
];

export const ALL_CATEGORIES: ProductCategory[] = [
  ...WOMEN_CATEGORIES,
  ...KIDS_CATEGORIES,
];
