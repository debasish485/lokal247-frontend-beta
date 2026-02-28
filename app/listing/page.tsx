"use client"; // make this a client component

import { useState, useEffect, useMemo } from "react";
import BannerSection from "../components/BannerSection";
import FilterSidebar from "../components/FilterSidebar";
import FindJobBanner from "../components/FindJobBanner";
import JobCard from "../components/JobCard";
import JobSkeleton from "../components/skeletons/ListingSkeleton";


export default function ListingPage() {
  const [filters, setFilters] = useState({
    keyword: "",
    pay_type: "",
    city: [] as string[],
    shift_timing: "",
    work_type: [] as string[],
    min_pay: null,
    max_pay: null,
  });

  const [posts, setPosts] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("default");   // default sort
  const [perPage, setPerPage] = useState(10);       // default per page

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError(false);

        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            params.append(key, value.join(",")); // city=kolkata,mumbai
          } else if (value !== "" && value !== null) {
            params.append(key, String(value));
          }
        });

        params.append("sort", sortBy);
        params.append("per_page", String(perPage));

        const res = await fetch(
          `https://dev.nesogent.com/api/job-posts?${params.toString()}`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        setPosts(json.data ?? []);
        setMeta(json.meta ?? null);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filters, sortBy, perPage]);

  // ✅ extract unique cities from posts
  const cities = useMemo(() => {
    const list = posts
      .map(post => post.location?.city)
      .filter(Boolean);

    return Array.from(new Set(list)); // unique
  }, [posts]);

  const from = meta?.from ?? (posts.length ? 1 : 0);
  const to = Math.min(meta?.to ?? posts.length, (meta?.from ?? 1) - 1 + perPage);
  const total = meta?.total ?? posts.length;

  return (
    <>
      <BannerSection />

      {error && (
        <section className="py-10">
          <div className="max-w-[1400px] mx-auto px-4">
            <p className="text-red-500 text-sm">
              Failed to load job posts. Please try again later.
            </p>
          </div>
        </section>
      )}

      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row gap-6">
          {/* ✅ pass cities */}
          <div className="w-[320px]">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-lg text-gray-800">
                Showing {from} - {to} of {total} Results
              </p>
              <div className="flex items-center gap-3">
                {/* Sort By Dropdown */}
                <div className="relative w-40">
                  <select className="block w-full border border-gray-200 rounded px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-0" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option>Sort by (Default)</option>
                    <option value="latest">Latest</option>
                    <option value="salary_high">Salary: High to Low</option>
                    <option value="salary_low">Salary: Low to High</option>
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 flex items-center">
                    <img src="/images/arrow.svg" alt="arrow" className="w-3 h-3" />
                  </div>
                </div>

                {/* Per Page Dropdown */}
                <div className="relative" style={{ minWidth: "6rem" }}>
                  <select className="block w-full border border-gray-200 rounded px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-0" value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                    <option value={10}>10 Per</option>
                    <option value={20}>20 Per</option>
                    <option value={30}>30 Per</option>
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 flex items-center">
                    <img src="/images/arrow.svg" alt="arrow" className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <JobSkeleton key={idx} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="w-full py-10 text-center text-gray-500 text-lg">
                No jobs found matching your filters.
              </div>) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {posts.map((post) => (
                  <JobCard
                    key={post.id}
                    title={post.title}
                    description={post.description}
                    company={post.recruiter?.company_name ?? post.recruiter?.name ?? "Company"}
                    location={post.location ? `${post.location.locality}, ${post.location.city}` : "Location not specified"}
                    salary={`₹${post.salary?.pay_amount ?? 0}`}
                    pay_type={post.salary?.pay_type ?? "Daily"}
                    type={post.category?.name ?? (post.work_type === "wfo" ? "Work From Office" : post.work_type) ?? "Job Type"}
                    shift={post.shift_timing === "day" ? "Day Shift" : post.shift_timing === "night" ? "Night Shift" : post.shift_timing || "Shift"}
                    schedule={post.schedule}
                    logo="/images/icon1.png"
                    uuid={post.uuid}
                    slug={post.slug}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      <FindJobBanner />
    </>
  );
}
