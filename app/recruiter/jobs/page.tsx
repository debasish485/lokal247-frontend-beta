"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/recruiter/jobs", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (res.status === 401) {
          router.replace("/recruiter/auth/signin");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        setJobs(data.data || []);
      } catch (error) {
        console.log("Fetch Error:", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  function stripHtml(html: string) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  const getPostedDaysAgo = (date: string) => {
    if (!date) return "Posted recently";
    const postedDate = new Date(date);
    const now = new Date();
    const diffTime = now.getTime() - postedDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Posted today";
    if (diffDays === 1) return "Posted 1 day ago";
    return `Posted ${diffDays} days ago`;
  };
  const formatDateOrdinal = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const day = date.getDate();

    // Get short month like Jan, Feb, Mar
    const month = date.toLocaleString("en-GB", { month: "short" });

    const year = date.getFullYear();

    const getOrdinal = (n: number) => {
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

  // Capitalize first letter
  const capitalize = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  
  return (
    <div className="w-full flex flex-col gap-[20px] px-5">
      {loading && <p className="text-gray-500">Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && jobs.length === 0 && (
        <p className="text-gray-500">You have not posted any jobs yet.</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 gap-[20px]">
        {jobs.map((job) => (
          <div
            key={job.id ?? job.uuid}
            className="w-full rounded-[10px] bg-white flex flex-col"
            style={{
              border: "1px solid #DEE2E6",
              padding: "25px",
              gap: "24px",
            }}
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div>
                <h2
                  className="font-semibold text-lg text-gray-900 cursor-pointer line-clamp-1"
                  onClick={() => router.push(`/recruiter/jobs/${job.uuid}/details`)}
                >
                  {job.title ? stripHtml(job.title) : "No job title available"}
                </h2>

                <p
                  style={{
                    color: "#A3A3A3",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "16.8px",
                    marginTop: "4px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getPostedDaysAgo(job.created_at)}
                </p>
              </div>

              <button
                className="flex items-center justify-center shrink-0"
                onClick={() => router.push(`/recruiter/jobs/${job.uuid}/edit`)}
              >
                <img
                  src="/images/edit-btn.svg"
                  alt="Edit"
                  style={{ width: "16px", height: "16px" }}
                />
              </button>
            </div>

            {/* DESC */}
            <p
              className="text-sm text-gray-700 leading-6 overflow-hidden min-h-[48px]"
              style={{
                whiteSpace: "pre-line",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {stripHtml(job.description)}
            </p>

            {/* BOTTOM */}
            <div className="mt-auto flex flex-col gap-4">
              {/* TAGS */}
              <div className="flex gap-[5px] flex-wrap">
                {[
                  job.category?.name,
                  job.salary?.pay_type,
                  `${job.location?.city}, ${job.location?.locality}`,
                ]
                  .filter(Boolean)
                  .map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center justify-center text-[#6E8497] text-[13px]"
                      style={{
                        backgroundColor: "#F1F1F1",
                        height: "21px",
                        borderRadius: "13.2px",
                        padding: "4px 10px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
              </div>


              {/* SALARY + BTN */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "16.8px",
                      color: "#1B2021",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ₹{job.salary?.pay_amount}
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "16.8px",
                        color: "#A3A3A3",
                      }}
                    >
                      /{capitalize(job.salary?.pay_type)}
                    </span>
                  </span>

                  <span style={{ color: "#30363F" }}>|</span>

                  <span className="text-[#30363F] text-center flex-1 min-w-0 truncate">
                    Start Date: {formatDateOrdinal(job.schedule.start_date)}
                  </span>
                </div>

                {/* ✅ Applicants count as link */}
                <button
                  className="flex justify-center items-center min-w-[150px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
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
          </div>
        ))}
      </div>
    </div>
  );
}
