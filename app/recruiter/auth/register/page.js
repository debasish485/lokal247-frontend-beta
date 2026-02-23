"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RecruiterRegister() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    city: "",
    password: "",
    password_confirmation: "",
    accepted_terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // ✅ Relative URL use korchi
      const res = await fetch(`/api/recruiter/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Registration successful");

      // ✅ Redirect to dashboard
      router.replace("/recruiter/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-semibold text-[#1B2021]">
            Join as a Recruiter
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create your account to start hiring talent
          </p>
        </motion.div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Recruiter"
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-black
              focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-black
              focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="7076862817"
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-black
              focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-sm font-medium text-gray-600">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              placeholder="John Company & Sons"
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-black
              focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Kolkata"
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-black
              focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-black
           focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm password"
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-black
           focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 outline-none transition"
              required
            />
          </div>


          {/* Terms */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="accepted_terms"
              checked={form.accepted_terms}
              onChange={handleChange}
              className="w-4 h-4"
              required
            />
            <label className="text-sm text-gray-600">
              I accept the <span className="text-emerald-700">Terms and Conditions</span>
            </label>
          </div>

          {/* Messages */}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-emerald-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/recruiter/auth/signin"
            className="text-emerald-700 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
