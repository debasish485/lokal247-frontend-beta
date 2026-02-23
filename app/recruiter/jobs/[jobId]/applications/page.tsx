
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
};

export default function JobDetailsPage() {
    const { jobId } = useParams();
    const [job, setJob] = useState<JobData | null>(null);
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router=useRouter();
    useEffect(() => {
        if (!jobId) return;

        const fetchJob = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/recruiter/jobs/${jobId}/applicants`
                );

                if (!res.ok) throw new Error("Failed to fetch job details");

                const data = await res.json();

                // 👇 according to your API response
                setJob(data.job);
                setApplicants(data.applicant);

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


    return (
        <>
            <div className="w-full bg-[#1B2021] text-white h-[345px]">
                <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto h-full">
                    {/* LEFT SIDE */}
                    <div className="flex flex-col gap-6 w-1/2 max-w-[600px] mt-10">
                        {/* Job Title */}
                        <div>
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


            <div className="max-w-screen-xl mx-auto mt-6 flex gap-4">
                {applicants.length > 0 ? (


                    <>
                        {/* LEFT SECTION */}
                        <div className="flex">
                            <div className="grid grid-cols-2 gap-2">
                                {applicants.map((app, index) => (
                                    <div
                                        key={index}
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

                                            <div className="flex items-center gap-2">
                                                <img src="/images/mobile.svg" className="w-6 h-6" />
                                                <p>{app.worker.mobile_number}</p>
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
                                                    <span className="font-bold whitespace-nowrap">Applied On:</span> {formatDate(app.applied_at)}
                                                </span>
                                            </div>

                                            <button className="flex justify-center items-center min-w-[80px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none">
                                                Hire
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 text-center py-20 bg-white rounded-lg shadow-md flex justify-center items-center">
                        <p className="text-gray-500 text-lg font-semibold">
                            No applicants have applied yet
                        </p>
                    </div>
                )}

                {/* RIGHT SECTION (same as details page) */}
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
