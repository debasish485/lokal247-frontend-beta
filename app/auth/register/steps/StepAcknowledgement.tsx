"use client";

import React from "react";
import StepLayout from "./StepLayout";

interface StepAcknowledgementProps {
  workerInfo: any;
  onNext: () => void;
  onBack: () => void;
  onFinalSubmit: () => void;
}

export default function StepAcknowledgement({
  workerInfo,
  onNext,
  onBack,
  onFinalSubmit,
}: StepAcknowledgementProps) {
  return (
    <StepLayout
      footer={
        <div className="flex justify-between gap-4 w-full">
          {/* Back */}
          <button
            onClick={onBack}
            className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
              text-black 
              px-4 py-2 shadow-sm transition 
              no-underline outline-none focus:outline-none"
          >
            Back
          </button>

          {/* Submit */}
          <button
            onClick={onFinalSubmit}
            className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
              bg-[#0B8260] hover:bg-[#0a6f51] text-white 
              px-4 py-2 shadow-sm transition 
              no-underline outline-none focus:outline-none"
          >
            Submit Registration
          </button>
        </div>
      }
    >
      <div className="max-w-md mx-auto flex flex-col gap-4 text-center">
        <h2 className="text-xl font-semibold">
          Step: Review & Submit
        </h2>

        <div className="flex flex-col gap-2 text-left">
          <p><strong>Name:</strong> {workerInfo.name}</p>
          <p><strong>Phone:</strong> {workerInfo.mobile_number}</p>
          <p><strong>Experience:</strong> {workerInfo.experience}</p>
          <p><strong>Earning:</strong> {workerInfo.earning}</p>
          <p><strong>Availability:</strong> {workerInfo.availability}</p>
        </div>
      </div>
    </StepLayout>
  );
}