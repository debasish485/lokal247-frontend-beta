"use client"

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaDribbble } from "react-icons/fa";
import { GoGlobe } from "react-icons/go";

export default function Footer() {
        const logoUrl = "/images/logo.svg";
        const appleUrl = "/images/apple.svg";
        const androidUrl = "/images/android.svg";

  return (
    <footer className="bg-white pt-16 pb-6">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="Company Logo"
                className="h-10 object-contain rounded-sm"
              />
            </Link>

            <p className="mt-4 text-sm text-gray-500 max-w-xs">
              Collins Street West, Victoria Near Bank Road <br />
              Australia QHR12456.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {[
                <FaFacebookF />,
                <FaLinkedinIn />,
                <GoGlobe />,
                <FaTwitter />,
                <FaDribbble />,
              ].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 text-gray-600 transition hover:bg-emerald-600 hover:text-white"
                >
                  {Icon}
                </Link>
              ))}
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="mb-4 text-[15px] font-semibold text-emerald-700">
              For Clients
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">Free Business tools</Link></li>
              <li><Link href="#">Affiliate Program</Link></li>
              <li><Link href="#">Success Stories</Link></li>
              <li><Link href="#">Upwork Reviews</Link></li>
              <li><Link href="#">Resources</Link></li>
              <li><Link href="#">Help & Support</Link></li>
            </ul>
          </div>

          {/* Our Resources */}
          <div>
            <h3 className="mb-4 text-[15px] font-semibold text-emerald-700">
              Our Resources
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">Free Business tools</Link></li>
              <li><Link href="#">Affiliate Program</Link></li>
              <li><Link href="#">Success Stories</Link></li>
              <li><Link href="#">Upwork Reviews</Link></li>
              <li><Link href="#">Resources</Link></li>
              <li><Link href="#">Help & Support</Link></li>
            </ul>
          </div>

          {/* The Company */}
          <div>
            <h3 className="mb-4 text-[15px] font-semibold text-emerald-700">
              The Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Leadership</Link></li>
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="#">Investor Relations</Link></li>
              <li><Link href="#">Trust, Safety & Security</Link></li>
            </ul>
          </div>

          {/* Download Apps */}
          <div>
            <h3 className="mb-4 text-[15px] font-semibold text-emerald-700">
              Download Apps
            </h3>
            <div className="space-y-3">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg border px-4 py-3 transition hover:shadow-md"
              >
                <img src={appleUrl} alt="apple logo" className="h-8 w-8 object-contain" />
                <div>
                  <p className="text-[11px] text-gray-500 leading-none">GET IT ON</p>
                  <p className="text-sm font-semibold text-[#1B2021]">Google Play</p>
                </div>
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg border px-4 py-3 transition hover:shadow-md"
              >
                <img src={androidUrl} alt="android logo" className="h-8 w-8 object-contain" />
                <div>
                  <p className="text-[11px] text-gray-500 leading-none">GET IT ON</p>
                  <p className="text-sm font-semibold text-[#1B2021]">App Store</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 border-t pt-4 text-center text-sm text-gray-500">
          © 2025 Design & Develop By{" "}
          <span className="font-medium text-emerald-600">codlyt</span>.
        </div>
      </div>
    </footer>
  );
}