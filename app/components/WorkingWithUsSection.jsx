"use client";

export default function WorkingWithUsSection() {
  return (
    <section
  className="w-full flex justify-center items-center"
  style={{
    maxWidth: "1920px",
    height: "384.6px",
    backgroundColor: "#0B8260",
    color: "white",
    paddingTop: "80px",
    paddingBottom: "80px",
    paddingLeft: "110px",
    paddingRight: "110px",
  }}
>
  <div
    className="flex flex-col items-center text-center w-full"
    style={{
      maxWidth: "1700px",
      height: "224.6px",
    }}
  >
    {/* Heading */}
    <h2
      className="text-[32px] font-semibold mb-4"
      style={{ fontFamily: "Font1" }}
    >
      Are You Already Working With Us?
    </h2>

    {/* Description */}
    <p
      className="text-white mb-16"
      style={{ fontFamily: "Font1", fontSize: "16px" }}
    >
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
    </p>

    {/* Search Box with Button inside */}
    <div
      className="relative w-full max-w-[870.89px]"
      style={{ height: "70px" }}
    >
      <input
        type="email"
        placeholder="Enter Your Email"
        className="w-full h-full pl-6 pr-[130px] rounded-[6.4px] border border-gray-300 text-black font-[Font1] text-[16px] bg-white"
        style={{ boxSizing: "border-box" }}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#262D2F] text-white font-semibold"
        style={{
          width: "118px",
          height: "56px",
          borderRadius: "6.4px",
          paddingTop: "14.5px",
          paddingBottom: "15.5px",
          paddingLeft: "24px",
          paddingRight: "24px",
          borderWidth: "1px",
        }}
      >
        Subscribe
      </button>
    </div>
  </div>
</section>


  );
}
