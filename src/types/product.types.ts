export type Discount = {
  amount: number;
  percentage: number;
};

/** Women: dresses, tops, ethnic, casual, winter, accessories. Kids: girls, boys, baby, seasonal */
export type ProductCategory =
  | "women-dresses"
  | "women-tops"
  | "women-ethnic"
  | "women-casual"
  | "women-winter"
  | "women-accessories"
  | "kids-girls"
  | "kids-boys"
  | "kids-baby"
  | "kids-seasonal";

export type ProductColorOption = {
  name: string;
  /** Hex color (e.g. #111827) */
  hex: string;
};

export type ProductVariant = {
  id: string;
  size: string;
  color: string;
  stock: number;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  description?: string;
  /** Optional: for filtering by Women/Kids subcategory */
  category?: ProductCategory;
  /** Optional: mark as new arrival */
  isNew?: boolean;
  /** Optional: clothing options */
  options?: {
    sizes: string[];
    colors: ProductColorOption[];
  };
  /** Optional: stock by size/color variant */
  variants?: ProductVariant[];
};
