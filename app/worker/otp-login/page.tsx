"use client";

import React, { useState, useRef } from "react";
import { auth } from "@/firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export default function OTPLoginPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const maskedPhone = phone
    ? `+91 ${phone.slice(0, 2)}XXXX${phone.slice(-2)}`
    : "";

  // 🔹 Recaptcha setup
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  // 🔹 Send OTP
  const sendOTP = async () => {
    if (!phone) {
      setMessage("Please enter phone number");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      setupRecaptcha();

      const formattedPhone = phone.startsWith("+91") ? phone : "+91" + phone;
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      setConfirmationResult(result);
      setOtpSent(true);
      setMessage("✅ OTP sent successfully!");
    } catch (err: any) {
      setMessage("❌ Error sending OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OTP change
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // 🔹 Backspace logic
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  // 🔹 Verify OTP
  const verifyOTP = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setMessage("Please enter complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await confirmationResult.confirm(finalOtp);
      const user = result.user;

      const firebaseToken = await user.getIdToken();
      console.log("🔥 Firebase Token:", firebaseToken);


      const res = await fetch("/api/worker/login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ firebase_token: firebaseToken }),
      });

      const data = await res.json();
      console.log("Data",data);

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Login failed");
      }

      router.replace("/");
      router.refresh();
    } catch (err: any) {
      setMessage("OTP verify failed: " + err.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-2xl font-bold mb-6">Worker Login with OTP</h1>

      {/* Phone input */}
      {!otpSent && (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <input
            type="tel"
            placeholder="+91 7076862817"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border px-4 py-2 rounded"
          />
          <button
            onClick={sendOTP}
            disabled={loading}
            className="bg-[#0B8260] text-white py-3 rounded-lg w-full font-medium transition disabled:opacity-60 flex justify-center items-center"
          >
            {loading ? (
              <div className="h-5 w-5 rounded-full border border-white/30 border-t-white animate-spin" />
            ) : (
              "Send OTP"
            )}
          </button>

        </div>
      )}

      {/* OTP input (6 box style) */}
      {otpSent && (
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <p className="text-sm text-gray-600 text-center">
            OTP sent to <strong>{maskedPhone}</strong>
          </p>

          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-emerald-600 outline-none"
              />
            ))}
          </div>

          <button
            onClick={verifyOTP}
            disabled={loading}
            className="bg-[#0B8260] text-white py-3 rounded-lg w-full font-medium transition disabled:opacity-60 flex justify-center items-center"
          >
            {loading ? (
              <div className="h-5 w-5 rounded-full border border-white/30 border-t-white animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>
      )}

      <div id="recaptcha-container"></div>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
}
