"use client";

import Image from "next/image";
import StepLayout from "./StepLayout";

interface StepConsultingProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepConsulting({
  onNext,
  onBack,
}: StepConsultingProps) {
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
      <div className="text-center max-w-xl mx-auto">
        <div className="w-full px-6 text-center">
          {/* Top Image */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/consulting-image.svg"
              alt="Consulting Projects"
              width={170}
              height={170}
              priority
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-[#1B2021] mb-4">
            Consulting Projects
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-10">
            Devoting 8 hours weekly unlocks consulting projects for you, entailing
            1–2 calls to mentor businesses in need of your domain expertise, yet
            equipped to take action. You’ll assess their past progress and help
            strategize for the future.
          </p>
        </div>
      </div>
    </StepLayout>
  );
}