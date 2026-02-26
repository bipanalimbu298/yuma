import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import { FACEBOOK_URL, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants/social";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Yuma Clothing.",
};

export default function ContactPage() {
  return (
    <main className="max-w-frame mx-auto px-4 py-16">
      <h1 className={integralCF.className + " text-3xl font-bold mb-6"}>Contact Us</h1>
      <p className="text-black/70 mb-4">Yuma Clothing — Ladies & Kids Clothing</p>
      <ul className="space-y-2 text-black/70">
        <li>
          Instagram:{" "}
          <a href={INSTAGRAM_URL} className="text-black underline" rel="noreferrer">
            @bipanaangdembe
          </a>
        </li>
        <li>
          Facebook:{" "}
          <a href={FACEBOOK_URL} className="text-black underline" rel="noreferrer">
            Yuma Clothing
          </a>
        </li>
        <li>
          WhatsApp:{" "}
          <a href={WHATSAPP_URL} className="text-black underline" rel="noreferrer">
            Chat on WhatsApp
          </a>
        </li>
      </ul>
      <Link href="/" className="inline-block mt-6 text-black/60 hover:underline">← Back to home</Link>
    </main>
  );
}
