"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000); // ⏱ 2 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/success.avif" 
            alt="Success"
            width={200}
            height={200}
          />
        </div>

        <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
          Signup Successful 🎉
        </h2>

        <p className="text-gray-600 text-sm">
          Your account has been created successfully.  
          Redirecting you to Home page...
        </p>
      </div>
    </div>
  );
}
