

import QuickApplyForm from "@/app/components/QuickApplyForm";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    job_uuid: string;
  }>;
}

export default async function JobDetailsPage({ params }: PageProps) {
  const { job_uuid } = await params;

  const res = await fetch(
    `https://dev.nesogent.com/api/job-posts/${job_uuid}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    return <p className="text-red-500 text-center py-10">Failed to load job details</p>;
  }

  const json = await res.json();
  const job = json?.data;



  if (!job) {
    return <p className="text-red-500 text-center py-10">Invalid job</p>;
  }


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

  function truncateText(text: string, maxLength: number) {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
  }

  function formatJobType(type?: string) {
    if (!type) return "Job Type";
    let label = "";
    switch (type) {
      case "wfh": label = "Work From Home"; break;
      case "wfo": label = "Work From Office"; break;
      case "hybrid": label = "Hybrid"; break;
      default: label = type;
    }
    // Capitalize first letter of each word
    return label
      .split(" ")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  // 5️⃣ UI
  return (
    <div>
      <section className="relative bg-[#073B3A] overflow-hidden min-h-[380px] lg:min-h-[450px]">
        <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div className="text-white z-10 max-w-xl">
              <nav className="text-sm text-gray-300  mt-16 mb-8">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/listing" className="hover:text-white">
                  Jobs
                </Link>
                <span className="mx-2">/</span>
                <span
                  className="font-semibold text-white"
                  title={job.title ? stripHtml(job.title) : ""} // full title on hover
                >
                  {job.title ? truncateText(stripHtml(job.title), 30) : "No title provided"}
                </span>
              </nav>

              <div className="flex flex-col gap-4">
                <span className="inline-block w-fit bg-white text-black text-xs font-semibold px-4 py-1 rounded-full">
                  {formatJobType(job.schedule?.work_type)}
                </span>

                <h1 className="text-3xl md:text-4xl font-bold mb-3 line-clamp-2">
                  {job.title ? stripHtml(job.title) : "No title Provided"}
                </h1>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span>📍 {job.location.city}, {job.location.locality}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar size={16} />
                    <FaStar size={16} />
                    <FaStar size={16} />
                    <FaStar size={16} />
                    <FaStar size={16} className="text-[#C7D2DD]" />
                  </div>
                  <span>4.6</span>
                </div>

                <p
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {job.description ? stripHtml(job.description) : "No description provided"}
                </p>
              </div>
              {/* INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm mt-8">
                {["Department", "Location", "Salary"].map((label, idx) => {
                  let value = "";
                  if (label === "Department") value = job.category?.name || "-";
                  else if (label === "Location") value = `${job.location?.city || "-"}, ${job.location?.locality || "-"}`;
                  else if (label === "Salary") value = `₹${job.salary?.pay_amount ?? 0} / ${job.salary?.pay_type ?? "-"}`;

                  return (
                    <div
                      key={idx}
                      className="flex flex-col"
                      style={{ minWidth: 0 }}
                    >
                      <p className="text-gray-400">{label}</p>
                      <p className="font-semibold truncate">{value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE (DESKTOP) */}
        <div className="hidden lg:block absolute top-0 right-0 h-full w-[38%]">
          <img src="https://shreethemes.net/jobstock-2.4/jobstock/assets/img/banner-1.jpg" className="h-full w-full object-cover rounded-l-[300px]" />
        </div>

        {/* IMAGE (MOBILE) */}
        <div className="lg:hidden mt-8 px-4">
          <img src="https://shreethemes.net/jobstock-2.4/jobstock/assets/img/banner-1.jpg" className="w-full h-60 object-cover rounded-2xl" />
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT: JOB DETAILS */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>

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
            {/* RIGHT: QUICK APPLY */}
            <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready To Apply?
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                Complete the eligibility checklist and start your application
              </p>
              {/* QuickApplyForm component */}
              <QuickApplyForm jobId={job_uuid} />

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}