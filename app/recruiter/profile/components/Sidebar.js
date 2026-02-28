"use client";

export default function Sidebar({ profile, activeTab, setActiveTab, handleLogout,handleTabChange, EMERALD }) {


  function Stars({ rating }) {
    const stars = [];
    const r = rating != null ? rating : 4; 

    for (let i = 1; i <= 5; i++) {
      if (i <= r) {
        stars.push(<span key={i} className="text-amber-400">★</span>); // filled star
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>); // empty star
      }
    }

    return <div className="flex gap-1">{stars}</div>;
  }

  return (
    <div className="flex flex-col gap-10 shrink-0 w-[320px]">
      {/* PROFILE CARD */}
      <div className="flex flex-col bg-white rounded-[10px] border border-[#DEE2E6] p-[25px] gap-[10px]">
        {/* AVATAR + COMPANY NAME */}
        <div className="flex items-center gap-4">
          <div
            className="w-[100px] h-[100px] rounded-full flex items-center justify-center text-white text-3xl font-bold"
            style={{ backgroundColor: EMERALD }}
          >
            {profile.company_name?.charAt(0) || "B"}
          </div>
          <div className="flex flex-col justify-center flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{profile.company_name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {profile.company_address || "City, State"}
            </p>
            <div className="mt-1">
              <Stars /> 
            </div>
          </div>
        </div>

        {/* EMAIL + VERIFY BUTTON */}
        <div className="flex items-center justify-between w-full h-[25px] gap-2 mt-2">
          <div className="flex items-center gap-2">
            <img src="/images/email.svg" alt="email" className="w-3 h-3" />
            <span className="text-sm text-gray-700">{profile.email}</span>
          </div>
          <button
            onClick={() => alert("Verification link sent!")}
            className="flex items-center justify-center rounded-[13.2px] bg-[#E3F4EF] px-2 py-1 text-xs font-medium text-emerald-600 hover:bg-[#d6f0e4] transition truncate"
          >
            Verify Email
          </button>
        </div>

        {/* PHONE + VERIFY BUTTON */}
        <div className="flex items-center justify-between w-full h-[25px] gap-2 mt-2">
          <div className="flex items-center gap-2">
            <img src="/images/mobile.svg" alt="phone" className="w-3 h-3" />
            <span className="text-sm text-gray-700">{profile.phone}</span>
          </div>
          <button
            onClick={() => alert("Phone verification link sent!")}
            className="flex items-center gap-1 text-[#0B8260] font-semibold text-sm"
          >
            <span>Verify Now</span>
            <img src="/images/greater-than-sign.svg" alt=">" className="w-3 h-3" />
          </button>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[#30363F] text-sm leading-6 w-full mt-2">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>

        {/* UPLOAD RESUME / DOCUMENT BUTTON */}
        <button
          className="flex justify-center items-center gap-2 min-w-[150px] rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
        >
          <img src="/images/arrow-up.svg" alt="upload" className="w-2 h-3" />
          <span className="font-medium text-sm">Upload Your Resume</span>
        </button>
      </div>

      {/* MENU ITEMS */}
      <div className="flex flex-col gap-[10px]">
        <SidebarItem
          label="My Profile"
          tab="profile"
          icon="/images/profile.svg"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleTabChange={handleTabChange}
        />
        <SidebarItem
          label="Post a Job"
          tab="postjob"
          icon="/images/create_job.svg"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleTabChange={handleTabChange}
        />
        <SidebarItem
          label="Posted Jobs"
          tab="postedjobs"
          icon="/images/posted_job.svg"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleTabChange={handleTabChange}
        />
        <SidebarItem
          label="Help Centre"
          tab="help"
          icon="/images/help.svg"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleTabChange={handleTabChange}
        />
        {/* LOGOUT */}
        <div
          onClick={handleLogout}
          className="w-full h-[75px] rounded-[10px] cursor-pointer flex items-center justify-center bg-[#FFD8D7] border border-[#FF7974] text-[#FF3831] font-medium text-[14px]"
        >
          Logout
        </div>
      </div>
    </div>
  );
}

/* SidebarItem Component */
function SidebarItem({ label, tab, icon, activeTab, setActiveTab,handleTabChange }) {
  const isActive = activeTab === tab;
  return (
    <div
      onClick={() => handleTabChange(tab)}
      className={`w-full h-[75px] rounded-[10px] cursor-pointer flex items-center gap-[10px] px-[25px] border border-[#DEE2E6]`}
    >
      <img src={icon} alt={label} className="w-[25px] h-[25px]" />
      <span
        className="text-[14px] font-medium flex-1"
        style={{ color: isActive ? "#0B8260" : "#30363F" }}
      >
        {label}
      </span>
    </div>
  );
}

