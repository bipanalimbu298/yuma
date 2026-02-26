import { NextRequest, NextResponse } from "next/server";
import type { Order } from "@/types/order.types";
import {
  generateOrderId,
  ordersStore,
  paymentPendingStatus,
} from "@/lib/server/ordersStore";
import { getSupabaseAdmin } from "@/lib/server/supabaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, subtotal, discount, total, shipping, paymentMethod } = body;
    if (!items?.length || !shipping?.email || !shipping?.name || !shipping?.address) {
      return NextResponse.json(
        { error: "Missing required fields: items, shipping (email, name, address)" },
        { status: 400 }
      );
    }
    const orderId = generateOrderId();
    const order: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items,
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      total: Number(total) || 0,
      shipping: {
        email: shipping.email,
        name: shipping.name,
        phone: shipping.phone || "",
        address: shipping.address,
        city: shipping.city || "",
        state: shipping.state,
        postalCode: shipping.postalCode || "",
        country: shipping.country || "Nepal",
      },
      paymentMethod:
        paymentMethod === "khalti"
          ? "khalti"
          : paymentMethod === "esewa"
          ? "esewa"
          : "cod",
      status: paymentPendingStatus(
        paymentMethod === "khalti"
          ? "khalti"
          : paymentMethod === "esewa"
          ? "esewa"
          : "cod"
      ),
    };
    ordersStore.set(orderId, order);

    // Persist to Supabase if configured (recommended for production)
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error: orderErr } = await supabase.from("orders").insert({
          id: order.id,
          created_at: order.createdAt,
          status: order.status,
          payment_method: order.paymentMethod,
          payment_ref: order.paymentRef ?? null,
          subtotal: order.subtotal,
          discount: order.discount,
          total: order.total,
          shipping: order.shipping,
        });
        if (orderErr) throw orderErr;

        const { error: itemsErr } = await supabase.from("order_items").insert(
          order.items.map((i) => ({
            order_id: order.id,
            product_id: i.id,
            name: i.name,
            src_url: i.srcUrl,
            price: i.price,
            quantity: i.quantity,
            attributes: i.attributes ?? [],
            discount: i.discount,
          }))
        );
        if (itemsErr) throw itemsErr;
      }
    } catch (e) {
      console.error("Supabase order persist failed:", e);
    }

    // Send order confirmation email (placeholder: call send API)
    try {
      await fetch(new URL("/api/send-order-email", request.url).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, order, event: "order_created" }),
      });
    } catch {
      // ignore email failure
    }

    return NextResponse.json({ orderId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("orderId");
  if (orderId) {
    // Try Supabase first
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("orders")
          .select("*, order_items(*)")
          .eq("id", orderId)
          .maybeSingle();
        if (error) throw error;
        if (data) {
          const mapped = {
            id: data.id,
            createdAt: data.created_at,
            status: data.status,
            paymentMethod: data.payment_method,
            paymentRef: data.payment_ref ?? undefined,
            subtotal: Number(data.subtotal ?? 0),
            discount: Number(data.discount ?? 0),
            total: Number(data.total ?? 0),
            shipping: data.shipping,
            items: (data.order_items ?? []).map((i: any) => ({
              id: i.product_id,
              name: i.name,
              srcUrl: i.src_url,
              price: Number(i.price ?? 0),
              quantity: Number(i.quantity ?? 1),
              attributes: i.attributes ?? [],
              discount: i.discount ?? { amount: 0, percentage: 0 },
            })),
          };
          return NextResponse.json(mapped);
        }
      }
    } catch (e) {
      console.error("Supabase order fetch failed:", e);
    }

    const order = ordersStore.get(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json(order);
  }
  // List all (for admin; in production protect with auth)
  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json(data ?? []);
    }
  } catch (e) {
    console.error("Supabase orders list failed:", e);
  }
  const list = Array.from(ordersStore.values());
  return NextResponse.json(list);
}
