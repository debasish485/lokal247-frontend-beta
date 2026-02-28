"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineUser, HiMenu, HiX } from "react-icons/hi";
import BtnStyleOne from "./BtnStyleOne";
import BtnStyleTwo from "./BtnStyleTwo";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/worker/otp-login") ||
    pathname.startsWith("/worker/phone-otp") ||
    pathname.startsWith("/recruiter/auth");

  const logoUrl = "/images/logo.svg";
  const isHomePage = pathname === "/";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
        setUserRole(data.role || null);
      } catch {
        setIsLoggedIn(false);
        setUserRole(null);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();

    const params = new URLSearchParams(window.location.search);
    if (params.get("loginSuccess")) {
      checkAuth();
      params.delete("loginSuccess");
      const newUrl =
        window.location.pathname +
        (params.toString() ? "?" + params.toString() : "");
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUserRole(null);
      router.replace("/auth/phone-login");
      router.refresh();
    }
  };


  if (!authChecked) {
    return (
      <header className="w-full h-[76px] bg-white border-b border-gray-200" />
    );
  }
  if (isLoggingOut) return null;
  if (isAuthPage) return null;

  const linkColor = !isHomePage ? "text-black" : "text-white";

  return (
    <header
      className={`w-full z-50 absolute top-0 left-0 ${!isHomePage
          ? "bg-white border-b border-gray-200 h-[76px]"
          : "bg-transparent border-b border-white/30 h-20"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Company Logo"
              className="h-10 object-cover rounded-sm"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className={`hover:text-[#0B8260] ${linkColor} text-[15px] font-medium`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`hover:text-[#0B8260] ${linkColor} text-[15px] font-medium`}
            >
              About Us
            </Link>
            <Link
              href="/listing"
              className={`hover:text-[#0B8260] ${linkColor} text-[15px] font-medium`}
            >
              Job Listing
            </Link>
            <Link
              href="/blogs"
              className={`hover:text-[#0B8260] ${linkColor} text-[15px] font-medium`}
            >
              Blogs
            </Link>
            <Link
              href="/blogs"
              className={`hover:text-[#0B8260] ${linkColor} text-[15px] font-medium`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4 relative">
            {!isLoggedIn ? (
              <>
                <BtnStyleTwo
                  href="/auth/phone-login"
                  label="SignIn"
                  icon={HiMenu}
                  iconClassName="w-4 h-4"
                  variant={!isHomePage ? "dark":"light"}
                />
                <BtnStyleOne href="/signup/select-role" label="Register Today" />
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-black bg-white hover:bg-gray-100">
                  <HiOutlineUser className="w-5 h-5" />
                  <span>My Account</span>
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link
                    href="/worker/profile-page"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  {userRole === "worker" && (
                    <Link
                      href="/worker/profile-page?tab=jobs"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      My Job History
                    </Link>
                  )}
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
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t overflow-hidden transition-all ${open ? "max-h-[600px]" : "max-h-0"
          }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/about" className="block">
            About Us
          </Link>
          <Link href="/listing" className="block">
            Job Listing
          </Link>
          <Link href="/blogs" className="block">
            Blogs
          </Link>
          <Link href="/contact" className="block">
            Contact Us
          </Link>

          {isLoggedIn ? (
            <div className="pt-2 border-t flex flex-col gap-3">
              <Link href="/worker/profile-page">Profile</Link>
              {userRole === "worker" && (
                <Link href="/worker/profile-page?tab=jobs">My Job History</Link>
              )}
              <button onClick={handleLogout} className=" block text-left text-red-600">
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t space-y-2">
              <Link href="/auth/phone-login" className="flex items-center gap-2">
                <HiOutlineUser className="w-5 h-5" /> Sign In
              </Link>
              <BtnStyleOne href="/signup/select-role" label="Register Today" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
