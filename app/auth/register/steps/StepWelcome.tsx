"use client";

import StepLayout from "./StepLayout";

type Props = {
  experience: string | null;
  onNext: () => void;
  onBack: () => void;
};

export default function StepWelcome({ experience, onNext, onBack }: Props) {
  console.log("EXPERIENCE PROP:", experience, typeof experience);
  const experienceMap: Record<string, string> = {
    less_than_1_year: "Less than 1 year",
    one_to_two_years: "1–2 years",
    three_to_five_years: "3–5 years",
    six_plus_years: "6+ years",
  };

  const experienceLabel = experience !== null ? experienceMap[experience] : "your";

  return (
    <StepLayout
      footer={
        // Only the main "Continue" button in the footer
        <button
          onClick={onNext}
          className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
            bg-[#0B8260] hover:bg-[#0a6f51] text-white 
            px-4 py-2 shadow-sm transition"
        >
          Continue
        </button>
      }
    >
      <div className="text-center relative">
        {/* Back button in top-left */}
        <button
          onClick={onBack}
          className="fixed top-4 left-4 z-50 text-black font-medium px-4 py-2 rounded-[4px] 
    shadow-sm hover:bg-gray-100 transition outline-none focus:outline-none"
        >
          Back
        </button>

        <h2 className="text-2xl font-semibold text-[#1B2021] mb-4">
          Yay, glad you’re here!
        </h2>

        <p className="text-gray-600 text-base leading-relaxed mb-10">
          Your{" "}
          <span className="font-medium text-[#1B2021]">
            {experienceLabel} of experience
          </span>{" "}
          is in the sweet spot. Our data shows strong demand from companies
          looking for part-timers for side projects.
          <br />
          <br />
          We’re delighted to have you on board — answer a few more questions
          and we’ll connect you with these eager businesses.
        </p>
      </div>
    </StepLayout>
  );
}