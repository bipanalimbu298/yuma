"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { integralCF } from "@/styles/fonts";
import type { Order } from "@/types/order.types";
import { useAppDispatch } from "@/lib/hooks/redux";
import { clearCart } from "@/lib/features/carts/cartsSlice";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(!!orderId);

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders?orderId=${encodeURIComponent(orderId)}`)
      .then((r) => r.ok ? r.json() : null)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [orderId]);

  useEffect(() => {
    if (order) {
      dispatch(clearCart());
    }
  }, [order, dispatch]);

  if (!orderId) {
    return (
      <main className="pb-20 max-w-frame mx-auto px-4 text-center py-16">
        <h1 className={integralCF.className + " text-2xl font-bold mb-4"}>No order ID</h1>
        <Button asChild><Link href="/">Go home</Link></Button>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="pb-20 max-w-frame mx-auto px-4 text-center py-16">
        <p>Loading order…</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="pb-20 max-w-frame mx-auto px-4 text-center py-16">
        <h1 className={integralCF.className + " text-2xl font-bold mb-4"}>Order not found</h1>
        <Button asChild><Link href="/">Go home</Link></Button>
      </main>
    );
  }

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="max-w-xl mx-auto text-center py-12">
          <h1 className={integralCF.className + " font-bold text-3xl md:text-4xl uppercase mb-2"}>
            Thank you
          </h1>
          <p className="text-black/60 mb-6">Your order has been placed.</p>
          <p className="font-mono text-lg font-semibold mb-8">Order ID: {order.id}</p>
          <div className="rounded-[20px] border border-black/10 p-6 text-left mb-8">
            <p className="text-black/60 text-sm mb-1">Total</p>
            <p className="text-2xl font-bold">${order.total}</p>
            <p className="text-black/60 text-sm mt-2">
              Payment:{" "}
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : order.paymentMethod === "khalti"
                ? "Khalti"
                : "eSewa"}
            </p>
            <p className="text-black/60 text-sm mt-1">
              Shipping to: {order.shipping.address}, {order.shipping.city}, {order.shipping.country}
            </p>
          </div>
          <p className="text-black/60 text-sm mb-6">
            If you provided an email address, we&apos;ll send your order details to {order.shipping.email}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full">
              <Link href="/shop">Continue shopping</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
