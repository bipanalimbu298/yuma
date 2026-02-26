import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, ordersStore } from "@/lib/server/ordersStore";

export async function GET(request: NextRequest) {
  const khaltiKey = process.env.KHALTI_SECRET_KEY;
  if (!khaltiKey) {
    return NextResponse.redirect(new URL("/checkout?error=khalti_not_configured", request.url));
  }

  const origin = request.nextUrl.origin;
  const pidx = request.nextUrl.searchParams.get("pidx");
  const orderId =
    request.nextUrl.searchParams.get("purchase_order_id") ||
    request.nextUrl.searchParams.get("purchase_order_id".toLowerCase());

  if (!pidx || !orderId) {
    return NextResponse.redirect(new URL("/checkout?error=missing_payment_params", origin));
  }

  try {
    const apiBase = process.env.KHALTI_API_BASE_URL ?? "https://dev.khalti.com/api/v2";
    const resp = await fetch(`${apiBase}/epayment/lookup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${khaltiKey}`,
      },
      body: JSON.stringify({ pidx }),
    });
    const data = await resp.json();

    if (resp.ok && data.status === "Completed") {
      const order = ordersStore.get(orderId);
      if (order) {
        ordersStore.set(orderId, { ...order, status: "paid", paymentRef: data.transaction_id ?? pidx });
      } else {
        updateOrderStatus(orderId, "paid");
      }
      try {
        const updated = ordersStore.get(orderId);
        if (updated) {
          await fetch(`${origin}/api/send-order-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, order: updated, event: "payment_confirmed" }),
          });
        }
      } catch {
        // ignore email failures
      }
      return NextResponse.redirect(new URL(`/order/confirmation?orderId=${encodeURIComponent(orderId)}`, origin));
    }

    console.error("Khalti lookup failed:", data);
    updateOrderStatus(orderId, "payment_failed");
    return NextResponse.redirect(new URL(`/checkout?error=payment_failed&provider=khalti`, origin));
  } catch (e) {
    console.error(e);
    updateOrderStatus(orderId, "payment_failed");
    return NextResponse.redirect(new URL(`/checkout?error=payment_failed&provider=khalti`, origin));
  }
}

