// components/JobCard.tsx 

"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
type JobCardProps = {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  shift: string;
  pay_type:string,
  schedule: {
    shift_timing:string;
    start_date: string;
    start_time: string;
    end_time: string;
  };
  logo: string;
  slug: string;
  uuid: string;
};

export default function JobCard({
  title,
  description,
  company,
  location,
  salary,
  type,
  pay_type,
  schedule,
  logo,
  slug,
  uuid,
}: JobCardProps) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function formatDateWithOrdinal(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();

    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";

    return `${day}${suffix} ${month} ${year}`;
  }


  const handleQuickApply = () => {
    setLoading(true);
    router.push(`/listing/${uuid}`);
  };

  function stripHtml(html: string) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
    function capitalizeFirst(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-md bg-emerald-50 flex items-center justify-center flex shrink-0">
          <img
            src={logo}
            alt={company}
            className="h-10 w-10 object-cover rounded-sm"
          />
        </div>

        <div className="flex-1">
          <Link href={`/listing/${uuid}`} className="text-lg font-medium text-[#333333] hover:underline line-clamp-1">
            {title ? stripHtml(title) :"No title Provided"}
          </Link>
          <p className="text-sm text-[#6E8497] mt-1">{company}</p>

          {/* Static Star Rating */}
          <div className="flex items-center gap-1 mt-2 text-yellow-400">
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} />
            <FaStar size={16} className="text-[#C7D2DD]" />
          </div>
        </div>
      </div>

      <p
        className="text-sm text-[#30363F] mt-3 overflow-hidden break-words"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {description ? stripHtml(description) :"No description provided"}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-xs bg-[#F8F8F8] px-2 py-1 rounded">
          {capitalizeFirst(schedule.shift_timing)}
        </span>
        <span className="text-xs bg-[#F8F8F8] px-2 py-1 rounded">
          {type}
        </span>
        <span className="text-xs bg-[#F8F8F8] px-2 py-1 rounded">
          {location}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[#1B2021]">
            {salary}
            <span className="text-[#6E8497]"> / {pay_type === "monthly" ? "Monthly" : "Daily"}</span>
          </span>
          <span className="text-gray-300">|</span>
          <span>
            Start date: {schedule?.start_date ? formatDateWithOrdinal(schedule.start_date) : "Not specified"}
          </span>

        </div>

        <button
          onClick={handleQuickApply}
          className="inline-block rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
        >
          Quick Apply
        </button>

      </div>
    </article>
  );
}