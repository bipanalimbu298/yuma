import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { ordersStore, updateOrderStatus } from "@/lib/server/ordersStore";

function hmacBase64(secret: string, message: string) {
  return crypto.createHmac("sha256", secret).update(message).digest("base64");
}

function buildMessage(payload: Record<string, unknown>, signedFieldNames: string) {
  const fields = signedFieldNames.split(",").map((s) => s.trim());
  return fields
    .map((f) => `${f}=${payload[f] ?? ""}`)
    .join(",");
}

export async function GET(request: NextRequest) {
  const secret = process.env.ESEWA_SECRET_KEY;
  if (!secret) {
    return NextResponse.redirect(new URL("/checkout?error=esewa_not_configured", request.url));
  }

  const origin = request.nextUrl.origin;
  const dataParam = request.nextUrl.searchParams.get("data");
  if (!dataParam) {
    return NextResponse.redirect(new URL("/checkout?error=missing_esewa_data", origin));
  }

  try {
    const decoded = Buffer.from(dataParam, "base64").toString("utf8");
    const payload = JSON.parse(decoded) as Record<string, unknown>;

    const signed_field_names = String(payload.signed_field_names ?? "");
    const signature = String(payload.signature ?? "");
    const message = buildMessage(payload, signed_field_names);
    const expected = hmacBase64(secret, message);

    const orderId = String(payload.transaction_uuid ?? "");
    const status = String(payload.status ?? "");
    const transactionCode = String(payload.transaction_code ?? "");

    if (!orderId) {
      return NextResponse.redirect(new URL("/checkout?error=invalid_esewa_order", origin));
    }

    if (expected !== signature) {
      console.error("eSewa signature mismatch", { orderId, message, expected, signature });
      updateOrderStatus(orderId, "payment_failed");
      return NextResponse.redirect(new URL(`/checkout?error=payment_failed&provider=esewa`, origin));
    }

    if (status === "COMPLETE") {
      const order = ordersStore.get(orderId);
      if (order) {
        ordersStore.set(orderId, { ...order, status: "paid", paymentRef: transactionCode || orderId });
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
      return NextResponse.redirect(
        new URL(`/order/confirmation?orderId=${encodeURIComponent(orderId)}`, origin)
      );
    }

    updateOrderStatus(orderId, "payment_failed");
    return NextResponse.redirect(new URL(`/checkout?error=payment_failed&provider=esewa`, origin));
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL(`/checkout?error=payment_failed&provider=esewa`, origin));
  }
}

