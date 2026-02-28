"use client";

import Image from "next/image";
import StepLayout from "./StepLayout";

type Props = {
  selectedValue: string | null; // backend expects strings like "4_8_hours"
  setWorkerData: (updater: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepAvailability({
  selectedValue,
  setWorkerData,
  onNext,
  onBack,
}: Props) {
  // ✅ backend string values + images
  const options = [
    { id: "less_2_hours", label: "< 2 hours / week", image: "/images/less-2-hours.svg" },
    { id: "2_4_hours", label: "2 – 4 hours / week", image: "/images/2-4-hours.svg" },
    { id: "4_8_hours", label: "4 – 8 hours / week", image: "/images/4-8-hours.svg" },
    { id: "more_8_hours", label: "> 8 hours / week", image: "/images/more-8-hours.svg" },
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
          How many hours can you dedicate to a side project each week?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() =>
                setWorkerData((prev: any) => ({ ...prev, availability: opt.id }))
              }
              className={`cursor-pointer border rounded-xl p-4 text-center transition
                ${selectedValue === opt.id
                  ? "border-emerald-700 bg-emerald-50"
                  : "border-gray-200 hover:border-emerald-400"
                }`}
            >
              <Image
                src={opt.image}
                alt={opt.label}
                width={80}
                height={80}
                className="mx-auto mb-3"
              />
              <p className="text-sm font-medium text-[#1B2021]">
                {opt.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </StepLayout>
  );
}