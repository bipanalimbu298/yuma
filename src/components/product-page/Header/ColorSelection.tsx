"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import type { ProductColorOption } from "@/types/product.types";

const ColorSelection = ({
  colors,
  value,
  onChange,
}: {
  colors: ProductColorOption[];
  value: string;
  onChange: (colorName: string) => void;
}) => {

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Select Colors
      </span>
      <div className="flex items-center flex-wrap space-x-3 sm:space-x-4">
        {colors.map((color, index) => (
          <button
            key={index}
            type="button"
            className={cn([
              "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-black/10",
            ])}
            onClick={() => onChange(color.name)}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select color ${color.name}`}
          >
            {value === color.name && (
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
    </div>
  );
};

export default ColorSelection;
