"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RecruiterPanelPage from "../panel/page";
import Sidebar from "./components/Sidebar";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function RecruiterProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [jobCount, setJobCount] = useState(0);
  const searchParams = useSearchParams();




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
        const res = await fetch("/api/recruiter/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          router.replace("/recruiter/auth/signin");
          return;
        }

        const data = await res.json();
        setProfile(data.data);
        setFormData(data.data);
      } catch (error) {
        console.error("Profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  useEffect(() => {
  const fetchJobCount = async () => {
    try {
      const res = await fetch("/api/recruiter/jobs", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();
      setJobCount(data.data?.length || 0);
    } catch (err) {
      console.error("Job count error:", err);
    }
  };

  fetchJobCount();
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const res = await fetch("/api/recruiter/profile", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setProfile(data.data);
      setFormData(data.data);
      toast.success("Your profile has been updated successfully");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Unable to update your profile. Please try again");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    } finally {
      router.replace("/recruiter/auth/signin");
      router.refresh();
    }
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`, { shallow: true }); // update URL without reload
  };

  if (loading) return <p className="p-6">Loading Profile...</p>;
  if (!profile) return <p className="p-6 text-red-600">Profile not found.</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex gap-6">
        <Sidebar
          profile={profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
          EMERALD={EMERALD}
          handleTabChange={handleTabChange}
          jobCount={jobCount}
        />

        {/* RIGHT COLUMN */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col gap-6 min-w-0 relative">

          <RecruiterPanelPage
            activeTab={activeTab}
            formData={formData}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            EMERALD={EMERALD}
            updateLoading={updateLoading}
            setJobCount={setJobCount}
          />
        </div>
      </div>
    </div>
  );
}
