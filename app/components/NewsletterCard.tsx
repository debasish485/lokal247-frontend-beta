"use client";

import React from "react";

export default function NewsletterCard() {
  return (
    <section className="w-full">
      <div className="bg-gradient-to-r from-emerald-800 mb-5 p-5 rounded-2xl rounded-lg shadow-sm text-white to-emerald-600">
        {/* Text */}
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold leading-snug md:text-2xl">
            Get The Latest Jobs Right Into Your Inbox!
          </h2>
          <p className="mt-2 text-sm text-emerald-100">
            We just want your email address!
          </p>
        </div>

        {/* Form */}
        <form className="mt-5 max-w-xl">
          <div className="flex flex-col gap-3 rounded-[8px] bg-white px-2 py-2 shadow-sm sm:flex-row sm:items-center sm:px-3">
            <input
              type="email"
              placeholder="Enter Your email"
              className="w-full rounded-[8px] border-none bg-transparent px-3 py-2 text-sm text-[#212529] outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-[8px] bg-[#1B2021] px-6 py-2 text-sm font-medium text-white hover:bg-black transition"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
