import { integralCF } from "@/styles/fonts";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Yuma Clothing.",
};

export default function TermsPage() {
  return (
    <main className="max-w-frame mx-auto px-4 py-16">
      <h1 className={integralCF.className + " text-3xl font-bold mb-6"}>Terms & Conditions</h1>
      <div className="prose prose-sm text-black/80 space-y-4">
        <p>By using Yuma Clothing you agree to these terms. We reserve the right to update them at any time.</p>
      </div>
      <Link href="/" className="inline-block mt-6 text-black/60 hover:underline">← Back to home</Link>
    </main>
  );
}
