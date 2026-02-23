"use client";

import { useState } from "react";

type StepRegistrationInfoProps = {
  onNext: () => void;
  onBack: () => void;
  setWorkerInfo: React.Dispatch<React.SetStateAction<any>>;
};

export default function StepRegistrationInfo({
  onNext,
  onBack,
  setWorkerInfo,
}: StepRegistrationInfoProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_number: "",
    gender: "",
    age: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
      mobile_number,
      gender,
      age,
    } = form;

    // ✅ Validation
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile_number ||
      !gender ||
      !age
    ) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    setError("");

    // ✅ Store data in parent (WorkerRegisterPage)
    setWorkerInfo({
      name,
      email,
      password,
      mobile_number,
      gender,
      age,
    });

    // ✅ Go next step
    onNext();
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold">Enter your basic info</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <input
        type="tel"
        name="mobile_number"
        placeholder="Mobile Number"
        value={form.mobile_number}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full border rounded p-2"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
           text-black 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
}
