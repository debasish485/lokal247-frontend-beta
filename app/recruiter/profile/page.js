"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RecruiterPanelPage from "../panel/page";
import Sidebar from "./components/Sidebar";

export default function RecruiterProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState (null);
  const [updateLoading, setUpdateLoading] = useState(false);


  const router = useRouter();
  const EMERALD = "oklch(50.8% 0.118 165.612)";

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
      setMessage({ type: "success", text: "Profile updated successfully" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Update error:", err);
      setMessage({ type: "error", text: "Failed to update profile" });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } finally {
      router.replace("/recruiter/auth/signin");
      router.refresh();
    }
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
        />

        {/* RIGHT COLUMN */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col gap-6 min-w-0 relative">
          
          <RecruiterPanelPage
            activeTab={activeTab}
            formData={formData}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            EMERALD={EMERALD}
            message={message}
            updateLoading={updateLoading}
          />
        </div>
      </div>
    </div>
  );
}
