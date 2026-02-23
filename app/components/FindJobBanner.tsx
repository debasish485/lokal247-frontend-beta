"use client";
import React from "react";

export default function FindJobBanner() {
  return (
    <section className="w-full bg-[#0B8A63]">
      <div className="relative mx-auto flex min-h-[320px] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center text-white md:min-h-[380px] lg:min-h-[420px]">
        {/* Text */}
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
            Find The Perfect Job
          </h1>
          <h2 className="mt-2 text-lg font-medium md:text-xl lg:text-2xl">
            on our platform That is Superb For You
          </h2>

          <p className="mt-4 text-sm md:text-base text-emerald-100">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-md bg-[#1B2021] px-8 py-3 text-sm font-medium text-white shadow-md hover:bg-black transition">
            Upload resume
          </button>
          <button className="rounded-md bg-white px-8 py-3 text-sm font-medium text-[#1B2021] shadow-md hover:bg-gray-100 transition">
            Join Our Team
          </button>
        </div>

        {/* Bottom silhouette (optional bg image) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-40">
          <div className="h-full w-full bg-gradient-to-t from-emerald-900/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
