"use client";

import Image from "next/image";
import StepLayout from "./StepLayout";

type Props = {
  selectedValue: string | null;
  setWorkerData: (updater: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepEarning({
  selectedValue,
  setWorkerData,
  onNext,
  onBack,
}: Props) {
  const options = [
    { id: "less_10000", label: "Less than ₹10,000", image: "/images/less-10k.svg" },
    { id: "10000_15000", label: "₹10,000 - ₹15,000", image: "/images/10-15k.svg" },
    { id: "15000_30000", label: "₹15,000 - ₹30,000", image: "/images/15-30k.svg" },
    { id: "more_30000", label: "More than ₹30,000", image: "/images/more-30k.svg" },
  ];

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
          What monthly earnings do you expect to achieve from side projects?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() =>
                setWorkerData((prev: any) => ({ ...prev, earning: opt.id }))
              }
              className={`cursor-pointer border rounded-xl p-4 text-center transition
                ${
                  selectedValue === opt.id
                    ? "border-emerald-700 bg-emerald-50"
                    : "border-gray-200 hover:border-emerald-400"
                }`}
            >
              <Image
                src={opt.image}
                alt={opt.label}
                width={64}
                height={64}
                className="mx-auto mb-3"
              />
              <p className="text-sm font-medium text-[#1B2021]">{opt.label}</p>
            </button>
          ))}
        </div>
      </div>
    </StepLayout>
  );
}