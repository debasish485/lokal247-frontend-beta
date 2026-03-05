
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

type JobData = {
    title: string;
    description: string;
    location: { city: string; locality: string };
    salary: { pay_type: string; pay_amount: number };
    category: { name: string };
    schedule?: {
        work_type: string;
    };
};

export default function JobDetailsPage() {
    const { jobId } = useParams();
    const [job, setJob] = useState<JobData | null>(null);
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
    const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"details" | "applicants">("details");

    const router = useRouter();
    const fetchJob = async () => {
        if (!jobId) return;

        try {
            setLoading(true);

            const res = await fetch(`/api/recruiter/jobs/${jobId}/applications`);

            if (!res.ok) throw new Error("Failed to fetch job details");

            const data = await res.json();

            setJob(data.job);
            console.log("API DATA:", data);
            setApplicants(Array.isArray(data.applicants) ? data.applicants : []);

            const hiredApplicant = data.applicants?.find(
                (app: any) => app.status === "hired" || app.status === "completed"
            );

            if (hiredApplicant) {
                setSelectedApplicant(hiredApplicant);
                setSelectedApplicationId(hiredApplicant.id.toString());
            }

        } catch (err) {
            console.error(err);
            setError("Unable to load job details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [jobId]);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!job) return null;

    function formatDate(dateString: string) {
        const date = new Date(dateString);

        const day = date.getDate();
        const year = date.getFullYear();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];

        function getOrdinal(n: number) {
            if (n > 3 && n < 21) return "th";
            switch (n % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }

        return `${day}${getOrdinal(day)} ${month} ${year}`;
    }

    const handleSubmitReview = async () => {
        if (!selectedApplicant || !selectedApplicationId) {
            alert("No applicant selected");
            return;
        }

        try {
            setSubmitting(true);

            const res = await fetch(
                `/api/job-applications/${selectedApplicationId}/reviews`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        rating,
                        comment,
                        reviewee_id: selectedApplicant.worker.id, // worker id
                        reviewee_type: "App\\Models\\User", // as per your API
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
            setRating(0);
            setComment("");
            setSelectedApplicant(null);
            setSelectedApplicationId(null);

            router.refresh();
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };
    function Stars({ rating }: { rating?: number }) {
        const stars = [];
        const r = rating != null ? rating : 4;

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= r ? "text-amber-400" : "text-gray-300"}
                    style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        fontSize: "17px",
                        lineHeight: "11px",

                    }}
                >
                    ★
                </span>
            );
        }
        return <div className="text-xl">{stars}</div>;
    }
    function formatJobType(type?: string) {
        if (!type) return "";
        switch (type) {
            case "wfh": return "Work From Home";
            case "wfo": return "Work From Office";
            case "hybrid": return "Hybrid";
            default: return type;
        }
    }

    const handleHire = async () => {
        if (!selectedApplicationId) return;

        console.log("========= HANDLE HIRE =========");

        console.log("Job ID:", jobId);
        console.log("Application ID sending:", selectedApplicationId);
        console.log("Full URL:", `/api/recruiter/jobs/${jobId}/applications/status`);
        if (selectedApplicant?.status !== "applied") {
            alert("Only applied candidates can be hired.");
            return;
        }

        await fetch(`/api/recruiter/jobs/${jobId}/applications/status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                application_id: selectedApplicationId,
                status: "hired",
            }),
        });

        await fetchJob();
    };

    const handleMarkAsComplete = async () => {
        if (!selectedApplicationId) return;

        if (selectedApplicant?.status !== "hired") {
            alert("Only hired worker can be marked as completed.");
            return;
        }

        await fetch(`/api/recruiter/jobs/${jobId}/applications/status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                application_id: selectedApplicationId,
                status: "completed",
            }),
        });

        await fetchJob();
        setShowModal(true); // review modal
    };

    return (
        <>
            <div className="w-full bg-[#1B2021] text-white h-[345px]">
                <div className="flex flex-col md:flex-row w-full h-full">

                    {/* LEFT HALF */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4">
                        <div className="flex flex-col gap-4 max-w-[600px]  w-full md:pr-6">

                            <div className="text-sm text-gray-400 flex items-center gap-2 mt-8">
                                <span
                                    onClick={() => router.push("/recruiter/dashboard")}
                                    className="cursor-pointer text-[#0B8260]"
                                >
                                    Home
                                </span>
                                <span>/</span>
                                <span
                                    onClick={() => router.push("/recruiter/jobs")}
                                    className="cursor-pointer text-[#0B8260]"
                                >
                                    My Jobs
                                </span>
                                <span>/</span>
                                <span className="text-white">Job Details</span>
                            </div>

                            <div className="mt-8">
                                <span className="inline-block w-fit bg-white text-black text-xs font-semibold px-4 py-1 rounded-full">
                                    {formatJobType(job.schedule?.work_type)}
                                </span>
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 line-clamp-2 md:line-clamp-1">
                                    {job.title ? stripHtml(job.title) : "No title provided"}
                                </h1>
                                <p className="mt-1 break-words">
                                    {job.location.city}, {job.location.locality}
                                </p>
                                <p
                                    className="mt-2 line-clamp-3 md:line-clamp-1"
                                >
                                    {job.description ? stripHtml(job.description) : "No description provided"}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12 mt-6">
                                <div className="flex items-center gap-2 min-w-[120px]">
                                    <img src="/images/category.svg" alt="Category" className="w-10 h-10" />
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-base">Category</span>
                                        <span className="font-semibold truncate">{job.category.name}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 min-w-[140px]">
                                    <img src="/images/location.svg" alt="Location" className="w-10 h-10" />
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-base">Location</span>
                                        <span className="font-semibold truncate">
                                            {job.location.city}, {job.location.locality}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-base min-w-[140px]">
                                        Expected Payment
                                    </span>
                                    <span className="font-semibold truncate">
                                        ₹{job.salary.pay_amount} /{" "}
                                        {job.salary.pay_type.charAt(0).toUpperCase() +
                                            job.salary.pay_type.slice(1)}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT HALF (IMAGE TOUCHES SCREEN EDGE) */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center mt-6 md:mt-0">
                        <img
                            src="/images/jobDetailsleft-img.svg"
                            alt="Job Image"
                            className="max-w-[520px] w-full h-auto object-contain"
                        />
                    </div>

                </div>
            </div>

            <div className="mt-10 flex gap-4 max-w-screen-xl mx-auto pl-8">
                <h1
                    onClick={() => setActiveTab("details")}
                    className={`cursor-pointer font-bold min-w-[85px] text-center ${activeTab === "details" ? "border-b-2 border-[#0B8260]" : ""
                        }`}
                >
                    Details
                </h1>

                <h1
                    onClick={() => setActiveTab("applicants")}
                    className={`cursor-pointer font-bold min-w-[85px] text-center ${activeTab === "applicants" ? "border-b-2 border-[#0B8260]" : ""
                        }`}
                >
                    Applicants
                </h1>
            </div>
            {/* Horizatonal Line*/}
            <div className="border-b border-gray-200 mx-auto" style={{ maxWidth: "1230px" }}></div>


            <div className="max-w-screen-xl mx-auto mt-6 flex flex-col lg:flex-row gap-4 px-4">
                {/* ================= LEFT SECTION ================= */}
                <div className="flex-1 min-w-0">

                    {/* -------- DETAILS TAB -------- */}
                    {activeTab === "details" && (
                        <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-h-[293px]">
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
                    )}

                    {/* -------- APPLICANTS TAB -------- */}
                    {activeTab === "applicants" && (
                        applicants.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {applicants.map((app, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setSelectedApplicant(app);
                                            setSelectedApplicationId(app.id.toString());
                                        }}
                                        className="bg-white p-6 rounded-lg shadow-md border"
                                        style={{ borderColor: "#DEE2E6" }}
                                    >
                                        {/* Top row */}
                                        <div className="flex gap-4 items-start">
                                            <img src="/images/applicant-profile.svg" className="w-16 h-16" />

                                            <div className="flex flex-col gap-1">
                                                <h1 className="font-bold text-lg">{app.worker.name}</h1>
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <img src="/images/gray-location.svg" className="w-4 h-4" />
                                                    <p>{job.location.city}, {job.location.locality}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 mt-4">
                                            <div className="flex items-center gap-2">
                                                <img src="/images/email.svg" className="w-6 h-6" />
                                                <p>{app.worker.email}</p>
                                            </div>

                                            <div className="flex items-center">
                                                <img src="/images/mobile.svg" className="w-6 h-6" />
                                                <p>+{app.worker.mobile_number}</p>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-gray-600 line-clamp-2">
                                            Consistently create well-designed, tested code using best practices for website development...
                                        </p>

                                        <div className="flex items-center justify-between mt-6">
                                            <div className="flex items-center gap-3 text-sm">
                                                <span className="font-bold">
                                                    ₹{job.salary.pay_amount}
                                                    <span className="text-gray-400">
                                                        /{job.salary.pay_type.charAt(0).toUpperCase() + job.salary.pay_type.slice(1)}
                                                    </span>
                                                </span>

                                                <span>
                                                    <span className="font-bold whitespace-nowrap">Applied On:</span>{" "}
                                                    {formatDate(app.applied_at)}
                                                </span>
                                            </div>

                                            {app.status === "applied" ? (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedApplicant(app);
                                                        setSelectedApplicationId(app.id.toString());
                                                        handleHire();
                                                    }}
                                                    className="flex justify-center items-center min-w-[80px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
      bg-[#0B8260] hover:bg-[#0a6f51] text-white px-4 py-2 shadow-sm transition"
                                                >
                                                    Hire
                                                </button>
                                            ) : (
                                                <span className="font-semibold text-gray-500 capitalize">
                                                    {app.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg shadow-md flex justify-center items-center">
                                <p className="text-gray-500 text-lg font-semibold">
                                    No applicants have applied yet
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* RIGHT SECTION (same as details page) */}
                {/* ================= RIGHT PANEL ================= */}
                {/* ================= RIGHT SECTION (ALWAYS SAME, DYNAMIC) ================= */}
                <div className="w-full lg:w-[450px] bg-white p-6 rounded-lg shadow-md">
                    {selectedApplicant ? (
                        <>
                            {/* Top row */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img src="/images/instagram.svg" className="w-16 h-16" />
                                    <div className="flex flex-col">
                                        <h1 className="font-semibold text-[20px]">
                                            {selectedApplicant.worker.name}
                                        </h1>
                                        <div className="flex items-center mt-1">
                                            <img src="/images/gray-location.svg" className="w-4 h-4" />
                                            <p className="text-[#0F161EA6]">
                                                {job.location.locality}, {job.location.city}
                                            </p>
                                        </div>
                                        <Stars rating={4} />
                                    </div>
                                </div>
                                <img src="/images/badge.svg" className="w-[46px] h-[46px] -mt-8" />
                            </div>

                            {/* Contact info */}
                            <div className="flex gap-24 mt-4">
                                <div>
                                    <h2 className="text-[#0F161EA6]">Contact No</h2>
                                    <h3 className="font-semibold">{selectedApplicant.worker.mobile_number || "N/A"}</h3>
                                </div>
                                <div>
                                    <h2 className="text-[#0F161EA6]">Email</h2>
                                    <h3 className="font-semibold">{selectedApplicant.worker.email || "N/A"}</h3>
                                </div>
                            </div>


                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 mt-6">
                                {selectedApplicant?.status === "hired" && (
                                    <button
                                        onClick={handleMarkAsComplete}
                                        className="w-[250px] h-[44px] rounded-lg text-[#0B8260] bg-[#CCE5DE] border border-[#0B8260]"
                                    >
                                        Mark As Complete
                                    </button>
                                )}

                                {selectedApplicant?.status === "completed" && (
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="w-[250px] h-[44px] rounded-lg bg-yellow-500 text-white"
                                    >
                                        Give Review
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setSelectedApplicant(null);
                                        setSelectedApplicationId(null);
                                    }}
                                    className="w-[250px] h-[44px] rounded-lg text-[#FF3831] bg-[#FFD8D7] border border-[#FF3831]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 text-center">
                            Select an applicant to see details
                        </p>
                    )}
                </div>
            </div>

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


            <div className="mt-10 bg-[#0B8260] text-white p-10 flex flex-col items-center gap-6 text-center">
                {/* H1s */}
                <div className="flex flex-col gap-2 mt-6">
                    <h1 className="text-3xl font-bold">Find The Perfect Job</h1>
                    <h1 className="text-3xl font-bold">on our platform That is Superb For You</h1>
                </div>

                {/* Paragraphs */}
                <div className="flex flex-col gap-2 text-center">
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos</p>
                    <p>dolores et quas molestias</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-4 h-14 mb-6">
                    <button className="bg-[#262D2F] text-white px-6 py-2 rounded-md hover:opacity-90">
                        Upload Resume
                    </button>
                    <button className="bg-white text-[#0B8260] px-6 py-2 rounded-md hover:opacity-90">
                        Join Our Team
                    </button>
                </div>
            </div>
        </>
    );
}
