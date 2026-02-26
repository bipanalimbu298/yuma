"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { integralCF } from "@/styles/fonts";
import type { Order } from "@/types/order.types";
import type { Product } from "@/types/product.types";

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/orders").then((r) => r.json()).then(setOrders).catch(() => setOrders([])),
      fetch("/api/products").then((r) => r.json()).then(setProducts).catch(() => setProducts([])),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen p-6">
        <p>Loading admin…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className={integralCF.className + " text-2xl font-bold"}>Yuma Admin</h1>
        <Link href="/" className="text-sm text-black/60 hover:underline">Back to store</Link>
      </div>
      <div className="flex gap-4 mb-6 border-b border-black/10">
        <button
          type="button"
          onClick={() => setTab("orders")}
          className={`pb-2 px-1 font-medium ${tab === "orders" ? "border-b-2 border-black" : "text-black/60"}`}
        >
          Orders ({Array.isArray(orders) ? orders.length : 0})
        </button>
        <button
          type="button"
          onClick={() => setTab("products")}
          className={`pb-2 px-1 font-medium ${tab === "products" ? "border-b-2 border-black" : "text-black/60"}`}
        >
          Products ({Array.isArray(products) ? products.length : 0})
        </button>
      </div>
      {tab === "orders" && (
        <div className="overflow-x-auto rounded-[20px] border border-black/10">
          {Array.isArray(orders) && orders.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F0F0F0]">
                <tr>
                  <th className="p-4 font-semibold">Order ID</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Customer</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold">Payment</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o: Order & { id: string }) => (
                  <tr key={o.id} className="border-t border-black/10">
                    <td className="p-4 font-mono">{o.id}</td>
                    <td className="p-4">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</td>
                    <td className="p-4">{o.shipping?.name ?? "—"}</td>
                    <td className="p-4">${o.total ?? 0}</td>
                    <td className="p-4">
                      {o.paymentMethod === "cod"
                        ? "COD"
                        : o.paymentMethod === "khalti"
                        ? "Khalti"
                        : "eSewa"}
                    </td>
                    <td className="p-4">{o.status ?? "pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-8 text-black/60">No orders yet.</p>
          )}
        </div>
      )}
      {tab === "products" && (
        <div className="overflow-x-auto rounded-[20px] border border-black/10">
          {Array.isArray(products) && products.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F0F0F0]">
                <tr>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Discount</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p: Product) => (
                  <tr key={p.id} className="border-t border-black/10">
                    <td className="p-4">{p.id}</td>
                    <td className="p-4">{p.title}</td>
                    <td className="p-4">{p.category ?? "—"}</td>
                    <td className="p-4">${p.price}</td>
                    <td className="p-4">{p.discount?.percentage ? `-${p.discount.percentage}%` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-8 text-black/60">No products.</p>
          )}
        </div>
      )}
      <p className="mt-6 text-xs text-black/50">
        To manage products in bulk, edit <code className="bg-black/5 px-1">src/lib/data/products.ts</code> or connect Supabase.
      </p>
    </main>
  );
}
