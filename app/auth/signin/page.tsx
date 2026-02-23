"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 flex flex-col items-center"
        >
          <img src="/images/logo.svg" alt="Company" className="h-10 mb-4" />

          <h1 className="text-2xl font-semibold text-[#1B2021]">
            Welcome
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Login with your email
          </p>
        </motion.div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-sm font-medium text-gray-600">
              Email or Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-xl border border-gray-200 text-black px-4 py-3
              focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100
              transition outline-none"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-gray-200 text-black px-4 py-3
              focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100
              transition outline-none"
            />
          </motion.div>

          {/* Forgot */}
          <div className="flex justify-end text-sm">
            <button
              type="button"
              className="text-emerald-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Recruiter Login Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Want to login as a recruiter?{" "}
            <Link
              href="/recruiter/auth/signin"
              className="text-emerald-700 font-medium hover:underline"
            >
              Click here
            </Link>
          </p>

          {/* Login Button */}
          <motion.button
            type="submit"
            className="inline-block rounded-[4px] w-full text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260]  text-white 
          px-4 py-2 shadow-sm 
          no-underline outline-none focus:outline-none cursor-pointer"
          >
            Login
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-gray-200"></span>
          <span className="text-xs text-gray-400">OR</span>
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>

        {/* Google Login */}
        <motion.button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="rounded-[4px] text-[16px] w-full h-[50px] font-medium tracking-[0.2px] 
          bg-[#ffffff]  text-black 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none flex justify-center items-center gap-2 cursor-pointer border border-[#dadce0]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>
            Continue with Google
          </span>
        </motion.button>

        {/* Switch to Phone Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Login instead with{" "}
          <Link
            href="/auth/phone-login"
            className="text-emerald-700 font-medium hover:underline"
          >
            OTP
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-2">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-emerald-700 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
