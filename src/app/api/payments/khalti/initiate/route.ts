import { NextRequest, NextResponse } from "next/server";
import type { Order } from "@/types/order.types";
import {
  generateOrderId,
  ordersStore,
  paymentPendingStatus,
} from "@/lib/server/ordersStore";

type InitiateBody = {
  items: Order["items"];
  subtotal: number;
  discount: number;
  total: number;
  shipping: Order["shipping"];
  paymentMethod: "khalti";
};

export async function POST(request: NextRequest) {
  try {
    const khaltiKey = process.env.KHALTI_SECRET_KEY;
    if (!khaltiKey) {
      return NextResponse.json(
        { error: "Khalti is not configured. Set KHALTI_SECRET_KEY in env." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as InitiateBody;
    if (!body?.items?.length || !body?.shipping?.name || !body?.shipping?.email) {
      return NextResponse.json({ error: "Missing order details" }, { status: 400 });
    }

    const origin = request.nextUrl.origin;
    const orderId = generateOrderId();

    const order: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: body.items,
      subtotal: Number(body.subtotal) || 0,
      discount: Number(body.discount) || 0,
      total: Number(body.total) || 0,
      shipping: body.shipping,
      paymentMethod: "khalti",
      status: paymentPendingStatus("khalti"),
    };
    ordersStore.set(orderId, order);

    const apiBase = process.env.KHALTI_API_BASE_URL ?? "https://dev.khalti.com/api/v2";
    const amountPaisa = Math.round(order.total * 100);

    const resp = await fetch(`${apiBase}/epayment/initiate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${khaltiKey}`,
      },
      body: JSON.stringify({
        return_url: `${origin}/api/payments/khalti/callback`,
        website_url: origin,
        amount: amountPaisa,
        purchase_order_id: orderId,
        purchase_order_name: "Yuma Clothing Order",
        customer_info: {
          name: order.shipping.name,
          email: order.shipping.email,
          phone: order.shipping.phone,
        },
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Khalti initiate error:", data);
      return NextResponse.json({ error: "Khalti initiate failed" }, { status: 502 });
    }

    return NextResponse.json({
      orderId,
      paymentUrl: data.payment_url,
      pidx: data.pidx,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

