"use client";

import EditProfileForm from "../profile/components/EditProfileForm";
import CreateJobForm from "../jobs/create/page";
import PostedJobs from "../profile/components/PostedJobs";
import EditWorkerProfileSkeleton from "@/app/components/skeletons/EditWorkerProfileSkeleton";
import { useState, useEffect } from "react";

type MessageType = {
  type: "success" | "error";
  text: string;
} | null;

type RecruiterPanelPageProps = {
  activeTab: "profile" | "postjob" | "postedjobs" | "help";
  formData: any; // replace 'any' with your actual type for formData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
  EMERALD: string;
  message: MessageType;
  updateLoading: boolean;
};

export default function RecruiterPanelPage({
  activeTab,
  formData,
  handleChange,
  handleUpdate,
  EMERALD,
  message,
  updateLoading,
}: RecruiterPanelPageProps) {
  // Panel loading state for tab-switch skeleton
  const [panelLoading, setPanelLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "profile") {
      setPanelLoading(true);
      const timer = setTimeout(() => setPanelLoading(false), 200); // 200ms flash
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <>
      {activeTab === "profile" && (
        <>
          {panelLoading || !formData ? (
            <EditWorkerProfileSkeleton />
          ) : (
            <EditProfileForm
              formData={formData}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
              EMERALD={EMERALD}
              message={message}
              updateLoading={updateLoading}
            />
          )}
        </>
      )}

      {activeTab === "postjob" && <CreateJobForm />}

      {activeTab === "postedjobs" && <PostedJobs />}

      {activeTab === "help" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Help Centre</h2>
          <p className="text-gray-600">Support content will be here.</p>
        </div>
      )}
    </>
  );
}
