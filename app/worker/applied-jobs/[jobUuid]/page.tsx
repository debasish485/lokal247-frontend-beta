"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppliedJobDetails() {
  const { jobUuid } = useParams();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`/api/worker/applied-jobs/${jobUuid}`, {
          credentials: "include",
          cache: "no-store",
        });

        

        const result = await res.json();
        console.log("Fetched application_id:", result.data.application_id);
      console.log("Fetched job.uuid:", result.data.job.uuid);

        if (!res.ok) {
          setError(result.message || "Failed to load application details");
          return;
        }

        setData(result.data);
       
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobUuid]);

  function stripHtml(html: string) {
    if (!html) return "";

    // Remove tags
    let text = html.replace(/<[^>]+>/g, "");

    // Replace common entities
    text = text.replace(/&nbsp;/g, " ");
    text = text.replace(/&amp;/g, "&");
    text = text.replace(/&lt;/g, "<");
    text = text.replace(/&gt;/g, ">");
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#39;/g, "'");

    return text;
  }

  const handleSubmitReview = async () => {
    try {
      setSubmitting(true);

      const res = await fetch(
        `/api/job-applications/${data.application_uuid}/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rating,
            comment,
            reviewee_id: data.job.recruiter.id,
            reviewee_type: "App\\Models\\Recruiter",
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Failed to submit review");
        return;
      }

      alert("Review submitted successfully");
      setShowModal(false);
      router.refresh();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  function formatJobType(type?: string) {
    if (!type) return "";
    switch (type) {
      case "wfh": return "Work From Home";
      case "wfo": return "Work From Office";
      case "hybrid": return "Hybrid";
      default: return type;
    }
  }
const handleMarkAsComplete = async () => {
    if (!selectedApplicationId) return;

    try {
        setSubmitting(true);

        const res = await fetch(`/api/recruiter/jobs/${jobUuid}/applicants/status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                application_id: selectedApplicant.id,
                status: "completed", // ✅ mark complete
            }),
        });

        const data = await res.json();

        if (!res.ok || data.status === false) {
            alert(data.message || "Failed to mark as complete");
            return;
        }

        // ✅ Frontend update
        setApplicants(prev =>
            prev.map(a =>
                a.job_application_uuid === selectedApplicationId
                    ? { ...a, status: "completed" }
                    : a
            )
        );

        alert("Applicant marked as complete ✅");
        setShowModal(true); // ✅ modal open kore review dite

    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    } finally {
        setSubmitting(false);
    }
};
  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const job = data.job;

  return (
    <>
      {/* HEADER (same as recruiter page) */}
      <div className="w-full bg-[#1B2021] text-white h-[345px]">
        <div className="flex flex-col md:flex-row w-full h-full">

          {/* LEFT HALF */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4">
            <div className="flex flex-col gap-4 max-w-[600px] mt-2 w-full md:pr-6">

              <div className="text-sm text-gray-400 flex items-center gap-2 mt-4">
                <span
                  onClick={() => router.push("/")}
                  className="cursor-pointer text-[#0B8260]"
                >
                  Home
                </span>
                <span>/</span>
                <span
                  onClick={() => router.push("/worker/applied-jobs")}
                  className="cursor-pointer text-[#0B8260]"
                >
                  Applied Jobs
                </span>
                <span>/</span>
                <span className="text-white">Job Details</span>
              </div>

              <div className="mt-8">
                <span className="inline-block w-fit bg-white text-black text-xs font-semibold px-4 py-1 rounded-full">
                  {formatJobType(job.schedule?.work_type)}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 line-clamp-2 md:line-clamp-1">
                  {stripHtml(job.title)}
                </h1>
                <p className="mt-1 break-words">
                  {job.location.city}, {job.location.locality}
                </p>
                <p className="mt-2 line-clamp-3 md:line-clamp-1">
                  {stripHtml(job.description)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12 mt-6">

                {/* CATEGORY */}
                <div className="flex items-center gap-2 min-w-[120px]">
                  <img src="/images/category.svg" alt="Category" className="w-10 h-10" />
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-base">Category</span>
                    <span className="font-semibold truncate">
                      {job.category.name}
                    </span>
                  </div>
                </div>

                {/* LOCATION */}
                <div className="flex items-center gap-2 min-w-[140px]">
                  <img src="/images/location.svg" alt="Location" className="w-10 h-10" />
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-base">Location</span>
                    <span className="font-semibold truncate">
                      {job.location.city}, {job.location.locality}
                    </span>
                  </div>
                </div>

                {/* PAYMENT */}
                <div className="flex flex-col">
                  <span className="text-gray-400 text-base min-w-[140px]">
                    Expected Payment
                  </span>
                  <span className="font-semibold truncate">
                    ₹{job.salary.pay_amount} / {job.salary.pay_type}
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT HALF IMAGE */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center mt-6 md:mt-0">
            <img
              src="/images/jobDetailsleft-img.svg"
              alt="Job Image"
              className="max-w-[520px] w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* DETAILS BODY */}
      <div className="max-w-screen-xl mx-auto mt-10 flex flex-col lg:flex-row gap-4 px-4">

        {/* LEFT */}
        <div className="flex-1 min-w-0 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Job Description</h1>
          <div
            className="
    break-words
    overflow-hidden
    max-w-full

    [&_ul]:list-disc
    [&_ul]:ml-6
    [&_ul]:mb-4

    [&_ol]:list-decimal
    [&_ol]:ml-6
    [&_ol]:mb-4

    [&_li]:mb-2

    [&_p]:mb-3

    [&_img]:max-w-full
    [&_img]:h-auto
  "
            dangerouslySetInnerHTML={{ __html: job.description || "No description provided" }}
          />
        </div>

        {/* RIGHT PANEL (same layout as recruiter right panel) */}
        <div className="w-full lg:w-[450px] bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="/images/instagram.svg" className="w-16 h-16" />
              <div className="flex flex-col">
                <h1 className="font-semibold text-[20px]">
                  {job.recruiter.company_name}
                </h1>
                <div className="flex items-center mt-1">
                  <img src="/images/gray-location.svg" className="w-4 h-4" />
                  <p className="text-[#0F161EA6]">
                    {job.location.city}, {job.location.locality}
                  </p>
                </div>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={i <= 4 ? "text-amber-400" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <img src="/images/badge.svg" className="w-[46px] h-[46px] -mt-8" />
          </div>

          <div className="flex gap-24 mt-4">
            <div>
              <h2 className="text-[#0F161EA6]">Contact No</h2>
              <h3 className="font-semibold">+91 99999 88888</h3>
            </div>
            <div>
              <h2 className="text-[#0F161EA6]">Email</h2>
              <h3 className="font-semibold">demo@gmail.com</h3>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => handleUpdateStatus("completed")}
              className="w-[250px] h-[44px] rounded-lg text-[#0B8260] bg-[#CCE5DE] border border-[#0B8260]"
            >
              Mark As Complete
            </button>
            <button
              onClick={() => handleUpdateStatus("cancelled")}
              className="w-[250px] h-[44px] rounded-lg text-[#FF3831] bg-[#FFD8D7] border border-[#FF3831]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[380px] p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              ⭐ Submit Review
            </h2>

            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience..."
              className="w-full border rounded p-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitReview}
                disabled={submitting}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}