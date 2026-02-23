"use client";

import EditWorkerProfile from "./EditWorkerProfile";
import WorkerJobHistory from "../applied-jobs/page";
import MyPreferences from "./MyPreferences";
import EditWorkerProfileSkeleton from "../../components/skeletons/EditWorkerProfileSkeleton";
import { useState, useEffect } from "react";

type WorkerPanelPageProps = {
  activeTab: string;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleWorkChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleUpdate: () => void;
  handlePreferencesUpdate: () => void;
  savingPreferences: boolean;
  EMERALD: string;
  photo: File | null;
  setPhoto: (file: File | null) => void;
  updateLoading: boolean;
  message: { type: "success" | "error"; text: string } | null;
};

export default function WorkerPanelPage({
  activeTab,
  formData,
  handleChange,
  handleWorkChange,
  handleUpdate,
  handlePreferencesUpdate,
  savingPreferences,
  EMERALD,
  photo,
  setPhoto,
  updateLoading,
  message
}: WorkerPanelPageProps) {
  // Panel loading state for tab-switch skeleton
  const [panelLoading, setPanelLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "profile") {
      setPanelLoading(true);
      const timer = setTimeout(() => setPanelLoading(false), 200); // 200ms flash
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  if (activeTab === "profile") {
    return (
      <>
        {panelLoading || !formData ? (
          <EditWorkerProfileSkeleton />
        ) : (
          <EditWorkerProfile
            formData={formData}
            handleChange={handleChange}
            handleWorkChange={handleWorkChange}
            handleUpdate={handleUpdate}
            EMERALD={EMERALD}
            photo={photo}
            setPhoto={setPhoto}
            updateLoading={updateLoading}
            message={message}
          />
        )}
      </>
    );
  }

  if (activeTab === "preferences") {
    return (
      <MyPreferences
        formData={formData}
        handleChange={handleChange}
        handleSave={handlePreferencesUpdate}
        saving={savingPreferences}
      />
    );
  }

  if (activeTab === "jobs") return <WorkerJobHistory />;

  if (activeTab === "help") return <p className="text-gray-500">Help Centre coming soon…</p>;

  return null;
}
