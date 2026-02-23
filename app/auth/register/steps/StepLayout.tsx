"use client";

import React from "react";

type Props = {
  children: React.ReactNode; // main step content
  footer: React.ReactNode;   // buttons / indicators
};

export default function StepLayout({ children, footer }: Props) {
  return (
    <div
      className="
        flex flex-col justify-between
        min-h-[520px]
        w-full
      "
    >
      {/* TOP CONTENT (does not move) */}
      <div className="flex-1">
        {children}
      </div>

      {/* BOTTOM FOOTER (fixed position) */}
      <div className="pt-10">
        {footer}
      </div>
    </div>
  );
}