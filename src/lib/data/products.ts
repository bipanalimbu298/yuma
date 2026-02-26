import type { Product, ProductColorOption } from "@/types/product.types";

const noDiscount = { amount: 0, percentage: 0 };

export const WOMEN_SIZES = ["XS", "S", "M", "L", "XL"] as const;
export const KIDS_SIZES = ["1-2Y", "3-4Y", "5-6Y", "7-8Y", "9-10Y"] as const;

export const DEFAULT_COLORS: ProductColorOption[] = [
  { name: "Black", hex: "#111827" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Beige", hex: "#E7D8C9" },
  { name: "Navy", hex: "#1E3A8A" },
];

export const allProducts: Product[] = [
  // Women - Dresses
  {
    id: 1,
    title: "Floral Midi Dress",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 120,
    discount: noDiscount,
    rating: 4.5,
    category: "women-dresses",
    isNew: true,
  },
  {
    id: 2,
    title: "Skinny Fit Jeans",
    srcUrl: "/images/pic2.png",
    gallery: ["/images/pic2.png"],
    price: 260,
    discount: { amount: 0, percentage: 20 },
    rating: 3.5,
    category: "women-casual",
  },
  {
    id: 3,
    title: "Checks Shirt",
    srcUrl: "/images/pic3.png",
    gallery: ["/images/pic3.png"],
    price: 180,
    discount: noDiscount,
    rating: 4.5,
    category: "women-tops",
    isNew: true,
  },
  {
    id: 4,
    title: "Sleeve Striped T-shirt",
    srcUrl: "/images/pic4.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 160,
    discount: { amount: 0, percentage: 30 },
    rating: 4.5,
    category: "women-tops",
  },
  // Women - more
  {
    id: 5,
    title: "Vertical Striped Shirt",
    srcUrl: "/images/pic5.png",
    gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
    price: 232,
    discount: { amount: 0, percentage: 20 },
    rating: 5.0,
    category: "women-casual",
  },
  {
    id: 6,
    title: "Courage Graphic T-shirt",
    srcUrl: "/images/pic6.png",
    gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: noDiscount,
    rating: 4.0,
    category: "women-casual",
  },
  {
    id: 7,
    title: "Loose Fit Bermuda Shorts",
    srcUrl: "/images/pic7.png",
    gallery: ["/images/pic7.png"],
    price: 80,
    discount: noDiscount,
    rating: 3.0,
    category: "women-casual",
  },
  {
    id: 8,
    title: "Faded Skinny Jeans",
    srcUrl: "/images/pic8.png",
    gallery: ["/images/pic8.png"],
    price: 210,
    discount: noDiscount,
    rating: 4.5,
    category: "women-casual",
  },
  // Women ethnic / winter
  {
    id: 9,
    title: "Kurti with Palazzo",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png"],
    price: 185,
    discount: { amount: 0, percentage: 15 },
    rating: 4.5,
    category: "women-ethnic",
  },
  {
    id: 10,
    title: "Winter Cardigan",
    srcUrl: "/images/pic2.png",
    gallery: ["/images/pic2.png"],
    price: 299,
    discount: noDiscount,
    rating: 4.8,
    category: "women-winter",
    isNew: true,
  },
  {
    id: 11,
    title: "Scarf Set",
    srcUrl: "/images/pic3.png",
    gallery: ["/images/pic3.png"],
    price: 45,
    discount: noDiscount,
    rating: 4.2,
    category: "women-accessories",
  },
  // Kids
  {
    id: 12,
    title: "Polo with Contrast Trims",
    srcUrl: "/images/pic12.png",
    gallery: ["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"],
    price: 242,
    discount: { amount: 0, percentage: 20 },
    rating: 4.0,
    category: "kids-boys",
  },
  {
    id: 13,
    title: "Gradient Graphic T-shirt",
    srcUrl: "/images/pic13.png",
    gallery: ["/images/pic13.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: noDiscount,
    rating: 3.5,
    category: "kids-girls",
  },
  {
    id: 14,
    title: "Polo with Tipping Details",
    srcUrl: "/images/pic14.png",
    gallery: ["/images/pic14.png"],
    price: 180,
    discount: noDiscount,
    rating: 4.5,
    category: "kids-boys",
    isNew: true,
  },
  {
    id: 15,
    title: "Black Striped T-shirt",
    srcUrl: "/images/pic15.png",
    gallery: ["/images/pic15.png"],
    price: 150,
    discount: { amount: 0, percentage: 30 },
    rating: 5.0,
    category: "kids-girls",
  },
  {
    id: 16,
    title: "Baby Romper Set",
    srcUrl: "/images/pic4.png",
    gallery: ["/images/pic4.png"],
    price: 95,
    discount: noDiscount,
    rating: 4.6,
    category: "kids-baby",
  },
  {
    id: 17,
    title: "Seasonal Rain Jacket",
    srcUrl: "/images/pic5.png",
    gallery: ["/images/pic5.png"],
    price: 165,
    discount: { amount: 0, percentage: 10 },
    rating: 4.3,
    category: "kids-seasonal",
  },
  {
    id: 18,
    title: "Girls Party Dress",
    srcUrl: "/images/pic6.png",
    gallery: ["/images/pic6.png"],
    price: 199,
    discount: noDiscount,
    rating: 4.7,
    category: "kids-girls",
    isNew: true,
  },
];

export function getProductsByCategory(category: string | null): Product[] {
  if (!category) return allProducts;
  return allProducts.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return allProducts.filter((p) => p.isNew);
}

export function getOnSale(): Product[] {
  return allProducts.filter(
    (p) => p.discount.percentage > 0 || p.discount.amount > 0
  );
}

export function getProductById(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = product.category
    ? allProducts.filter(
        (p) => p.category === product.category && p.id !== product.id
      )
    : allProducts.filter((p) => p.id !== product.id);
  return sameCategory.slice(0, limit);
}

export function getProductOptions(product: Product): {
  sizes: string[];
  colors: ProductColorOption[];
} {
  if (product.options?.sizes?.length && product.options?.colors?.length) {
    return { sizes: product.options.sizes, colors: product.options.colors };
  }
  const isKids = product.category?.startsWith("kids");
  return {
    sizes: [...(isKids ? KIDS_SIZES : WOMEN_SIZES)],
    colors: DEFAULT_COLORS,
  };
}
