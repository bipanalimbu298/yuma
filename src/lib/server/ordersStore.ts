import type { Order, OrderStatus, PaymentMethod } from "@/types/order.types";

declare global {
  // eslint-disable-next-line no-var
  var __BCC_ORDERS_STORE__: Map<string, Order> | undefined;
}

export const ordersStore: Map<string, Order> =
  global.__BCC_ORDERS_STORE__ ?? new Map<string, Order>();

global.__BCC_ORDERS_STORE__ = ordersStore;

export function generateOrderId(): string {
  return (
    "BCC-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).slice(2, 8).toUpperCase()
  );
}

export function paymentPendingStatus(method: PaymentMethod): OrderStatus {
  if (method === "cod") return "pending";
  return "payment_pending";
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const order = ordersStore.get(orderId);
  if (!order) return;
  ordersStore.set(orderId, { ...order, status });
}

