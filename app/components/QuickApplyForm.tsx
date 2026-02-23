"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type Props = {
  jobId: string;
};

export default function QuickApplyForm({ jobId }: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ CHECK AUTH USING COOKIE
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.loggedIn) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }

      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    }

    checkAuth();
  }, []);

  // ✅ AUTO VALIDATION
  useEffect(() => {
    const valid = formRef.current?.checkValidity();
    setIsFormValid(Boolean(valid));
  }, [name, email, contact, dob]);

  // ✅ SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading || !isAuthenticated) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/worker/jobs/${jobId}/apply`, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(
          {
            name,
            email,
            mobile_number:contact,
            dob,
          }
        )
      });

      if (res.status === 401) {
        router.push("/auth/signin");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to apply");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Job apply failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full rounded-lg px-4 py-3 text-sm text-black
    border border-gray-300 outline-none transition
    [&:not(:placeholder-shown):invalid]:border-red-500
    [&:not(:placeholder-shown):valid]:border-emerald-600
  `;

  // ⏳ WAIT UNTIL AUTH CHECK DONE
  if (!authChecked) return null;

  // 🔒 NOT LOGGED IN
  if (!isAuthenticated) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600 mb-4">
          Please login to apply for this job.
        </p>
        <div className="flex justify-center">
        <button
          onClick={() => router.push("/auth/phone-login")}
          className="flex justify-center items-center min-w-[150px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
        >
          Login
        </button>
        </div>
      </div>
    );
  }

  // ✅ SUCCESS
  if (submitted) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-emerald-600">
          Thank you! 🎉
        </h2>
        <p className="text-gray-600 mt-2">
          Job applied successfully.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          minLength={3}
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Contact Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          required
          pattern="[0-9]{10}"
          placeholder="10-digit number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* DOB */}
      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid || loading}
        className={`flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none
          ${isFormValid
            ? "bg-[#OB8260] text-white hover:bg-emerald-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        {loading ? "Applying..." : "Submit Application"}
      </button>
    </form>
  );
}
