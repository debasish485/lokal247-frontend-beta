"use client";

import Image from "next/image";
import StepLayout from "./StepLayout";

interface StepPersonalityIntroProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepPersonalityIntro({
  onNext,
  onBack,
}: StepPersonalityIntroProps) {
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
            onClick={onNext}
            className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
              bg-[#0B8260] hover:bg-[#0a6f51] text-white 
              px-4 py-2 shadow-sm transition 
              no-underline outline-none focus:outline-none"
          >
            Next Step
          </button>
        </div>
      }
    >
      <div className="text-center w-full px-6">
        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/Mask group.svg"
            alt="Personality intro"
            width={220}
            height={220}
            priority
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#1B2021] mb-4">
          Thanks for being honest!
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-10">
          Now, let’s dive into your personality and expertise to find the perfect
          part-time opportunities for you.
        </p>
      </div>
    </StepLayout>
  );
}