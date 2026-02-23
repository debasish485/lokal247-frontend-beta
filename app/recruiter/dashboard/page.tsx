"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RecruiterDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth=async()=>{
      const res=await fetch("/api/auth/me",{
        credentials:"include",
        cache:"no-store",
      });
      const data=await res.json();
      if (!data.loggedIn) {
      router.replace("/recruiter/auth/signin");
      }
    }
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Recruiter Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome! You are logged in as a recruiter.
      </p>
    </div>
  );
}
