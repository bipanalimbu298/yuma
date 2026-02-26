"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const SizeSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("size") ?? "";

  const setSize = (size: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!size || size === selected) params.delete("size");
    else params.set("size", size);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Size
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex items-center flex-wrap">
            {[
              "XS",
              "S",
              "M",
              "L",
              "XL",
              "1-2Y",
              "3-4Y",
              "5-6Y",
              "7-8Y",
              "9-10Y",
            ].map((size, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  "bg-[#F0F0F0] m-1 flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px]",
                  selected === size && "bg-black font-medium text-white",
                ])}
                onClick={() => setSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
