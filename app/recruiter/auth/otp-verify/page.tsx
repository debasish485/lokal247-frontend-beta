"use client";

import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

declare global {
    interface Window {
        confirmationResult: any;
    }
}

export default function OTPVerifyPage() {
    const searchParams = useSearchParams();
    const phone = searchParams.get("phone") || "";

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    const maskedPhone = phone
        ? `+91 ${phone.slice(0, 2)}XXXX${phone.slice(-2)}`
        : "";

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
            if (!window.confirmationResult) {
                throw new Error("Session expired. Please login again.");
            }

            const result = await window.confirmationResult.confirm(finalOtp);
            const user = result.user;

            const firebaseToken = await user.getIdToken();
            console.log("Firebase Token:", firebaseToken);


            const res = await fetch("/api/recruiter/login-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ firebase_token: firebaseToken }),
            });

            const data = await res.json();

            if (!res.ok || !data.status) {
                throw new Error(data.message || "Login failed");
            }

            router.replace("/recruiter/dashboard");
            router.refresh();
        } catch (err: any) {
            setMessage("OTP verify failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-2xl font-bold mb-6">Worker Login with OTP</h1>

            <p className="text-sm text-gray-600 mb-4">
                OTP sent to <strong>{maskedPhone}</strong>
            </p>

            <div className="flex justify-between gap-2 mb-4">
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
                className="flex justify-center items-center rounded-[4px] w-full max-w-[430px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260]  text-white 
          px-4 py-2 shadow-sm 
          no-underline outline-none focus:outline-none cursor-pointer mt-6"
            >
                {loading ? (
                    <div className="h-5 w-5 rounded-full border border-white/30 border-t-white animate-spin" />
                ) : (
                    "Verify OTP"
                )}
            </button>

            {message && (
                <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
            )}
        </div>
    );
}
