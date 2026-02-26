import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "Women / Dresses",
    slug: "/shop?category=women-dresses",
  },
  {
    title: "Women / Tops",
    slug: "/shop?category=women-tops",
  },
  {
    title: "Women / Ethnic wear",
    slug: "/shop?category=women-ethnic",
  },
  {
    title: "Women / Winter wear",
    slug: "/shop?category=women-winter",
  },
  {
    title: "Kids / Girls",
    slug: "/shop?category=kids-girls",
  },
  {
    title: "Kids / Boys",
    slug: "/shop?category=kids-boys",
  },
  {
    title: "Kids / Baby",
    slug: "/shop?category=kids-baby",
  },
  {
    title: "Kids / Seasonal",
    slug: "/shop?category=kids-seasonal",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <Link
          key={idx}
          href={category.slug}
          className="flex items-center justify-between py-2"
        >
          {category.title} <MdKeyboardArrowRight />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;
