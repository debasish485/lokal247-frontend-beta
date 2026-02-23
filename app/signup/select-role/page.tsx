"use client"

import { useRouter } from "next/navigation";

export default function SelectRolePage() {
    const router=useRouter();
  return (
    <div className="w-[1206px] h-[700px] mx-auto flex items-center justify-center gap-[50px]">

      {/* Worker Card */}
      <div className="w-[534px] h-[313px] p-[20px] flex flex-col items-center justify-between gap-4">
        <img src="/images/worker.svg" alt="worker" className="w-24 h-24" />

        <h1 className="text-xl font-bold">I'm a Worker</h1>

        <p className="text-center text-gray-600">
          Find verified jobs that match your skills and location. Apply in one
          click, track applications, and get hired faster.
        </p>

        <button onClick={()=>router.push("/auth/register")}
            className=" flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none">
          Continue
        </button>
      </div>
      
      <div className="w-0 h-[600px] border border-[#DEE2E6]"></div>

      {/* Recruiter Card */}
      <div className="w-[534px] h-[313px] p-[20px] flex flex-col items-center justify-between gap-4">
        <img src="/images/recruiter.svg" alt="recruiter" className="w-24 h-24" />

        <h1 className="text-xl font-bold">I'm a Recruiter</h1>

        <p className="text-center text-gray-600">
          Post job openings, review applications, and connect with skilled
          workers. Manage hiring easily from one dashboard.
        </p>

        <button onClick={()=>router.push("/recruiter/auth/register")} 
            className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none">
          Continue
        </button>
      </div>
    </div>
  );
}
