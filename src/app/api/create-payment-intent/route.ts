import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to env." },
      { status: 503 }
    );
  }
  try {
    const { amount } = await request.json();
    const totalCents = Math.round(Number(amount) * 100);
    if (totalCents < 50) {
      return NextResponse.json({ error: "Amount too small" }, { status: 400 });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { source: "bipana-checkout" },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Payment intent failed" }, { status: 500 });
  }
}
