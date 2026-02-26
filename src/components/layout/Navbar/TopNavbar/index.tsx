import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/constants/social";

const data: NavMenu = [
  {
    id: 1,
    label: "Women",
    type: "MenuList",
    children: [
      { id: 11, label: "Dresses", url: "/shop?category=women-dresses" },
      { id: 12, label: "Tops", url: "/shop?category=women-tops" },
      { id: 13, label: "Ethnic", url: "/shop?category=women-ethnic" },
      { id: 14, label: "Casual", url: "/shop?category=women-casual" },
      { id: 15, label: "Winter", url: "/shop?category=women-winter" },
      { id: 16, label: "Accessories", url: "/shop?category=women-accessories" },
    ],
  },
  {
    id: 2,
    label: "Kids",
    type: "MenuList",
    children: [
      { id: 21, label: "Girls", url: "/shop?category=kids-girls" },
      { id: 22, label: "Boys", url: "/shop?category=kids-boys" },
      { id: 23, label: "Baby", url: "/shop?category=kids-baby" },
      { id: 24, label: "Seasonal", url: "/shop?category=kids-seasonal" },
    ],
  },
  { id: 3, type: "MenuItem", label: "New Arrivals", url: "/shop?new=1", children: [] },
  { id: 4, type: "MenuItem", label: "On Sale", url: "/shop?sale=1", children: [] },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            Yuma
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>
        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <div className="hidden md:flex items-center mr-2">
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-black/60 hover:text-black transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link>
            <Link
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-black/60 hover:text-black transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </Link>
          </div>
          <CartBtn />
          <Link href="/signin" className="p-1">
            <Image
              priority
              src="/icons/user.svg"
              height={100}
              width={100}
              alt="user"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
