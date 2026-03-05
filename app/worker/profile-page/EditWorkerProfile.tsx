"use client";

import EditWorkerProfileSkeleton from "../../components/skeletons/EditWorkerProfileSkeleton";


type WorkType = {
  preference?: string;
  duration_type?: string;
};

type WorkerProfileForm = {
  name?: string;
  email?: string;
  mobile_number?: string;
  gender?: string;
  age?: number | string;
  profile_photo?: string;
  work?: WorkType;
};

type EditWorkerProfileProps = {
  formData: WorkerProfileForm | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleWorkChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleUpdate: () => void;
  EMERALD: string;
  photo: File | null;
  setPhoto: (file: File | null) => void;
  updateLoading: boolean;
  message: { type: "success" | "error"; text: string } | null;
};

export default function EditWorkerProfile({
  formData,
  handleChange,
  handleWorkChange,
  handleUpdate,
  EMERALD,
  photo,
  setPhoto,
  updateLoading,
  message,
}: EditWorkerProfileProps) {
  if (!formData) return null;

  const inputClass =
    "w-full h-[56px] rounded-[8px] border border-[#E7EDF1] px-4 py-[19px] text-[14px] font-normal outline-none placeholder:text-[#8FAFD6]";

  const selectWrapperClass = "relative w-full";

  const selectClass =
    "w-full h-[56px] rounded-[8px] border border-[#E7EDF1] px-4 pr-10 text-[14px] font-normal outline-none text-gray-800 focus:text-gray-800 focus:border-emerald-600 appearance-none";

  const arrowClass =
    "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs";

  return (
    <div className="relative">
      
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h2>

      {/* PHOTO */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative group">
          {photo || formData.profile_photo ? (
            <img
              src={
                photo
                  ? URL.createObjectURL(photo)
                  : formData.profile_photo || ""
              }
              className="w-20 h-20 rounded-full object-cover border"
              alt="Profile"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-semibold border"
              style={{ backgroundColor: EMERALD }}
            >
              {formData.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          {/* Hover Upload Overlay */}
          <label
            className="absolute inset-0 bg-black/40 text-white text-xs flex items-center justify-center 
               opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition"
          >
            Upload Photo
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // ✅ Type check
                if (!file.type.startsWith("image/")) {
                  alert("Only image files are allowed (JPG, PNG)");
                  e.target.value = "";
                  return;
                }

                // ✅ Size check (2MB)
                const maxSize = 2 * 1024 * 1024;
                if (file.size > maxSize) {
                  alert("Image size must be less than 2MB");
                  e.target.value = "";
                  return;
                }

                setPhoto(file);
              }}
              className="hidden"
            />

          </label>
        </div>


        <div className="text-sm text-gray-600">
          <p className="font-medium">Profile Photo</p>
          <p className="text-xs">JPG or PNG, up to 2MB</p>
        </div>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Name - Full width */}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={formData.name || ""}
            onChange={handleChange}
            className={inputClass}
            style={{ caretColor: EMERALD }}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            name="email"
            placeholder="Enter your email"
            value={formData.email || ""}
            onChange={handleChange}
            className={inputClass}
            style={{ caretColor: EMERALD }}
          />
        </div>

        {/* Mobile (Read Only) */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            name="mobile_number"
            placeholder="Mobile number"
            value={formData.mobile_number || ""}
            readOnly
            className="w-full h-[56px] rounded-[8px] border border-[#E7EDF1] px-4 py-[19px] text-[14px] font-normal outline-none bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Age</label>
          <input
            type="tel"
            name="age"
            placeholder="Enter age"
            value={formData.age || ""}
            onChange={(e) => {
              let value = e.target.value;
              value = value.replace(/\D/g, "");
              if (value.length > 2) return;

              handleChange({
                ...e,
                target: {
                  ...e.target,
                  name: "age",
                  value: value,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            className={inputClass}
            style={{ caretColor: EMERALD }}
          />
        </div>



        {/* Gender */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Gender</label>

          <div className={selectWrapperClass}>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className={`${selectClass} text-[#30363F]`}
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <span className={arrowClass}>▼</span>
          </div>
        </div>


        {/* Work Preference */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Work Preference</label>

          <div className={selectWrapperClass}>
            <select
              name="preference"
              value={formData.work?.preference || ""}
              onChange={handleWorkChange}
              className={`${selectClass} ${formData.work?.preference ? "text-[#30363F]" : "text-gray-800"
                }`}
            >
              <option value="" disabled hidden>
                Work From
              </option>
              <option value="wfh">Work From Home</option>
              <option value="wfo">Work From Office</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <span className={arrowClass}>▼</span>
          </div>
        </div>


        {/* Duration */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Work Duration</label>

          <div className={selectWrapperClass}>
            <select
              name="duration_type"
              value={formData.work?.duration_type || ""}
              onChange={handleWorkChange}
              className={`${selectClass} ${formData.work?.duration_type ? "text-[#30363F]" : "text-gray-400"
                }`}
            >
              <option value="" disabled hidden>
                Duration
              </option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <span className={arrowClass}>▼</span>
          </div>
        </div>

      </div>


      {/* SAVE BUTTON */}
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
