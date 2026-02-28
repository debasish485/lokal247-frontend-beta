"use client";

import StepLayout from "./StepLayout";

type Props = {
  selectedValue: string | null;
  setWorkerData: (updater: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepReason({
  selectedValue,
  setWorkerData,
  onNext,
  onBack,
}: Props) {
  const options = [
    { id: "extra_income", label: "Extra Income" },
    { id: "work_life_balance", label: "Work-Life Balance" },
    { id: "layoff_protection", label: "Layoff Protection" },
    { id: "remote_transition", label: "Remote Transition" },
    { id: "relocation", label: "Relocation" },
    { id: "skill_development", label: "Skill Development" },
  ];

  return (
    <StepLayout
      footer={
        <div className="flex justify-between gap-4 w-full">
          {/* Back */}
          <button
            onClick={onBack}
            className="fixed top-4 left-4 z-50 text-black font-medium px-4 py-2 rounded-[4px] 
    shadow-sm hover:bg-gray-100 transition 
    outline-none focus:outline-none"
          >
            Back
          </button>

          {/* Next */}
          <button
            disabled={!selectedValue}
            onClick={onNext}
            className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
              bg-[#0B8260] hover:bg-[#0a6f51] text-white 
              px-4 py-2 shadow-sm transition 
              no-underline outline-none focus:outline-none"
          >
            Next
          </button>
        </div>
      }
    >
      <div className="text-center max-w-3xl mx-auto p-6">
        <h2 className="text-xl font-bold text-[#1B2021] mb-10">
          What is your main reason for exploring side projects?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() =>
                setWorkerData((prev: any) => ({ ...prev, reason: opt.id }))
              }
              className={`cursor-pointer border rounded-xl p-4 text-center transition
                ${
                  selectedValue === opt.id
                    ? "border-emerald-700 bg-emerald-50"
                    : "border-gray-200 hover:border-emerald-400"
                }`}
            >
              <p className="text-sm font-medium text-[#1B2021]">{opt.label}</p>
            </button>
          ))}
        </div>
      </div>
    </StepLayout>
  );
}