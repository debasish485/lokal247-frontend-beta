"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type RootClientWrapperProps = {
  children: ReactNode;
};

export default function RootClientWrapper({ children }: RootClientWrapperProps) {
  const pathname = usePathname();
  console.log("PATHNAME =", pathname);


  
    const hideLayout =
    pathname.startsWith("/recruiter") ||
    pathname === "/auth/signin" ||
    pathname === "/auth/phone-login" ||
    pathname === "/auth/register" ||
    pathname==="/signup/select-role";


  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const content = (
    <>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
      {/* GLOBAL TOAST */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );

  if (googleClientId) {
    return (
      <GoogleOAuthProvider clientId={googleClientId}>
        {content}
      </GoogleOAuthProvider>
    );
  }

  return content;
}
