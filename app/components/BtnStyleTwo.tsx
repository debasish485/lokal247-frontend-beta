"use client";
import Link from "next/link";
import type { ElementType } from "react";

type Props = {
  href?: string;
  label?: string;
  icon?: ElementType; // icon component, e.g. HiOutlineUser
  iconClassName?: string;
};

export default function BtnStyleTwo({
  href = "#",
  label = "Click Me",
  icon: Icon,
  iconClassName = "w-5 h-5",
}: Props) {
  return (
    <Link
      href={href}
      className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
           text-white 
          px-4 py-2 
          no-underline outline-none focus:outline-none"
    >
      {Icon ? <Icon className={iconClassName} /> : null}
      <span>{label}</span>
    </Link>
  );
}
