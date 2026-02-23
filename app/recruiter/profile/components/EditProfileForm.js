"use client";

export default function EditProfileForm({ formData, handleChange, handleUpdate, EMERALD, updateLoading, message }) {
  if (!formData) return null;

  const inputClass =
    "w-full h-[56px] rounded-[8px] border border-[#E7EDF1] px-4 py-[19px] text-[14px] font-normal outline-none placeholder:text-[#8FAFD6]";

  const textareaClass =
    "w-full rounded-[8px] border border-[#E7EDF1] px-4 py-3 text-[14px] font-normal outline-none placeholder:text-[#8FAFD6] resize-none";

  return (
    <div className="relative">
      {message && (
        <div
          className={`absolute top-0 right-0 z-20 flex items-center gap-2
      rounded-md px-3 py-2 shadow border text-sm
      ${message.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
              : "bg-red-50 border-red-300 text-red-700"
            }
    `}
        >
          {message.type === "success" ? "✅" : "❌"}
          <span>{message.text}</span>
        </div>
      )}

      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h2>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name || ""}
          onChange={handleChange}
          className={inputClass}
          style={{ caretColor: EMERALD }}
        />

        {/* Designation */}
        <input
          name="designation"
          placeholder="Designation"
          value={formData.designation || ""}
          onChange={handleChange}
          className={inputClass}
          style={{ caretColor: EMERALD }}
        />

        {/* Company Name */}
        <input
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name || ""}
          onChange={handleChange}
          className={inputClass}
          style={{ caretColor: EMERALD }}
        />

        {/* Industry */}
        <input
          name="industry"
          placeholder="Industry"
          value={formData.industry || ""}
          onChange={handleChange}
          className={inputClass}
          style={{ caretColor: EMERALD }}
        />

        {/* Phone */}
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone || ""}
          onChange={handleChange}
          className={inputClass}
          style={{ caretColor: EMERALD }}
        />

        {/* Alternate Phone */}
        <input
          name="alternate_phone"
          placeholder="Alternate Phone"
          value={formData.alternate_phone || ""}
          onChange={handleChange}
          className={inputClass}
          style={{ caretColor: EMERALD }}
        />

        {/* City */}
        <input
          name="city"
          placeholder="City"
          value={formData.city || ""}
          onChange={handleChange}
          className={inputClass}
          style={{ caretColor: EMERALD }}
        />
      </div>

      {/* Company Address */}
      <div className="mt-4">
        <textarea
          name="company_address"
          placeholder="Company Address"
          value={formData.company_address || ""}
          onChange={handleChange}
          rows={3}
          className={textareaClass}
          style={{ caretColor: EMERALD }}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-start mt-6">
        <button
          onClick={handleUpdate}
          disabled={updateLoading}
          className="flex justify-center items-center min-w-[150px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
        >
          {updateLoading ? (
            <div className="h-5 w-5 rounded-full border border-white/30 border-t-white animate-spin" />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}
