"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Multiselect from "multiselect-react-dropdown";
import { IoClose } from "react-icons/io5";



/* ---------- TYPES ---------- */
type SubCategory = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  uuid: string;
  name: string;
};

type PreferenceForm = {
  experience_level: string;
  expected_earning: string;
  weekly_hours: string;
  reason: string;
  main_category_id: number | "";
  subcategory_ids: number[];
};

/* ---------- ENUMS ---------- */
const experienceOptions = [
  { id: "less_than_1_year", label: "Less Than 1 year of experience", img: "/images/1yer-ep.svg" },
  { id: "1_2_years", label: "1 – 2 years of experience", img: "/images/2yer-ep.svg" },
  { id: "3_5_years", label: "3 – 5 years of experience", img: "/images/5yer-ep.svg" },
  { id: "6_plus_years", label: "6+ years of experience", img: "/images/6yer-ep.svg" },
];

const earningOptions = [
  { id: "less_10000", label: "Less than ₹10,000", image: "/images/less-10k.svg" },
  { id: "10000_15000", label: "₹10,000 - ₹15,000", image: "/images/10-15k.svg" },
  { id: "15000_30000", label: "₹15,000 - ₹30,000", image: "/images/15-30k.svg" },
  { id: "more_30000", label: "More than ₹30,000", image: "/images/more-30k.svg" },
];

const weeklyHourOptions = [
  { id: "less_2_hours", label: "Less Than 2 hours / week", image: "/images/less-2-hours.svg" },
  { id: "2_4_hours", label: "2 – 4 hours / week", image: "/images/2-4-hours.svg" },
  { id: "4_8_hours", label: "4 – 8 hours / week", image: "/images/4-8-hours.svg" },
  { id: "more_8_hours", label: "More Than 8 hours / week", image: "/images/more-8-hours.svg" },
];

const reasonOptions = [
  { id: "extra_income", label: "Extra Income" },
  { id: "work_life_balance", label: "Work-Life Balance" },
  { id: "layoff_protection", label: "Layoff Protection" },
  { id: "remote_transition", label: "Remote Transition" },
  { id: "relocation", label: "Relocation" },
  { id: "skill_development", label: "Skill Development" },
];

