"use client";
import Link from "next/link";
import type { ElementType } from "react";

type Props = {
  href?: string;
  label?: string;
  icon?: ElementType; // icon component, e.g. HiOutlineUser
  iconClassName?: string;
  variant?: "light" | "dark";
};

export default function BtnStyleTwo({
  href = "#",
  label = "Click Me",
  icon: Icon,
  iconClassName = "w-5 h-5",
  variant="light",
}: Props) {
  return (
    <Link
      href={href}
      className={`flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
            
          px-4 py-2 
          no-underline outline-none focus:outline-none
          ${
          variant === "dark"
            ? "text-black border border-black bg-white hover:bg-gray-100"
            : "text-white border border-white bg-transparent hover:bg-white/10"
        }`
        }
    >
      {Icon ? <Icon className={iconClassName} /> : null}
      <span>{label}</span>
    </Link>
  );
}
