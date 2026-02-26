import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
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
  paymentMethod: "esewa";
};

function hmacBase64(secret: string, message: string) {
  return crypto.createHmac("sha256", secret).update(message).digest("base64");
}

export async function POST(request: NextRequest) {
  try {
    const productCode = process.env.ESEWA_PRODUCT_CODE;
    const secret = process.env.ESEWA_SECRET_KEY;
    const formUrl =
      process.env.ESEWA_FORM_URL ??
      "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    if (!productCode || !secret) {
      return NextResponse.json(
        { error: "eSewa is not configured. Set ESEWA_PRODUCT_CODE and ESEWA_SECRET_KEY in env." },
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
      paymentMethod: "esewa",
      status: paymentPendingStatus("esewa"),
    };
    ordersStore.set(orderId, order);

    // eSewa signature fields: total_amount,transaction_uuid,product_code
    const total_amount = String(order.total);
    const transaction_uuid = orderId; // must be alphanumeric + hyphen
    const signed_field_names = "total_amount,transaction_uuid,product_code";
    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${productCode}`;
    const signature = hmacBase64(secret, message);

    return NextResponse.json({
      orderId,
      formUrl,
      fields: {
        amount: String(order.total),
        tax_amount: "0",
        total_amount,
        transaction_uuid,
        product_code: productCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: `${origin}/api/payments/esewa/callback`,
        failure_url: `${origin}/checkout?error=payment_failed&provider=esewa`,
        signed_field_names,
        signature,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

