"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { integralCF } from "@/styles/fonts";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import type { PaymentMethod, ShippingInfo } from "@/types/order.types";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, adjustedTotalPrice, totalPrice } = useAppSelector((state: RootState) => state.carts);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ShippingInfo>({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nepal",
  });

  const discount = Math.round(totalPrice - adjustedTotalPrice);
  const isEmpty = !cart || cart.items.length === 0;

  const submitEsewaForm = (formUrl: string, fields: Record<string, string>) => {
    const formEl = document.createElement("form");
    formEl.method = "POST";
    formEl.action = formUrl;
    Object.entries(fields).forEach(([k, v]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = v;
      formEl.appendChild(input);
    });
    document.body.appendChild(formEl);
    formEl.submit();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmpty) return;
    setLoading(true);
    setError(null);
    try {
      const payload = {
        items: cart.items,
        subtotal: totalPrice,
        discount,
        total: Math.round(adjustedTotalPrice),
        shipping: form,
      };

      if (paymentMethod === "cod") {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, paymentMethod: "cod" }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Order failed");
        router.push(`/order/confirmation?orderId=${data.orderId}`);
        return;
      }

      if (paymentMethod === "khalti") {
        const res = await fetch("/api/payments/khalti/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, paymentMethod: "khalti" }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Khalti payment failed");
        window.location.href = data.paymentUrl;
        return;
      }

      if (paymentMethod === "esewa") {
        const res = await fetch("/api/payments/esewa/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, paymentMethod: "esewa" }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "eSewa payment failed");
        submitEsewaForm(data.formUrl, data.fields);
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isEmpty) {
    return (
      <main className="pb-20 max-w-frame mx-auto px-4">
        <p className="my-12">Your cart is empty.</p>
        <Button asChild><Link href="/shop">Continue Shopping</Link></Button>
      </main>
    );
  }

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <h1 className={integralCF.className + " font-bold text-2xl md:text-[32px] mb-6 uppercase"}>
          Checkout
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <section className="rounded-[20px] border border-black/10 p-6">
              <h2 className="font-bold text-lg mb-4">Shipping information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InputGroup className="bg-[#F0F0F0]">
                  <InputGroup.Input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="bg-transparent"
                  />
                </InputGroup>
                <InputGroup className="bg-[#F0F0F0]">
                  <InputGroup.Input
                    required
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="bg-transparent"
                  />
                </InputGroup>
                <InputGroup className="bg-[#F0F0F0] sm:col-span-2">
                  <InputGroup.Input
                    required
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="bg-transparent"
                  />
                </InputGroup>
                <InputGroup className="bg-[#F0F0F0] sm:col-span-2">
                  <InputGroup.Input
                    required
                    type="text"
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    className="bg-transparent"
                  />
                </InputGroup>
                <InputGroup className="bg-[#F0F0F0]">
                  <InputGroup.Input
                    required
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="bg-transparent"
                  />
                </InputGroup>
                <InputGroup className="bg-[#F0F0F0]">
                  <InputGroup.Input
                    type="text"
                    placeholder="State / Province"
                    value={form.state ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                    className="bg-transparent"
                  />
                </InputGroup>
                <InputGroup className="bg-[#F0F0F0]">
                  <InputGroup.Input
                    required
                    type="text"
                    placeholder="Postal code"
                    value={form.postalCode}
                    onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                    className="bg-transparent"
                  />
                </InputGroup>
                <InputGroup className="bg-[#F0F0F0]">
                  <InputGroup.Input
                    required
                    type="text"
                    placeholder="Country"
                    value={form.country}
                    onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    className="bg-transparent"
                  />
                </InputGroup>
              </div>
            </section>
            <section className="rounded-[20px] border border-black/10 p-6">
              <h2 className="font-bold text-lg mb-4">Payment method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="w-4 h-4"
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "khalti"}
                    onChange={() => setPaymentMethod("khalti")}
                    className="w-4 h-4"
                  />
                  <span>Pay with Khalti</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "esewa"}
                    onChange={() => setPaymentMethod("esewa")}
                    className="w-4 h-4"
                  />
                  <span>Pay with eSewa</span>
                </label>
              </div>
            </section>
          </div>
          <div className="lg:w-[380px]">
            <div className="rounded-[20px] border border-black/10 p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Order summary</h2>
              <p className="text-black/60 text-sm mb-2">{cart.items.length} items</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-black/60">Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount</span>
                    <span>-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-black/10 pt-2 mt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl">${Math.round(adjustedTotalPrice)}</span>
                </div>
              </div>
              {error && (
                <p className="text-red-600 text-sm mt-3">{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-6 rounded-full h-12 bg-black"
              >
                {loading
                  ? "Processing…"
                  : paymentMethod === "cod"
                  ? "Place order (COD)"
                  : paymentMethod === "khalti"
                  ? "Pay with Khalti"
                  : "Pay with eSewa"}
              </Button>
              <Link href="/cart" className="block text-center text-sm text-black/60 mt-3">
                Back to cart
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
