"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineUser,
  HiMenu,
  HiX,
  HiBriefcase,
  HiPlusCircle,
  HiClipboardList,
} from "react-icons/hi";

export default function RecruiterNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const logoUrl = "/images/logo.svg";
  const isAuthPage = pathname?.startsWith("/recruiter/auth");

  useEffect(() => {
    if (isAuthPage) {
      setAuthChecked(true);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/recruiter/me", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [isAuthPage]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setIsLoggedIn(false);
      router.replace("/recruiter/auth/login-otp");
      router.refresh();
    }
  };

  if (!authChecked) return null;

  return (
    <header className="bg-white text-[#1B2021] relative z-[1]">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/recruiter/dashboard" className="flex items-center gap-3">
            <img src={logoUrl} alt="Logo" className="h-10 rounded-sm" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/recruiter/dashboard"
              className="hover:text-[#0B8260] text-black text-[15px] font-medium"
            >
              Home
            </Link>


            <Link href="/recruiter/about" className="hover:text-[#0B8260] text-black text-[15px] font-medium">
              About Us
            </Link>


            {/* Jobs Dropdown */}
            <div className="group relative">
              <button className="inline-flex items-center gap-1 text-black text-[15px] font-medium hover:text-[#0B8260]">
                <span>Job Listing</span>
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>


              <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  href="/recruiter/jobs/create"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  <HiPlusCircle className="w-4 h-4" /> Create Job
                </Link>
                <Link
                  href="/recruiter/jobs"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  <HiClipboardList className="w-4 h-4" /> My Jobs
                </Link>
              </div>
            </div>

            <Link href="/recruiter/blogs" className="hover:text-[#0B8260] text-black text-[15px] font-medium">
              Blogs
            </Link>

            <Link href="/recruiter/contact" className="hover:text-[#0B8260] text-black text-[15px] font-medium">
              Contact Us
            </Link>

          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/recruiter/auth/signin"
                  className="inline-flex items-center gap-2 bg-[#0B8260] hover:bg-[#0a6f51] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/recruiter/auth/register"
                  className="inline-flex items-center gap-2 bg-[#0B8260] hover:bg-[#0a6f51] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transitionransition"
                >
                  Register Today
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-2 px-5 py-2 rounded-full border hover:bg-gray-50 transition">
                  <HiOutlineUser className="w-5 h-5" />
                  <span>My Account</span>
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/recruiter/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md hover:bg-gray-100">
              {open ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t transition-max-h duration-300 overflow-hidden ${open ? "max-h-[600px]" : "max-h-0"
          }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          <Link href="/recruiter/dashboard" className="block font-medium">
            Home
          </Link>
          <Link href="/recruiter/about" className="block font-medium">
            About Us
          </Link>
          <Link href="/recruiter/jobs/create" className="block font-medium">
            Create Job
          </Link>
          <Link href="/recruiter/jobs" className="block font-medium">
            My Jobs
          </Link>
          <Link href="/recruiter/blogs" className="block font-medium">
            Blogs
          </Link>
          <Link href="/recruiter/contact" className="block font-medium">
            Contact Us
          </Link>

          <div className="pt-3 border-t">
            {!isLoggedIn ? (
              <>
                <Link href="/recruiter/auth/signin" className="block text-sm">
                  Sign In
                </Link>
                <Link href="/recruiter/auth/register" className="block text-sm text-[#0B8260]">
                  Register
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/recruiter/profile"
                  className="block text-sm font-medium"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="block text-left text-sm font-medium text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
