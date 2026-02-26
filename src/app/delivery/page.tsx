import { integralCF } from "@/styles/fonts";
import Link from "next/link";

export const metadata = {
  title: "Delivery & Returns",
  description: "Yuma Clothing delivery and returns policy.",
};

export default function DeliveryPage() {
  return (
    <main className="max-w-frame mx-auto px-4 py-16">
      <h1 className={integralCF.className + " text-3xl font-bold mb-6"}>Delivery & Returns</h1>
      <div className="prose prose-sm text-black/80 space-y-4">
        <p>We deliver across Nepal. Standard delivery is free on orders above a certain value.</p>
        <p>Returns and exchanges are accepted within 7 days of delivery for unused items with tags attached.</p>
      </div>
      <Link href="/" className="inline-block mt-6 text-black/60 hover:underline">← Back to home</Link>
    </main>
  );
}
