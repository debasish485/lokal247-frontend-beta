"use client";

import Image from "next/image";
import StepLayout from "./StepLayout";

type Props = {
  selectedValue: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
};

export default function StepExperience({ selectedValue, onSelect, onNext }: Props) {
  const options = [
    { id: "less_than_1_year", label: "< 1 year of experience", img: "/images/1yer-ep.svg" },
    { id: "1_2_years", label: "1 – 2 years of experience", img: "/images/2yer-ep.svg" },
    { id: "3_5_years", label: "3 – 5 years of experience", img: "/images/5yer-ep.svg" },
    { id: "6_plus_years", label: "6+ years of experience", img: "/images/6yer-ep.svg" },
  ];

  return (
    <StepLayout
      footer={
        <button
          disabled={!selectedValue}
          onClick={onNext}
          className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
            bg-[#0B8260] hover:bg-[#0a6f51] text-white 
            px-4 py-2 shadow-sm transition"
        >
          Next
        </button>
      }
    >
      <div className="text-center">
        <h2 className="text-xl font-black text-[#1B2021] mb-10">
          Due to the economic crisis, companies are switching to part-time roles to reduce expenses.
          Let’s connect you to these opportunities.
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`cursor-pointer border rounded-xl p-4 text-center transition
                ${
                  selectedValue === opt.id
                    ? "border-emerald-700 bg-emerald-50"
                    : "border-gray-200 hover:border-emerald-400"
                }`}
            >
              <Image
                src={opt.img}
                alt={opt.label}
                width={120}
                height={170}
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