"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import JobCardSkeleton from "../../../components/skeletons/JobCardSkeleton";

const ITEMS_PER_PAGE = 6;

// Capitalize first letter
const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Format date with ordinal (1st, 2nd, 3rd)
// Format date with ordinal (1st, 2nd, 3rd) and short month
const formatDateOrdinal = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  const day = date.getDate();

  // Get short month like Jan, Feb, Mar
  const month = date.toLocaleString("en-GB", { month: "short" });

  const year = date.getFullYear();

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${day}${getOrdinal(day)} ${month} ${year}`;
};




export default function PostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/recruiter/jobs", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();
        setJobs(data.data || []);
        
      }
      catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleJobs = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getPostedDaysAgo = (date) => {
    const d = new Date(date);
    const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return "Posted today";
    if (diff === 1) return "Posted 1 day ago";
    return `Posted ${diff} days ago`;
  };

  function stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }


  return (
    <div className="w-full flex flex-col gap-6 overflow-hidden min-h-screen">
      {/* HEADING */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Posted Jobs</h1>
      {/* JOB GRID */}
      {loading ? (
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {visibleJobs.map((job) => (
            <div
              key={job.uuid}
              className="bg-white flex flex-col p-2 rounded-lg border border-[#DEE2E6] gap-4"
            >
              {/* HEADER */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2
                    className="font-semibold text-lg text-gray-900 cursor-pointer line-clamp-1"
                    onClick={() => router.push(`/recruiter/jobs/${job.uuid}/details`)}
                  >
                    {job.title ? stripHtml(job.title) : "No title provided"}
                  </h2>
                  <p className="text-[#A3A3A3] text-sm">{getPostedDaysAgo(job.created_at)}</p>
                </div>
                <button className="w-10 h-10 flex shrink-0 bg-[#F1F1F1] rounded-full flex justify-center items-center cursor-pointer" onClick={() => router.push(`/recruiter/jobs/${job.uuid}/edit`)}>
                  <img src="/images/edit-btn.svg" width={16} />
                </button>
              </div>

              {/* CHIPS */}
              <div className="flex gap-2 flex-wrap">
                {[job.category?.name, capitalize(job.salary?.pay_type), job.location ? `${job.location.city}, ${job.location.locality}` : ""]
                  .filter(Boolean)
                  .map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-[#F1F1F1] text-[#6E8497]">
                      {tag}
                    </span>
                  ))}
              </div>

              {/* DESCRIPTION */}
              <p className="text-[#30363F] text-sm leading-6 overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>{job.description ? stripHtml(job.description) : "No description provided"}</p>

              {/* FOOTER */}
              <div className="flex items-center justify-between w-full gap-1 mt-auto">
                <span className="font-medium text-[#30363F] whitespace-nowrap">
                  ₹{job.salary?.pay_amount}
                  <span className="text-[#8CA0A9]">/{capitalize(job.salary?.pay_type)}</span>
                </span>
                <span className="text-[#30363F] text-center flex-1 min-w-0 truncate">
                  Start Date: {formatDateOrdinal(job.schedule.start_date)}
                </span>
                <button
                  className="flex justify-center items-center min-w-[80px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
                  style={{
                    backgroundColor: job.applicants_count > 0 ? "#0B8260" : "#6C757D",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    router.push(`/recruiter/jobs/${job.uuid}/applications`)
                  }
                >
                  {job.applicants_count} {job.applicants_count === 1 ? "Applicant" : "Applicants"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* PAGINATION */}
      {totalPages > 1 && (
        <div
          className="flex justify-center mt-auto"
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
