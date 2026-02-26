"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_COLORS } from "@/lib/data/products";

const ColorsSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("color") ?? "";

  const setColor = (colorName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!colorName || colorName.toLowerCase() === selected.toLowerCase()) {
      params.delete("color");
    } else {
      params.set("color", colorName);
    }
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex space-2.5 flex-wrap md:grid grid-cols-5 gap-2.5">
            {DEFAULT_COLORS.map((color, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-black/20",
                ])}
                onClick={() => setColor(color.name)}
                style={{ backgroundColor: color.hex }}
                aria-label={`Filter color ${color.name}`}
              >
                {selected.toLowerCase() === color.name.toLowerCase() && (
                  <IoMdCheckmark
                    className={cn([
                      "text-base",
                      color.name.toLowerCase() === "white"
                        ? "text-black"
                        : "text-white",
                    ])}
                  />
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;
