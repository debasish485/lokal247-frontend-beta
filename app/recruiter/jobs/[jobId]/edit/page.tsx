"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import JobDescriptionEditor from "@/app/components/JobDescriptionEditor";

export default function EditJobPage() {
    const { jobId } = useParams();
    const router = useRouter();
    const [job, setJob] = useState<any>(null);

    useEffect(() => {
        if (!jobId) return;

        fetch(`/api/recruiter/job-posts/${jobId}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("EDIT JOB RAW 👉", data);
                setJob(data.job);
            });
    }, [jobId]);

    if (!job) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded space-y-3">
            <h2 className="text-lg font-semibold mb-4">Edit Job</h2>

            {/* TITLE */}
            <input
                className="w-full border p-2"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                placeholder="Job title"
            />

            {/* DESCRIPTION */}
            <JobDescriptionEditor
                value={job.description}
                onChange={(val: string) =>
                    setJob({ ...job, description: val })
                }
            />

            {/* CITY */}
            <input
                className="w-full border p-2"
                value={job.location?.city || ""}
                onChange={(e) =>
                    setJob({
                        ...job,
                        location: { ...job.location, city: e.target.value },
                    })
                }
                placeholder="City"
            />

            {/* LOCALITY */}
            <input
                className="w-full border p-2"
                value={job.location?.locality || ""}
                onChange={(e) =>
                    setJob({
                        ...job,
                        location: { ...job.location, locality: e.target.value },
                    })
                }
                placeholder="Locality"
            />

            {/* PAY TYPE */}
            <select
                className="w-full border p-2"
                value={job.salary?.pay_type || ""}
                onChange={(e) =>
                    setJob({
                        ...job,
                        salary: { ...job.salary, pay_type: e.target.value },
                    })
                }
            >
                <option value="">Select pay type</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>

            {/* PAY AMOUNT */}
            <input
                type="number"
                className="w-full border p-2"
                value={job.salary?.pay_amount || ""}
                onChange={(e) =>
                    setJob({
                        ...job,
                        salary: { ...job.salary, pay_amount: e.target.value },
                    })
                }
                placeholder="Pay amount"
            />

            {/* NUMBER OF WORKERS */}
            <input
                type="number"
                className="w-full border p-2"
                value={job.number_of_workers || ""}
                onChange={(e) =>
                    setJob({ ...job, number_of_workers: e.target.value })
                }
                placeholder="Number of workers"
            />

            {/* GENDER */}
            <select
                className="w-full border p-2"
                value={job.gender_preference || ""}
                onChange={(e) =>
                    setJob({ ...job, gender_preference: e.target.value })
                }
            >
                <option value="">Gender preference</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="any">Any</option>
            </select>

            {/* START DATE */}
            <input
                type="date"
                className="w-full border p-2"
                value={job.schedule?.start_date?.split("T")[0] || ""}
                onChange={(e) =>
                    setJob({
                        ...job,
                        schedule: { ...job.schedule, start_date: e.target.value },
                    })
                }
            />

            {/* SHIFT TIMING */}
            <input
                className="w-full border p-2"
                value={job.schedule?.shift_timing || ""}
                onChange={(e) =>
                    setJob({
                        ...job,
                        schedule: { ...job.schedule, shift_timing: e.target.value },
                    })
                }
                placeholder="Shift timing"
            />

            {/* UPDATE BUTTON */}
            <button
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                    const payload = {
                        title: job.title,
                        description: job.description,
                        city: job.location?.city,
                        locality: job.location?.locality,
                        pay_type: job.salary?.pay_type,
                        pay_amount: job.salary?.pay_amount,
                        number_of_workers: job.number_of_workers,
                        gender_preference: job.gender_preference,
                        start_date: job.schedule?.start_date,
                        shift_timing: job.schedule?.shift_timing,
                    };

                    console.log("PUT PAYLOAD 👉", payload);

                    await fetch(`/api/recruiter/job-posts/${job.uuid}`, {
                        method: "PUT",
                        headers: { 
                            "Content-Type": "application/json",
                            "Accept":"application/json",
                         },
                        credentials: "include",
                        body: JSON.stringify(payload), 
                    });

                    alert("Updated!");
                    router.push("/recruiter/jobs");
                }}
            >
                Update Job
            </button>
        </div>
    );
}