export default function Preferences() {
  const [formData, setFormData] = useState<PreferenceForm>({
    experience_level: "",
    expected_earning: "",
    weekly_hours: "",
    reason: "",
    main_category_id: "",
    subcategory_ids: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<SubCategory[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  /* ---------- FETCH CATEGORIES ---------- */
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories", { credentials: "include" });
      const data = await res.json();
      if (data.status) setCategories(data.data);
    };

    fetchCategories();
  }, []);

  /* ---------- FETCH PREFERENCES ---------- */
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch("/api/worker/preferences", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.status && data.data?.preference) {
          const pref = data.data.preference;

          setFormData({
            experience_level: pref.experience_level || "",
            expected_earning: pref.expected_earning || "",
            weekly_hours: pref.weekly_hours || "",
            reason: pref.reason || "",
            main_category_id: pref.main_category?.id || "",
            subcategory_ids: pref.sub_categories?.map((s: SubCategory) => s.id) || [],
          });

          setSubCategories(pref.sub_categories || []);
          setSelectedSubCategories(pref.sub_categories || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "main_category_id" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);

    setFormData((prev) => ({
      ...prev,
      main_category_id: selectedId,
      subcategory_ids: [],
    }));

    setSelectedSubCategories([]);

    const selectedCategory = categories.find(
      (cat) => cat.id === selectedId
    );

    if (!selectedCategory) return;

    const res = await fetch(
      `/api/categories/${selectedCategory.uuid}/sub-categories`,
      { credentials: "include" }
    );

    const data = await res.json();

    if (data.status) {
      setSubCategories(data.data);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        experience_level: formData.experience_level,
        expected_earning: formData.expected_earning,
        weekly_hours: formData.weekly_hours,
        reason: formData.reason,
        main_category_id: formData.main_category_id,
        subcategory_ids: formData.subcategory_ids,
      };

      const res = await fetch("/api/worker/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status) {
        setMessage({ type: "success", text: "Preferences updated successfully" });
      } else {
        setMessage({ type: "error", text: "Preferences update failed" });
      }

      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading preferences...</p>;

  const selectWrapperClass = "relative w-full";
  const selectClass =
    "w-full h-[56px] rounded-[8px] border border-[#E7EDF1] px-4 pr-10 text-[14px] font-normal outline-none text-gray-400 focus:text-gray-900 appearance-none";
  const arrowClass =
    "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs";

  return (
    <div className="relative">
      {message && (
        <div
          className={`absolute top-0 right-0 z-20 flex items-center gap-2
          rounded-md px-3 py-2 shadow border text-sm
          ${message.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
              : "bg-red-50 border-red-300 text-red-700"}`}
        >
          <span>{message.type === "success" ? "✅" : "❌"}</span>
          <span>{message.text}</span>
        </div>
      )}

      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        My Preferences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* CATEGORY */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Category</label>
          <div className={selectWrapperClass}>
            <select
              name="main_category_id"
              value={formData.main_category_id}
              onChange={handleCategoryChange}
              className={`${selectClass} ${formData.main_category_id ? "text-[#30363F]" : ""}`}
            >
              <option value="" disabled hidden>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {capitalizeFirst(cat.name)}
                </option>
              ))}
            </select>
            <span className={arrowClass}>▼</span>
          </div>
        </div>

        {/* SUB CATEGORIES */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Sub Categories</label>
          <div className={selectWrapperClass}>
            <Multiselect
              options={subCategories}
              selectedValues={selectedSubCategories}
              displayValue="name"
              placeholder=""
              onSelect={(list) => {
                setSelectedSubCategories(list);
                setFormData((prev) => ({
                  ...prev,
                  subcategory_ids: list.map((i:SubCategory) => i.id),
                }));
              }}
              onRemove={(list) => {
                setSelectedSubCategories(list);
                setFormData((prev) => ({
                  ...prev,
                  subcategory_ids: list.map((i:SubCategory) => i.id),
                }));
              }}
              customCloseIcon={
                <IoClose size={16}color="red"/>
              }
              style={{
                multiselectContainer: { minHeight: "56px" },
                searchBox: {
                  border: "1px solid #E7EDF1",
                  borderRadius: "8px",
                  padding: "14px",
                  fontSize: "14px",
                  height: "56px"
                },
                chips: {
                  background: "#D1FAE5",
                  color: "#047857",
                  fontSize: "12px",
                  padding: "2px 6px",
                },
                option: { fontSize: "14px" },
              }}
            />
            <span className={arrowClass}>▼</span>
          </div>
        </div>


        {/* EXPERIENCE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Experience Level</label>
          <div className={selectWrapperClass}>
            <select
              name="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              className={`${selectClass} ${formData.experience_level ? "text-[#30363F]" : ""
                }`}
            >
              <option value="" disabled hidden>Select experience</option>
              {experienceOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className={arrowClass}>▼</span>
          </div>
        </div>

        {/* EARNING */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Expected Earning</label>
          <div className={selectWrapperClass}>
            <select
              name="expected_earning"
              value={formData.expected_earning}
              onChange={handleChange}
              className={`${selectClass} ${formData.expected_earning ? "text-[#30363F]" : ""
                }`}
            >
              <option value="" disabled hidden>Select earning</option>
              {earningOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className={arrowClass}>▼</span>
          </div>
        </div>


        {/* WEEKLY HOURS */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Weekly Hours</label>
          <div className={selectWrapperClass}>
            <select
              name="weekly_hours"
              value={formData.weekly_hours}
              onChange={handleChange}
              className={`${selectClass} ${formData.weekly_hours ? "text-[#30363F]" : ""
                }`}
            >
              <option value="" disabled hidden>
                Select hours
              </option>
              {weeklyHourOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className={arrowClass}>▼</span>
          </div>
        </div>


        {/* REASON */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Reason</label>
          <div className={selectWrapperClass}>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={`${selectClass} ${formData.reason ? "text-[#30363F]" : ""
                }`}
            >
              <option value="" disabled hidden>Select reason</option>
              {reasonOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className={arrowClass}>▼</span>
          </div>
        </div>


      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex justify-center items-center min-w-[150px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition"
        >
          {saving ? (
            <div className="h-5 w-5 rounded-full border border-white/30 border-t-white animate-spin" />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}