"use client";

import { cn } from "@/lib/utils";
import React from "react";
import SizeGuideDialog from "./SizeGuideDialog";

const SizeSelection = ({
  sizes,
  value,
  onChange,
}: {
  sizes: string[];
  value: string;
  onChange: (size: string) => void;
}) => {

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm sm:text-base text-black/60">Choose Size</span>
        <SizeGuideDialog />
      </div>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {sizes.map((size, index) => (
          <button
            key={index}
            type="button"
            className={cn([
              "bg-[#F0F0F0] flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px]",
              value === size && "bg-black font-medium text-white",
            ])}
            onClick={() => onChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
