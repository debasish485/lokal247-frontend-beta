"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ListingSkeleton from "@/app/components/skeletons/ListingSkeleton";


// Capitalize first letter
const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Format date with ordinal (1st, 2nd, 3rd...) + short month
const formatDateOrdinal = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinal(day)} ${month} ${year}`;
};

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleJobs = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await fetch("/api/worker/applied-jobs", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (res.status === 401) {
          setError("Please login to view your job history.");
          return;
        }

        const data = await res.json();
        if (Array.isArray(data?.data)) setJobs(data.data);
        else setJobs([]);
      } catch (err) {
        setError("Unable to load job history.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  // reset page when jobs change
  useEffect(() => {
    setCurrentPage(1);
  }, [jobs]);

  if (loading) {
    return <ListingSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="w-full p-6">
        <h1 className="text-xl font-semibold mb-4 text-gray-900">
          My Job History
        </h1>
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-10 text-center">
          <p className="text-gray-600 text-lg">
            You haven’t applied to any jobs yet.
          </p>
        </div>
      </div>
    );
  }

  function stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  return (
    <div className="w-full flex flex-col gap-4 px-4">
      <h1 className="text-xl font-semibold text-gray-900">
        My Job History
      </h1>

      {/* JOB GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleJobs.map((job) => (
          <div
            key={job.uuid}
            className="bg-white flex flex-col p-5 rounded-lg border border-[#DEE2E6] gap-4"
          >
            {/* HEADER */}
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold line-clamp-1">{job.title ? stripHtml(job.title) : "No title available"}</h2>
                <p className="text-[#A3A3A3] text-sm">
                  {job.applied_at
                    ? `Applied ${Math.floor(
                      (Date.now() - new Date(job.applied_at)) /
                      (1000 * 60 * 60 * 24)
                    )} days ago`
                    : ""}
                </p>
              </div>

              <button className="w-10 h-10 bg-[#F1F1F1] rounded-full flex justify-center items-center shrink-0">
                <img src="/images/edit-btn.svg" width={16} />
              </button>
            </div>

            {/* DESCRIPTION */}
            <p
              className="text-[#30363F] text-sm leading-6 overflow-hidden min-h-[48px]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {job.description ? stripHtml(job.description) : "no description available"}
            </p>


            {/* CHIPS */}
            <div className="flex gap-2 flex-wrap">
              {job.work_type && (
                <span className="px-3 py-1 text-xs rounded-full bg-[#F1F1F1] text-[#6E8497]">
                  {job.work_type === "wfh"
                    ? "Remote"
                    : job.work_type === "wfo"
                      ? "Work From Office"
                      : capitalize(job.work_type)}
                </span>
              )}

              {job.shift_timing && (
                <span className="px-3 py-1 text-xs rounded-full bg-[#F1F1F1] text-[#6E8497]">
                  {capitalize(job.shift_timing)}
                </span>
              )}

              {(job.locality || job.city) && (
                <span className="px-3 py-1 text-xs rounded-full bg-[#F1F1F1] text-[#6E8497]">
                  {[job.locality, job.city].filter(Boolean).join(", ")}
                </span>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between w-full gap-1 mt-auto">
              <span className="font-medium text-[#30363F] whitespace-nowrap">
                ₹{job.pay_amount}
                <span className="text-[#8CA0A9]">
                  /{capitalize(job.pay_type)}
                </span>
              </span>

              <span className="text-[#30363F] text-center flex-1 min-w-0 truncate">
                Start Date: {formatDateOrdinal(job.start_date)}
              </span>
              <button
                onClick={() => router.push(`/worker/applied-jobs/${job.uuid}`)}
                className="flex justify-center items-center min-w-[100px] rounded-[4px] text-[12px] h-[50px] font-medium tracking-[0.2px] 
    bg-[#0B8260] hover:bg-[#0a6f51] text-white 
    px-4 py-2 shadow-sm transition 
    no-underline outline-none focus:outline-none"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>


      {totalPages > 1 && (
        <div
          className="flex justify-center"
          style={{ width: "334px", margin: "0 auto", gap: "4px", padding: "5px" }}
        >
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: "37px",
                  height: "37px",
                  borderRadius: "2px",
                  backgroundColor:
                    page === currentPage ? "#0B8260" : "#F1F1F1",
                  color: page === currentPage ? "#fff" : "#333",
                }}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
