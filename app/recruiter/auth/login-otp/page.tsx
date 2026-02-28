"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { auth } from "@/firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: any;
  }
}

export default function PhoneLoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  const handleSendOTP = async () => {
    if (!phone) return alert("Enter phone number");

    setLoading(true);
    try {
      setupRecaptcha();

      const formattedPhone = phone.startsWith("+91") ? phone : "+91" + phone;

      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      window.confirmationResult = result;

      router.push(`/recruiter/auth/otp-verify?phone=${phone}`);
    } catch (err: any) {
      console.error("OTP Error:", err);

      // Detailed error messages
      if (
        err.code === "auth/invalid-phone-number" ||
        err.message.includes("invalid phone")
      ) {
        setMessage("Invalid phone number. Please check and try again.");
      } else if (err.code === "auth/too-many-requests") {
        setMessage(
          "Too many OTP requests. Please wait a while and try again."
        );
      } else if (
        err.code === "auth/network-request-failed" ||
        err.message.includes("network")
      ) {
        setMessage("Network error. Please check your internet connection.");
      } else if (
        err.code === "auth/captcha-check-failed" ||
        err.message.includes("captcha")
      ) {
        setMessage("Captcha verification failed. Please refresh and try again.");
      } else {
        setMessage("Failed to send OTP. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        {/* Logo */}
        <img src="/images/logo.svg" className="h-10 mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center">
          Login with Phone
        </h1>

        {/* Mobile input */}
        <input
          type="tel"
          placeholder="Enter mobile number"
          value={phone}
          maxLength={10}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
              setPhone(value);
            }
          }}
          className="
            mt-6 w-full
            rounded-xl border border-gray-200
            text-black px-4 py-3
            focus:border-emerald-700
            focus:ring-2 focus:ring-emerald-100
            transition outline-none
          "
        />

        {message && (
          <div className="mt-3 relative rounded-lg bg-red-50/70 backdrop-blur-sm border border-red-100 px-4 py-3 text-sm text-red-700 shadow-sm transition-all duration-300">
            <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-lg" />
            <p className="ml-2 leading-relaxed">{message}</p>
          </div>
        )}

        {/* Send OTP */}
        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="flex justify-center items-center rounded-[4px] w-full text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260]  text-white 
          px-4 py-2 shadow-sm 
          no-underline outline-none focus:outline-none cursor-pointer mt-6"
          >
          {loading ? (
            <div className="h-5 w-5 rounded-full border border-white/30 border-t-white animate-spin" />
          ) : (
            "Send OTP"
          )}
        </button>


        {/* Register link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/recruiter/auth/register" className="text-emerald-700">
            Register now
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-gray-200"></span>
          <span className="text-xs text-gray-400">OR</span>
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>

        {/* Google login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="rounded-[4px] text-[16px] w-full h-[50px] font-medium tracking-[0.2px] 
          bg-[#ffffff]  text-black 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none flex justify-center items-center gap-2 cursor-pointer border border-[#dadce0]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Continue with Google
        </button>

        {/* Switch to email */}
        <p className="text-center text-sm mt-4">
          Login instead with{" "}
          <Link href="/auth/signin" className="text-emerald-700">
            Email
          </Link>
        </p>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
