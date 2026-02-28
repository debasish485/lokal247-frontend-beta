"use client";

import { useEffect, useState } from "react";
import NewsletterCard from "./NewsletterCard";
import DoubleRangeSlider from "./DoubleRangeSlider";

type FilterSidebarProps = {
  filters: any;
  setFilters: (filters: any) => void;

};

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<"payment" | "city" | "shift" | "job" | null>(null);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/cities");
        const data = await res.json();
        console.log("API cities response:", data);

        setCities(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("City fetch failed", error);
        setCities([]); // fallback
      }
    };

    fetchCities();
  }, []);

  const paymentOptions = [
    { value: "daily", label: "Daily" },
    { value: "monthly", label: "Monthly" },
  ];

  const shiftOptions = [
    { value: "day", label: "Day" },
    { value: "night", label: "Night" },
    { value: "rotational", label: "Rotational" },
  ];

  const jobTypeOptions = [
    { value: "wfh", label: "Work From Home" },
    { value: "wfo", label: "Work From Office" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const toggleDropdown = (name: typeof openDropdown) =>
    setOpenDropdown(prev => (prev === name ? null : name));

  //const arrowClass = "w-[25px] h-[25px] flex items-center justify-center rounded-full";



  const checkboxOption = (
    label: string,
    value: string,
    selectedValue: string,
    onSelect: (v: string) => void
  ) => (
    <div
      className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 px-2 rounded"
      onClick={() => onSelect(value)}
    >
      <div
        className={`w-4 h-4 border rounded-sm ${selectedValue === value
          ? "bg-emerald-600 border-emerald-600"
          : "border-gray-300"
          }`}
      ></div>
      <span className="text-sm text-gray-900">{label}</span>
    </div>
  );

  const handleClear = () => {
    setFilters({
      keyword: "",
      pay_type: "",
      city: "",
      shift_timing: "",
      work_type: "",
      min_pay: null,
      max_pay: null,
    });
    setOpenDropdown(null);
  };

  return (
    <aside className="w-full flex-shrink-0 h-auto overflow-auto p-4 space-y-0 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 mb-6 border-b border-gray-200">
        <h2 className="text-[20px] font-semibold leading-[24px] font-sans">Search Filter</h2>
        <button
          onClick={handleClear}
          className="text-[15px] font-normal text-[#0F161EA6] hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Keyword */}
      <input
        type="text"
        value={filters.keyword}
        onChange={e => setFilters({ ...filters, keyword: e.target.value })}
        placeholder="Search by keywords..."
        className="w-full h-[56px] px-3 py-3 border rounded-lg border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-0"
      />

      {/* Payment */}
      <div className="relative">
        <div
          className="w-full h-[56px] px-3 flex justify-between items-center cursor-pointer font-bold"

          onClick={() => toggleDropdown("payment")}
        >
          <span className="text-sm text-gray-900">
            Payment Type
          </span>
          <span className="w-[25px] h-[25px] flex items-center justify-center rounded-full">
            <img
              src={openDropdown === "payment" ? "/images/down-arrow.svg" : "/images/up-arrow.svg"}
              alt="arrow"
              style={{ width: "36px", height: "36px" }}
            />
          </span>
        </div>

        {openDropdown === "payment" && (
          <div className="mt-2 space-y-1">
            {paymentOptions.map(opt =>
              checkboxOption(
                opt.label,
                opt.value,
                filters.pay_type,
                v =>
                  setFilters({
                    ...filters,
                    pay_type: filters.pay_type === v ? "" : v,
                  })
              )
            )}
          </div>
        )}
      </div>
      <div className="border-b border-gray-200"></div>


      {/* City */}
      <div className="relative">
        <div
          className="w-full h-[48px] px-3 py-2 flex justify-between items-center cursor-pointer font-bold"
          onClick={() => toggleDropdown("city")}
        >
          <span className="text-sm text-gray-900">
            City
          </span>
          <span className="w-[25px] h-[25px] flex items-center justify-center rounded-full">
            <img
              src={openDropdown === "city" ? "/images/down-arrow.svg" : "/images/up-arrow.svg"}
              alt="arrow"
              style={{ width: "36px", height: "36px" }}
            />
          </span>
        </div>

        {openDropdown === "city" && cities.length > 0 && (
          <div className="mt-2 space-y-1">
            {cities.map(city => (
              <div key={city.id}>
                {checkboxOption(
                  city.name,
                  city.slug,
                  filters.city.includes(city.slug) ? city.slug : "",
                  v => {
                    const updated = filters.city.includes(v)
                      ? filters.city.filter(c => c !== v)
                      : [...filters.city, v];

                    setFilters({ ...filters, city: updated });
                  }
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border-b border-gray-200"></div>

      {/* Shift */}
      <div className="relative">
        <div
          className="w-full h-[56px] px-3 py-3 flex justify-between items-center cursor-pointer font-bold"
          onClick={() => toggleDropdown("shift")}
        >
          <span className="text-sm text-gray-900">
            Shift Time
          </span>
          <span className="w-[25px] h-[25px] flex items-center justify-center rounded-full">
            <img
              src={openDropdown === "shift" ? "/images/down-arrow.svg" : "/images/up-arrow.svg"}
              alt="arrow"
              style={{ width: "36px", height: "36px" }}
            />
          </span>
        </div>

        {openDropdown === "shift" && (
          <div className="mt-2 space-y-1">
            {shiftOptions.map(opt =>
              checkboxOption(
                opt.label,
                opt.value,
                filters.shift_timing,
                v => setFilters({ ...filters, shift_timing: v })
              )
            )}
          </div>
        )}
      </div>
      <div className="border-b border-gray-200"></div>

      {/* Price Range */}
      <div className="space-y-2">
        <div className="w-full h-[56px] px-3 py-3 font-bold flex justify-between items-center">
          <span className="text-sm text-gray-900">Price Range</span>
        </div>

        <DoubleRangeSlider
          min={filters.min_pay}
          max={filters.max_pay}
          onChange={(min, max) =>
            setFilters({ ...filters, min_pay: min, max_pay: max })
          }
        />
      </div>
      <div className="border-b border-gray-200"></div>

      {/* Job Type */}
      <div className="relative">
        <div
          className="w-full h-[48px] px-3 py-3 flex justify-between items-center cursor-pointer font-bold"
          onClick={() => toggleDropdown("job")}
        >
          <span className="text-sm text-gray-900">
            Job Type
          </span>
          <span className="w-[25px] h-[25px] flex items-center justify-center rounded-full">
            <img
              src={openDropdown === "job" ? "/images/down-arrow.svg" : "/images/up-arrow.svg"}
              alt="arrow"
              style={{ width: "36px", height: "36px" }}
            />
          </span>
        </div>

        {openDropdown === "job" && (
          <div className="mt-2 space-y-1">
            {jobTypeOptions.map(opt =>
              checkboxOption(
                opt.label,
                opt.value,
                filters.work_type.includes(opt.value) ? opt.value : "",
                v => {
                  const updated = filters.work_type.includes(v)
                    ? filters.work_type.filter(t => t !== v)
                    : [...filters.work_type, v];

                  setFilters({ ...filters, work_type: updated });
                }
              )
            )}
          </div>
        )}
      </div>
      <div className="border-b border-gray-200 mb-2"></div>

      <NewsletterCard />
    </aside>
  );
}
