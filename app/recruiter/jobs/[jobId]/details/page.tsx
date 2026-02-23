
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


type JobData = {
    title: string;
    description: string;
    location: { city: string; locality: string };
    salary: { pay_type: string; pay_amount: number };
    category: { name: string };
};

export default function JobDetailsPage() {
    const { jobId } = useParams();
    const [job, setJob] = useState<JobData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!jobId) return;

        const fetchJob = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/job-posts/${jobId}`);
                if (!res.ok) throw new Error("Failed to fetch job details");
                const data = await res.json();
                setJob(data.data);
            } catch (err: any) {
                console.error(err);
                setError("Unable to load job details");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    function stripHtml(html: string) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!job) return null;

    return (
        <>
            <div className="w-full bg-[#1B2021] text-white h-[345px]">

                <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto h-full">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col gap-6 w-1/2 max-w-[600px] mt-2">
                        <div className="text-sm text-gray-400 flex items-center gap-2">
                            <span
                                onClick={() => router.push("/recruiter/jobs")}
                                className="cursor-pointer hover:underline text-[#0B8260]"
                            >
                                My Jobs
                            </span>
                            <span>/</span>
                            <span className="text-gray-500">Job Details</span>
                        </div>
                        {/* Job Title */}
                        <div>
                            {/* Job Title */}
                            <h1 className="text-3xl font-bold mt-10 line-clamp-1">
                                {job.title ? stripHtml(job.title) : "No title provided"}
                            </h1>
                            <p className="mt-1 whitespace-nowrap">
                                {job.location.city}, {job.location.locality}
                            </p>
                            <p
                                className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap"
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {job.description ? stripHtml(job.description) : "No description provided"}
                            </p>
                        </div>

                        {/* Category / Location / Payment */}
                        <div className="flex items-start gap-24 mt-6">
                            {/* Category */}
                            <div className="flex items-center gap-2 min-w-[120px]">
                                <img src="/images/category.svg" alt="Category" className="w-10 h-10" />
                                <div className="flex flex-col">
                                    <span className="text-gray-400 font-normal text-base">Category</span>
                                    <span className="font-semibold truncate">{job.category.name}</span>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2 min-w-[140px]">
                                <img src="/images/location.svg" alt="Location" className="w-10 h-10" />
                                <div className="flex flex-col">
                                    <span className="text-gray-400 font-normal text-base">Location</span>
                                    <span className="font-semibold truncate">
                                        {job.location.city}, {job.location.locality}
                                    </span>
                                </div>
                            </div>

                            {/* Expected Payment */}
                            <div className="flex flex-col">
                                <span className="text-gray-400 font-normal text-base min-w-[140px]">Expected Payment</span>
                                <span className="font-semibold truncate">
                                    ₹{job.salary.pay_amount} / {job.salary.pay_type.charAt(0).toUpperCase() + job.salary.pay_type.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className="flex justify-end items-center">
                        <img
                            src="/images/jobDetailsleft-img.svg"
                            alt="Job Image"
                            className="max-w-[400px] w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </div>


            <div className="mt-10 flex gap-4 max-w-screen-xl mx-auto">
                <h1 className="cursor-pointer font-bold min-w-[90px] text-center"onClick={() => router.push(`/recruiter/jobs/${job.uuid}/details`)}>
                    Details
                </h1>
                <h1 className="cursor-pointer font-bold min-w-[120px] text-center">
                    Applicants
                </h1>
            </div>

            {/* Horizatonal Line*/}
            <div className="border-b border-gray-200 mx-auto mt-4" style={{ maxWidth: "1290px" }}></div>

            <div className="max-w-screen-xl mx-auto  mt-6">
                <div className="flex gap-7">
                    {/* LEFT SECTION */}
                    <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4 text-[#333333]">Job Description</h1>
                        <p
                            style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 4,       // max 4 line
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                wordBreak: "break-word",  
                            }}
                        >
                            {job.description ? stripHtml(job.description) : "No description provided"}
                        </p>   
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="w-[450px] bg-white p-6 rounded-lg shadow-md flex-shrink-0">
                        {/* Top row: Image + Company name */}
                        <div className="flex items-center gap-4">
                            <img src="/images/instagram.svg" alt="Instagram" className="w-16 h-16" />
                            <div className="flex flex-col">
                                <h1 className="font-bold text-lg">Tirupati Tours and Travels Agency</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <img src="/images/gray-location.svg" alt="location" className="w-4 h-4" />
                                    <p>Shivajinagar, Bangalore</p>
                                </div>
                            </div>
                        </div>

                        {/* Two columns */}
                        <div className="flex gap-8 mt-4 justify-between">
                            {/* Column 1 */}
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h2 className="text-sm text-gray-500">Company Founder</h2>
                                    <h3 className="font-medium">Mr. Daniel Mark</h3>
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">Founded</h2>
                                    <h2 className="font-medium">1997</h2>
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">Revenue</h2>
                                    <h2 className="font-medium">$70B+</h2>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h2 className="text-sm text-gray-500">Industry</h2>
                                    <h2 className="font-medium">Tour and Travel</h2>
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">Head Office</h2>
                                    <h2 className="font-medium">London, UK</h2>
                                </div>
                                <div>
                                    <h2 className="text-sm text-gray-500">Company Size</h2>
                                    <h2 className="font-medium">20,000+ Emp.</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-[#0B8260] text-white p-10 flex flex-col items-center gap-6 text-center">
                {/* H1s */}
                <div className="flex flex-col gap-2 mt-6">
                    <h1 className="text-3xl font-bold">Find The Perfect Job</h1>
                    <h1 className="text-3xl font-bold">on our platform That is Superb For You</h1>
                </div>

                {/* Paragraphs */}
                <div className="flex flex-col gap-2 whitespace-nowrap">
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
