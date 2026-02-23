"use client";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import JobDescriptionEditor from "../../../components/JobDescriptionEditor";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

if (!RECAPTCHA_SITE_KEY) {
  throw new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing");
}

export default function CreateJobPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Controlled inputs
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [payType, setPayType] = useState<"daily" | "monthly">("daily");
  const [payAmount, setPayAmount] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number>(71);
  const [workType, setWorkType] = useState<"wfh" | "who" | "hybrid">("wfh");
  const [shiftTiming, setShiftTiming] = useState<"day" | "night">("day");
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("18:00");
  const [numberOfWorkers, setNumberOfWorkers] = useState<number>(1);
  const [genderPreference, setGenderPreference] = useState<"male" | "female" | "other">("male");
  const [startDate, setStartDate] = useState<string>("2025-02-10");
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      // ✅ Execute reCAPTCHA
      const captchaToken = await recaptchaRef.current?.executeAsync();
      if (!captchaToken) {
        alert("Please complete the CAPTCHA");
        setLoading(false);
        return;
      }

      const payload = {
        category_id: categoryId,
        title: title.trim(),
        description: description.trim(),
        city,
        locality,
        pay_type: payType,
        pay_amount: Number(payAmount),
        work_type: workType,
        shift_timing: shiftTiming,
        start_time: startTime,
        end_time: endTime,
        number_of_workers: numberOfWorkers,
        gender_preference: genderPreference,
        start_date: startDate,
        captchaToken,
      };

      const res = await fetch("/api/recruiter/job-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include", // include HTTP-only cookies
      });

      const data = await res.json();
      console.log("Data:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to create job");
      }

      setSuccess(data.message || "Job created successfully");

      // Reset form
      setTitle("");
      setDescription("");
      setCity("");
      setLocality("");
      setPayType("daily");
      setPayAmount("");
      setCategoryId(71);
      recaptchaRef.current?.reset();
    } catch (err: any) {
      console.error("Create job error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleDescriptionChange = (val: string) => {
    const clean = val.replace(/\s+/g, " ").trim();

    if (clean.length > 1000) {
      setError("Description too long (max 1000 chars)");
      setDescription(clean.slice(0, 10000));
      return;
    }

    setError("");
    setDescription(clean);
  };

  const selectWrapperClass = "relative w-full";
  const selectClass =
    "w-full h-[56px] rounded-[8px] border border-[#E7EDF1] px-4 pr-10 text-[14px] font-normal outline-none text-gray-400 focus:text-gray-900 appearance-none";
  const arrowClass =
    "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs";


  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-semibold mb-6 text-[#333333]">
        Create New Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={title}
            //maxLength={100}
            onChange={(e) => {
              const value = e.target.value.replace(/\s+/g, " ").trim();
              setTitle(value)
            }
            }
            onPaste={(e) => {
              const pastedText = e.clipboardData.getData("text");
              if (pastedText.length > 1000) {
                e.preventDefault();
                alert("Title too long");
              }
            }}
            required
            minLength={3}
            placeholder="Enter job title"
            className="w-full rounded-lg px-4 py-3 text-sm text-black border border-gray-300 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Job Description <span className="text-red-500">*</span>
          </label>
          <JobDescriptionEditor
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="Mumbai"
              className="w-full rounded-lg px-4 py-3 text-sm text-black border border-gray-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Locality <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              required
              placeholder="Andheri East"
              className="w-full rounded-lg px-4 py-3 text-sm text-black border border-gray-300 outline-none"
            />
          </div>
        </div>

        {/* Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pay Type */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Pay Type</label>
            <div className={selectWrapperClass}>
              <select
                name="pay_type"
                value={payType}
                onChange={(e) =>
                  setPayType(e.target.value as "daily" | "monthly")
                }
                className={`${selectClass} text-[#30363F]`} // same styling as Category
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </select>
              <span className={arrowClass}>▼</span> {/* ← same arrow as Category */}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Pay Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="pay_amount"
              value={payAmount}
              onChange={(e) => setPayAmount(Number(e.target.value))}
              required
              placeholder="800"
              className="w-full h-[56px] rounded-lg px-4 py-3 text-sm text-black border border-gray-300 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Work Type */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Work Type</label>
            <div className={selectWrapperClass}>
              <select
                name="work_type"
                value={workType}
                onChange={(e) =>
                  setWorkType(e.target.value as "wfh" | "who" | "hybrid")
                }
                className={`${selectClass} text-[#30363F]`}
              >
                <option value="wfh">Work From Home</option>
                <option value="who">Work From Office</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <span className={arrowClass}>▼</span>
            </div>
          </div>

          {/* Shift Timing */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Shift Timing</label>
            <div className={selectWrapperClass}>
              <select
                name="shift_timing"
                value={shiftTiming}
                onChange={(e) =>
                  setShiftTiming(e.target.value as "day" | "night")
                }
                className={`${selectClass} text-[#30363F]`}
              >
                <option value="day">Day</option>
                <option value="night">Night</option>
              </select>
              <span className={arrowClass}>▼</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="start_time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full h-[56px] rounded-lg px-4 py-3 text-sm text-black border border-gray-300 outline-none"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="end_time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full h-[56px] rounded-lg px-4 py-3 text-sm text-black border border-gray-300 outline-none"
            />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gender Preference */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Gender Preference <span className="text-red-500">*</span>
            </label>
            <div className={selectWrapperClass}>
              <select
                name="gender_preference"
                value={genderPreference}
                onChange={(e) =>
                  setGenderPreference(e.target.value as "male" | "female" | "other")
                }
                className={`${selectClass} text-[#30363F] w-full`} // full width
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="any">Other</option>
              </select>
              <span className={arrowClass}>▼</span>
            </div>
          </div>


        </div>


        {/* Category */}
        <div className={selectWrapperClass}>
          <select
            name="category_id"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className={`${selectClass} text-[#30363F]`}
          >
            <option value={71}>Driver</option>
            <option value={72}>Cook</option>
            <option value={73}>Housekeeping</option>
            <option value={74}>Electrician</option>
            <option value={75}>Plumber</option>
            <option value={76}>Carpenter</option>
            <option value={77}>Security Guard</option>
          </select>
          <span className={arrowClass}>▼</span>
        </div>


        {/* Success/Error */}
        {success && (
          <p className="text-sm text-emerald-700 font-medium">{success}</p>
        )}
        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

        {/* Invisible reCAPTCHA */}
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY!}
          size="invisible"
        />

        {/* Submit Button */}
        <button
          disabled={loading}
          className="flex justify-center items-center min-w-[150px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
        >
          {loading ? (
            <div className="h-5 w-5 rounded-full border border-white/30 border-t-white animate-spin" />
          ) : (
            "Create Job"
          )}
        </button>
      </form>
    </div>
  );
}
