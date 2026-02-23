"use client";

import React, { useState, useRef } from "react";
import { auth } from "@/firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Pencil } from "lucide-react";
import StepLayout from "./StepLayout";


declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

interface StepPhoneOtpProps {
  workerData: any;
  setWorkerData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepPhoneOtp({
  workerData,
  setWorkerData,
  onNext,
  onBack,
}: StepPhoneOtpProps) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const maskedPhone = workerData.mobile_number
    ? `+91 ${workerData.mobile_number.slice(0, 2)}XXXX${workerData.mobile_number.slice(-2)}`
    : "";

  // ---------------- Recaptcha ----------------
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  // ---------------- Send OTP ----------------
  const sendOTP = async () => {
    if (!workerData.name || !workerData.mobile_number) {
      setMessage("Name and phone are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      setupRecaptcha();

      const formattedPhone = workerData.mobile_number.startsWith("+91")
        ? workerData.mobile_number
        : "+91" + workerData.mobile_number;

      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      setWorkerData((prev: any) => ({
        ...prev,
        confirmationResult: result,
      }));

      setOtpSent(true);
    } catch (err: any) {
      console.error("OTP Error:", err);

      const errorMsg = err?.message || "";

      if (
        errorMsg.includes("reCAPTCHA client element has been removed") ||
        errorMsg.includes("captcha")
      ) {
        setMessage("Captcha verification failed. Please refresh and try again.");
      }
      else if (err.code === "auth/captcha-check-failed") {
        setMessage("Captcha verification failed. Please try again.");
      }
      else if (err.code === "auth/too-many-requests") {
        setMessage("Too many attempts. Please wait for some time and try again.");
      }
      else if (err.code === "auth/invalid-phone-number") {
        setMessage("Invalid phone number. Please check and try again.");
      }
      else if (err.code === "auth/network-request-failed") {
        setMessage("Network error. Please check your internet connection.");
      }
      else {
        setMessage("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- OTP Input Change ----------------
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // ---------------- Backspace Logic ----------------
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

  // ---------------- Verify OTP ----------------
  const verifyOTP = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setMessage("Please enter complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const confirmationResult = workerData.confirmationResult;
      if (!confirmationResult) throw new Error("No OTP request found");

      const result = await confirmationResult.confirm(finalOtp);
      const user = result.user;

      const firebaseToken = await user.getIdToken();

      setWorkerData((prev: any) => ({
        ...prev,
        firebase_token: firebaseToken,
      }));

      setIsVerified(true);

      setTimeout(() => {
        onNext();
      }, 1500);
    } catch (err: any) {
      console.error("Verify OTP Error:", err);

      if (err.code === "auth/invalid-verification-code") {
        setMessage("Invalid OTP. Please check and try again.");
      }
      else if (err.code === "auth/code-expired") {
        setMessage("OTP expired. Please request a new one.");
      }
      else {
        setMessage(err.message || "OTP verification failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepLayout
      footer={
        !isVerified ? (
          <div className="flex gap-4 w-full">
            <button
              onClick={onBack}
              className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium 
                text-black px-4 py-2 shadow-sm transition"
            >
              Back
            </button>

            {!otpSent && (
              <button
                onClick={sendOTP}
                disabled={loading}
                className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium 
                  bg-[#0B8260] hover:bg-[#0a6f51] text-white px-4 py-2 shadow-sm transition"
              >
                {loading ? (
                  <div className="h-5 w-5 rounded-full border border-white/30 border-t-white animate-spin" />
                ) : (
                  "Send OTP"
                )}
              </button>
            )}

            {otpSent && (
              <button
                onClick={verifyOTP}
                disabled={loading}
                className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium 
                  bg-[#0B8260] hover:bg-[#0a6f51] text-white px-4 py-2 shadow-sm transition"
              >
                {loading ? (
                  <div className="h-5 w-5 rounded-full border border-white/30 border-t-white animate-spin" />
                ) : (
                  "Verify OTP"
                )}
              </button>
            )}
          </div>
        ) : null
      }
    >
      <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {!otpSent ? "Enter Name & Phone" : "Verify OTP"}
          </h2>

          {otpSent && !isVerified && (
            <p className="text-sm text-gray-500">
              Enter the 6-digit code sent to your registered mobile number
            </p>
          )}
        </div>

        {/* ---------------- STEP 1 ---------------- */}
        {!otpSent && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={workerData.name || ""}
              onChange={(e) =>
                setWorkerData((prev: any) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="border-2 border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg w-full outline-none transition"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={workerData.mobile_number || ""}
              onChange={(e) => {
                let value = e.target.value;

                // remove non-digits
                value = value.replace(/\D/g, "");

                // limit to 10 digits
                if (value.length > 10) return;

                setWorkerData((prev: any) => ({
                  ...prev,
                  mobile_number: value,
                }));
              }}
              className="border-2 border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg w-full outline-none transition"
            />
          </>
        )}

        {/* ---------------- STEP 2 ---------------- */}
        {otpSent && !isVerified && (
          <>
            <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg">
              <span className="text-sm text-gray-700">
                OTP sent to <strong>{maskedPhone}</strong>
              </span>

              <button
                onClick={() => {
                  setOtpSent(false);
                  setOtp(Array(6).fill(""));
                }}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <Pencil size={16} className="text-emerald-600" />
              </button>
            </div>

            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              ))}
            </div>
          </>
        )}

        {/* ---------------- SUCCESS STATE ---------------- */}
        {isVerified && (
          <div className="flex flex-col items-center justify-center text-center space-y-4 py-6">
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-emerald-700">
              Phone Verified Successfully 🎉
            </h3>

            <p className="text-sm text-gray-500">
              Redirecting to the next step...
            </p>
          </div>
        )}

        <div id="recaptcha-container"></div>

        {message && (
          <div className="relative rounded-lg bg-red-50/70 backdrop-blur-sm border border-red-100 px-4 py-3 text-sm text-red-700 shadow-sm transition-all duration-300">
            <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-lg" />
            <p className="ml-2 leading-relaxed">{message}</p>
          </div>
        )}
      </div>
    </StepLayout>
  );
}
