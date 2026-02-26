import { WHATSAPP_URL } from "@/lib/constants/social";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppFloatingButton() {
  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
    >
      <FaWhatsapp className="text-2xl" />
    </Link>
  );
}

