"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WorkerPanelPage from "./WorkerPanelPage";
import { useSearchParams } from "next/navigation";
import FallbackImage from "../../components/FallbackImage";
import EditWorkerProfile from "./EditWorkerProfile";
import EditWorkerProfileSkeleton from "../../components/skeletons/EditWorkerProfileSkeleton";
import toast from "react-hot-toast";


export default function WorkerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  



  const router = useRouter();
  const EMERALD = "oklch(50.8% 0.118 165.612)";

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/worker/profile", {
          credentials: "include",
        });

        if (res.status === 401) {
          router.replace("/worker/auth/signin");
          return;
        }

        const data = await res.json();
        console.log("FULL API DATA:", data);
        console.log("WORK FROM API:", data.data?.work);
        setProfile(data.data);
        setFormData(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWorkChange = (e) => {
    const { name, value } = e.target;

    console.log("WORK CHANGE:", name, value);
    console.log("BEFORE WORK:", formData.work);

    setFormData((prev) => ({
      ...prev,
      work: {
        ...(prev.work || {}),
        [name]: value,
      },
    }));
  };
  const handleUpdate = async () => {

    try {
      setUpdateLoading(true);
      console.log("FINAL FORM DATA OBJECT:", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile_number,
        gender: formData.gender,
        age: formData.age,
        work_preference: formData.work?.preference,
        work_duration_type: formData.work?.duration_type,
      });

      const fd = new FormData();
      fd.append("name", formData.name || "");
      if (formData.email) {
        fd.append("email", formData.email);
      }
      fd.append("mobile_number", formData.mobile_number || "");
      fd.append("gender", formData.gender || "");
      fd.append("age", formData.age || "");
      if (formData.work?.preference) {
        fd.append("work_preference", formData.work.preference);
      }
      if (formData.work?.duration_type) {
        fd.append("work_duration_type", formData.work.duration_type);
      }
      if (photo) {
        fd.append("profile_photo", photo);
      }

      const res = await fetch("/api/worker/profile", {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      console.log("STATUS:", res.status);
      console.log("RAW RESPONSE:", res);


      const data = await res.json();
      console.log("UPDATE RESPONSE JSON:", data);
      console.log("WORK FROM RESPONSE:", data?.data?.work);
      setProfile(data.data);
      setFormData(data.data);
      if (!res.ok) {
        throw new Error("Update failed");
      }

      setProfile(data.data);
      setFormData(data.data);
      toast.success("Your profile has been updated successfully");
    }
    catch (err) {
      console.log(err);
      toast.error("Unable to update your profile. Please try again");
    }
    finally {
      setUpdateLoading(false);
    }
  };


  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      toast.success("Logged out successfully");
      router.replace("/auth/phone-login");
      router.refresh();
    } catch (err) {
      toast.error("Logout failed");
    } 
  };

  function Stars({ rating }) {
    const stars = [];
    const r = rating != null ? rating : 4;
    for (let i = 1; i <= 5; i++) {
      if (i <= r) {
        stars.push(<span key={i} className="text-amber-400">★</span>); // filled star
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>); // empty star
      }
    }

    return <div className="flex gap-1">{stars}</div>;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`, { shallow: true }); // update URL without reload
  };


  if (loading) return <EditWorkerProfileSkeleton />
  if (!profile) return <p className="p-6 text-red-600">Profile not found</p>;

  return (

    <div className="p-4  mx-auto py-20 w-full">

      <div className="flex gap-4">


        {/* LEFT SIDEBAR */}
        <div className="flex flex-col gap-10 shrink-0">

          {/* PROFILE CARD */}
          <div className="flex flex-col bg-white w-[350px] rounded-[10px] border border-[#DEE2E6] p-[25px] gap-[10px]">

            <div className="flex items-center gap-4">
              {/* IMAGE */}
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden border flex items-center justify-center">
                {profile.profile_photo ? (
                  <img
                    src={profile.profile_photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-3xl font-bold"
                    style={{ backgroundColor: EMERALD }}
                  >
                    {profile.name?.charAt(0) || "W"}
                  </div>
                )}
              </div>

              {/* NAME + ADDRESS */}
              <div className="flex flex-col justify-center flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {profile.address || "Kolkata, West Bengal"}
                </p>
                {/* STARS RATING */}
                <div className="mt-1">
                  <Stars />
                </div>
              </div>
            </div>

            {/* EMAIL + VERIFY STRIP */}
            <div className="flex items-center justify-between w-full h-[25px] gap-2">
              <div className="flex items-center gap-2">
                <img src="/images/email.svg" alt="email" className="w-4 h-4" />
                <span className="text-sm text-gray-700">{profile.email}</span>
              </div>
              <button
                onClick={() => alert("Verification link sent!")}
                className="flex items-center justify-center
        rounded-[13.2px] bg-[#E3F4EF] px-2 py-1 text-xs font-medium text-emerald-600
        hover:bg-[#d6f0e4] transition"
              >
                Verify Email
              </button>
            </div>


            {/* PHONE + VERIFY NOW */}
            <div className="flex items-center justify-between w-full h-[25px] gap-2">
              <div className="flex items-center gap-2">
                <img src="/images/mobile.svg" alt="mobile" className="w-4 h-4" />
                <span className="text-sm text-gray-700">+{profile.mobile_number}</span>
              </div>
              <span
                className="flex items-center justify-center
      rounded-[13.2px] bg-[#E3F4EF] px-2 py-1
      text-xs font-medium text-emerald-600"
              >
                Verified
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-[#30363F] text-sm leading-6 w-full">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            {/* UPLOAD RESUME BUTTON */}
            <button
              className="flex justify-center items-center gap-2 min-w-[150px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
            >
              <img src="/images/arrow-up.svg" alt="upload" className="w-2 h-3" />
              <span className="font-medium text-sm">Upload your resume</span>
            </button>
          </div>


          {/* MENU */}
          <div className="flex flex-col gap-[10px] w-[350px]">
            <MenuItem label="My Profile" tab="profile" icon="/images/my-profile.svg" activeTab={activeTab} setActiveTab={setActiveTab} handleTabChange={handleTabChange} />
            <MenuItem label="My Preferences" tab="preferences" icon="/images/preferences.svg" activeTab={activeTab} setActiveTab={setActiveTab} handleTabChange={handleTabChange} />
            <MenuItem label="My Job History" tab="jobs" icon="/images/my-job-history.svg" activeTab={activeTab} setActiveTab={setActiveTab} handleTabChange={handleTabChange} />
            <MenuItem label="Help Centre" tab="help" icon="/images/help-center.svg" activeTab={activeTab} setActiveTab={setActiveTab} handleTabChange={handleTabChange} />
            <MenuItem label="Logout" tab="logout" activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} handleTabChange={handleTabChange} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">


          <WorkerPanelPage
            activeTab={activeTab}
            formData={formData}
            handleChange={handleChange}
            handleWorkChange={handleWorkChange}
            handleUpdate={handleUpdate}
            EMERALD={EMERALD}
            photo={photo}
            setPhoto={setPhoto}
            updateLoading={updateLoading}
          />
        </div>
      </div>
    </div>

  );
}

/* MENU ITEM */
function MenuItem({ label, tab, icon, activeTab, setActiveTab, handleTabChange, handleLogout }) {
  const isActive = activeTab === tab;
  const isLogout = tab === "logout";

  return (
    <div
      onClick={() => {
        if (isLogout) {
          handleLogout();
        } else {
          handleTabChange(tab);
        }
      }}
      className={`w-full h-[75px] rounded-[10px] cursor-pointer
        ${isLogout ? "flex items-center justify-center" : "flex items-center gap-[10px] px-[25px]"}
        ${isLogout ? "bg-[#FFD8D7] border border-[#FF7974]" : "bg-white border border-[#DEE2E6]"}
      `}
    >
      {!isLogout && (
        <FallbackImage
          src={icon}
          alt={label}
          className="w-[25px] h-[25px]"
        />
      )}

      <span
        className="text-[14px] font-medium"
        style={{
          color: isLogout ? "#FF3831" : isActive ? "#0B8260" : "#30363F",
        }}
      >
        {label}
      </span>
    </div>
  );
}


