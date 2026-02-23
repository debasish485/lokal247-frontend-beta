// app/recruiter/layout.tsx
"use client";

import RecruiterNavbar from "../components/RecruiterNavbar";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type RecruiterLayoutProps = {
  children: ReactNode;
};

export default function RecruiterLayout({ children }: RecruiterLayoutProps) {
  const pathname = usePathname();

  
  const isAuthPage = pathname.startsWith("/recruiter/auth");

  return (
    <>
      {!isAuthPage && <RecruiterNavbar />}
      <main>{children}</main>
    </>
  );
}
