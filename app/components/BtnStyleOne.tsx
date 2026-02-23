"use client";
import Link from "next/link";

export default function BtnStyleOne({
  href = "#",
  label = "Click Me",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none whitespace-nowrap"
    >
      <span>{label}</span>
    </Link>
  );
}
