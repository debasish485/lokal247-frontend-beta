

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
  // 5️⃣ UI
  return (
    <div>
      <section className="relative bg-[#073B3A] overflow-hidden min-h-[380px] lg:min-h-[450px]">
        <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div className="text-white z-10 max-w-xl">
              <nav className="text-sm text-gray-300 mb-4">
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

              <span className="inline-block bg-white text-[#073B3A] text-xs font-semibold px-4 py-1 rounded-full mb-4">
                Full Time
              </span>

              <h1 className="text-3xl md:text-4xl font-bold mb-3 line-clamp-2 mt-8">
                {job.title ? stripHtml(job.title) : "No title Provided"}
              </h1>

              <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
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
                className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {job.description ? stripHtml(job.description) : "No description provided"}
              </p>
              {/* INFO */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm mt-4">
                <div>
                  <p className="text-gray-400">Department</p>
                  <p className="font-semibold">{job.category.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="font-semibold">
                    {job.location.city}, {job.location.locality}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Salary</p>
                  <p className="font-semibold">
                    ₹{job.salary.pay_amount} / {job.salary.pay_type}
                  </p>
                </div>
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
                  [&>p]:mb-4 
                  [&>p]:leading-relaxed 
                  [&>ul]:list-none [&>ul]:ml-6 [&>ul]:mb-6
                  [&>ul>li]:mb-4
                  [&>ol]:list-none [&>ol]:ml-6 [&>ol]:mb-6
                  [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-6
                  [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-3
                  [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mb-3
                  [&>strong]:font-semibold
                  [&>em]:italic
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