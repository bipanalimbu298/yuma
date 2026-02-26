"use client";

import React, { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";

const PriceSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const min = 0;
  const max = 500;

  const defaultRange = useMemo<[number, number]>(() => {
    const minPrice = Number(searchParams.get("minPrice") ?? "");
    const maxPrice = Number(searchParams.get("maxPrice") ?? "");
    const left = Number.isFinite(minPrice) ? Math.max(min, minPrice) : min;
    const right = Number.isFinite(maxPrice) ? Math.min(max, maxPrice) : max;
    return [left, right];
  }, [searchParams]);

  const commit = (range: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    const [a, b] = range;
    if (a <= min) params.delete("minPrice");
    else params.set("minPrice", String(a));
    if (b >= max) params.delete("maxPrice");
    else params.set("maxPrice", String(b));
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4" contentClassName="overflow-visible">
          <Slider
            defaultValue={defaultRange}
            min={min}
            max={max}
            step={1}
            label="$"
            onValueCommit={commit}
          />
          <div className="mb-3" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
