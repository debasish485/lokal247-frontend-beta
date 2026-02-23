"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppliedJobDetails() {
    const { jobUuid } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchJobDeatils = async () => {
            try {
                const res = await fetch(`/api/worker/applied-jobs/${jobUuid}`, {
                    credentials: "include",
                    cache: "no-store",
                });

                const result = await res.json();

                if (!res.ok) {
                    setError(result.message || "Failed to load application details");
                    return;
                }
                setData(result.data);
            } catch (error) {
                console.log(error);
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchJobDeatils();
    }, [jobUuid]);

    const handleSubmitReview = async () => {
        try {
            setSubmitting(true);

            const res = await fetch(`/api/job-applications/${data.application_uuid}/reviews`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rating, comment,reviewee_id: data.job.recruiter.id,reviewee_type: "App\\Models\\Recruiter" }),
            });
            const result = await res.json();
            console.log("Review Result:",result);

            if (!res.ok) {
                alert(result.message || "failed to submit review");
                return;
            }
            alert("Review submitted successfully");
            setShowModal(false);
            router.refresh();
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <p className="p-6 text-gray-950">Loading application...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    const job = data.job;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Application Details</h1>
            {/* STATUS CHIPS */}
            <div className="flex gap-3 mb-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="px-3 py-1 rounded-full bg-green-600 text-white"
                >
                    Completed
                </button>

                <button
                    className="px-3 py-1 rounded-full bg-red-600 text-white"
                    onClick={() => alert("Cancel logic later")}
                >
                    Cancel
                </button>
            </div>

            <hr className="my-4" />

            <p className="text-gray-800"><b className="text-gray-900">Job:</b> {job.title}</p>
            <p className="text-gray-800"><b className="text-gray-900">Category:</b> {job.category.name}</p>
            <p className="text-gray-800"><b className="text-gray-900">Company:</b> {job.recruiter.company_name}</p>
            <p className="text-gray-800"><b className="text-gray-900">Recruiter:</b> {job.recruiter.name}</p>
            <p className="text-gray-800"><b className="text-gray-900">Location:</b> {job.location.city}, {job.location.locality}</p>
            <p className="text-gray-800"><b className="text-gray-900">Salary:</b> ₹{job.salary.pay_amount} / {job.salary.pay_type}</p>
            <p className="text-gray-800"><b className="text-gray-900">Applied At:</b> {new Date(data.applied_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            })}</p>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl w-[380px] shadow-2xl p-6 animate-fadeIn">

                        {/* Title */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                            ⭐ Submit Review
                        </h2>

                        {/* Rating */}
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Rating
                        </label>
                        <div className="flex gap-2 mb-4 justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`text-3xl transition ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                        } hover:scale-110`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        {/* Comment */}
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Comment
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your experience..."
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                            rows="3"
                        />

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmitReview}
                                disabled={submitting}
                                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {submitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}