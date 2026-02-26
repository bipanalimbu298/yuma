import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FACEBOOK_URL, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants/social";

const footerLinksData: FooterLinks[] = [
  {
    id: 1,
    title: "shop",
    children: [
      { id: 11, label: "Women", url: "/shop?category=women-dresses" },
      { id: 12, label: "Kids", url: "/shop?category=kids-girls" },
      { id: 13, label: "New Arrivals", url: "/shop?new=1" },
      { id: 14, label: "Sale", url: "/shop?sale=1" },
    ],
  },
  {
    id: 2,
    title: "help",
    children: [
      { id: 21, label: "Contact Us", url: "/contact" },
      { id: 22, label: "Delivery & Returns", url: "/delivery" },
      { id: 23, label: "Terms & Conditions", url: "/terms" },
      { id: 24, label: "Privacy Policy", url: "/privacy" },
    ],
  },
  {
    id: 3,
    title: "connect",
    children: [
      { id: 31, label: "Instagram", url: INSTAGRAM_URL },
      { id: 32, label: "Facebook", url: FACEBOOK_URL },
      { id: 33, label: "WhatsApp", url: WHATSAPP_URL },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className="capitalize text-black/60 text-sm md:text-base mb-4 w-fit"
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
