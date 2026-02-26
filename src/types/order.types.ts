import type { CartItem } from "@/lib/features/carts/cartsSlice";

export type PaymentMethod = "cod" | "khalti" | "esewa";

export type OrderStatus =
  | "pending"
  | "payment_pending"
  | "payment_failed"
  | "paid"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type ShippingInfo = {
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  shipping: ShippingInfo;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paymentRef?: string;
};
