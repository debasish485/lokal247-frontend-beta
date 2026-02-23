"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OtpVerificationPage({ onOtpVerified }: { onOtpVerified?: () => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/worker/login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_number: phone, otp }),
      });

      const data = await res.json();
      if (!data.status) throw new Error(data.message || "OTP verification failed");

      setVerified(true);

      // ✅ Call callback if provided
      onOtpVerified?.();

      setTimeout(() => {
        router.back(); // go back to stepper
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md flex flex-col gap-4 mt-10">
      <h2 className="text-xl font-semibold">OTP Verification</h2>
      <p>We sent an OTP to {phone}</p>

      <input
        type="text"
        placeholder="Enter OTP"
        className="border p-2 rounded w-full"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerifyOtp}
        className={`p-2 rounded w-full text-white ${verified ? "bg-green-600" : "bg-blue-600"}`}
        disabled={loading || verified}
      >
        {loading ? "Verifying..." : verified ? "Verified ✅" : "Verify OTP"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
