import { NextRequest, NextResponse } from "next/server";
import type { Order } from "@/types/order.types";
import { ADMIN_NOTIFICATION_EMAIL } from "@/lib/constants/social";

/**
 * Sends order confirmation email.
 * Configure RESEND_API_KEY in env to use Resend, or replace with SendGrid/Khalti etc.
 */
export async function POST(request: NextRequest) {
  try {
    const { orderId, order, event } = (await request.json()) as {
      orderId: string;
      order: Order;
      event?: "order_created" | "payment_confirmed" | "order_updated";
    };
    if (!order?.shipping?.email) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const from =
        process.env.RESEND_FROM ||
        "Yuma Clothing <bipanal834@gmail.com>";

      const customerSubject =
        event === "payment_confirmed"
          ? `Payment confirmed – ${orderId} | Yuma Clothing`
          : event === "order_updated"
          ? `Order update – ${orderId} | Yuma Clothing`
          : `Order received – ${orderId} | Yuma Clothing`;

      const customerHeading =
        event === "payment_confirmed"
          ? "Payment confirmed"
          : event === "order_updated"
          ? "Order update"
          : "Thank you for your order";

      const customerEmail = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from,
          to: [order.shipping.email],
          subject: customerSubject,
          html: `
            <h1>${customerHeading}</h1>
            <p>Order ID: <strong>${orderId}</strong></p>
            <p>Total: $${order.total}</p>
            <p>Payment: ${
              order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"
            }</p>
            <p>We’ll notify you when your order is confirmed and shipped.</p>
            <p>— Yuma Clothing</p>
          `,
        }),
      });

      const adminSubject =
        event === "payment_confirmed"
          ? `Payment confirmed – ${orderId} | Yuma Clothing`
          : event === "order_updated"
          ? `Order updated – ${orderId} | Yuma Clothing`
          : `New order – ${orderId} | Yuma Clothing`;

      const adminHeading =
        event === "payment_confirmed"
          ? "Payment confirmed"
          : event === "order_updated"
          ? "Order updated"
          : "New Order";

      const adminEmail = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from,
          to: [ADMIN_NOTIFICATION_EMAIL],
          subject: adminSubject,
          html: `
            <h1>${adminHeading}</h1>
            <p>Order ID: <strong>${orderId}</strong></p>
            <p>Customer: ${order.shipping.name} (${order.shipping.email})</p>
            <p>Phone: ${order.shipping.phone || "-"}</p>
            <p>Total: $${order.total}</p>
            <p>Payment: ${
              order.paymentMethod === "cod" ? "COD" : "Online"
            }</p>
            <p>Address: ${order.shipping.address}, ${order.shipping.city}, ${
              order.shipping.country
            }</p>
            <hr />
            <p>Items:</p>
            <ul>
              ${order.items
                .map(
                  (i) =>
                    `<li>${i.name} × ${i.quantity} (${i.attributes?.join(
                      ", "
                    )})</li>`
                )
                .join("")}
            </ul>
          `,
        }),
      });

      if (!customerEmail.ok || !adminEmail.ok) {
        const err = await (customerEmail.ok
          ? adminEmail.text()
          : customerEmail.text());
        console.error("Resend error:", err);
        return NextResponse.json({ ok: false }, { status: 500 });
      }
    } else {
      // No Resend key: log only (dev)
      console.log("[Email] Order confirmation:", orderId, "to", order.shipping.email);
      console.log("[Email] Admin notification:", orderId, "to", ADMIN_NOTIFICATION_EMAIL);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
