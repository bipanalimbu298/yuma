import { integralCF } from "@/styles/fonts";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Yuma Clothing.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-frame mx-auto px-4 py-16">
      <h1 className={integralCF.className + " text-3xl font-bold mb-6"}>Privacy Policy</h1>
      <div className="prose prose-sm text-black/80 space-y-4">
        <p>We collect only the information needed to process your order and ship it. We do not sell your data.</p>
      </div>
      <Link href="/" className="inline-block mt-6 text-black/60 hover:underline">← Back to home</Link>
    </main>
  );
}
