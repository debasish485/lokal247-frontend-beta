"use client";

import { useState } from "react";
import StepExperience from "./steps/StepExperience";
import StepWelcome from "./steps/StepWelcome";
import StepPhoneOtp from "./steps/StepPhoneOtp";
import StepEarning from "./steps/StepEarning";
import StepPersonalityIntro from "./steps/StepPersonalityIntro";
import StepReason from "./steps/StepReason";
import StepAvailability from "./steps/StepAvailability";
import StepConsulting from "./steps/StepConsulting";
import StepExpertise from "./steps/StepExpertise";
import StepAcknowledgement from "./steps/StepAcknowledgement";
import SignupSuccess from "./SignupSuccess";

export default function WorkerRegisterPage() {
  const TOTAL_STEPS = 10; // OTP step added
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const [workerData, setWorkerData] = useState<any>({
    experience: "", // backend expects string values like "1_2_years"
    earning: "",
    availability: "",
    reason: "",

    expertise: { id: 0, uuid: "" },
    subExpertise: {},

    name: "",
    email: "",
    password: "",
    mobile_number: "",
    gender: "",
    age: "",
    firebase_token: ""
  });

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(prev => prev + 1);
    else setShowSuccess(true);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  if (showSuccess) return <SignupSuccess />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <div className="w-full max-w-3xl px-6">

        {/* Step bar */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <span
                key={index}
                className={`h-1 w-10 rounded ${step > index ? "bg-emerald-700" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>

        {/* Step Components */}
        {step === 1 && (
          <StepExperience
            selectedValue={workerData.experience}
            onSelect={(id) => setWorkerData(prev => ({ ...prev, experience: id }))}
            onNext={handleNext}
          />
        )}

        {step === 2 && (
          <StepWelcome
            experience={workerData.experience}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 3 && (
          <StepPhoneOtp
            workerData={workerData}
            setWorkerData={setWorkerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 4 && (
          <StepEarning
            selectedValue={workerData.earning}
            setWorkerData={setWorkerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 5 && (
          <StepPersonalityIntro
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 6 && (
          <StepReason
            selectedValue={workerData.reason}
            setWorkerData={setWorkerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 7 && (
          <StepAvailability
            selectedValue={workerData.availability}
            setWorkerData={setWorkerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 8 && (
          <StepConsulting
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 9 && (
          <StepExpertise
            selectedExpertise={workerData.expertise}
            setWorkerData={setWorkerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 10 && (
          <StepAcknowledgement
            workerInfo={workerData}
            onNext={handleNext}
            onBack={handleBack}
            onFinalSubmit={async () => {
              try {
                const cleanPhone = workerData.mobile_number.replace(/\D/g, "");

                const payload = {
                  name: workerData.name,
                  email: workerData.email,
                  password: workerData.password,
                  password_confirmation: workerData.password,
                  mobile_number: cleanPhone.startsWith("91")
                    ? cleanPhone
                    : "91" + cleanPhone,
                  gender: workerData.gender,
                  age: Number(workerData.age),
                  experience_level: workerData.experience,
                  expected_earning: workerData.earning,
                  weekly_hours: workerData.availability,
                  reason: workerData.reason,
                  main_category_id: workerData.expertise.id,
                  subcategory_ids: Object.values(workerData.subExpertise).flat().map(Number),
                  firebase_token: workerData.firebase_token,
                };
                console.log("FINAL PAYLOAD 👉", payload);
                console.log("MOBILE NUMBER 👉", payload.mobile_number);
                const res = await fetch("/api/worker/register", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });

                const data = await res.json();
                if (!res.ok || !data.status) throw new Error(data.message || "Registration failed");

                document.cookie = `worker_token=${data.data.token}; path=/;`;
                setShowSuccess(true);
              } catch (err: any) {
                alert(err.message || "Registration failed");
              }
            }}
          />
        )}

      </div>
    </div>
  );
}
