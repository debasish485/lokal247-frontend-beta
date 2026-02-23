"use client";

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-[1700px] mx-auto"
      style={{ height: "649px", opacity: 1 }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-left"
        style={{
          backgroundImage: "url('/images/home-banner-1.webp')",
          height: "100%"
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Curve Image */}
      <img
        src="/images/rectangle.svg"
        alt="curve"
        className="absolute bottom-0 left-0 w-full h-[350px] object-cover z-10"
      />

      {/* Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 pt-[200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">

          {/* LEFT TEXT */}
          <div>
            {/* Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="bg-emerald-600 inline-block"
                style={{ width: "40px", height: "1.59px" }}
              ></span>

              <span className="text-white text-sm font-bold">
                Get Hot & Trending Jobs
              </span>
            </div>

            <h1
              className="text-white text-[56px] leading-[72.8px] font-semibold"
              style={{ fontFamily: "Jost, sans-serif",width:"826px",height:"146px"}}
            >
              Real Jobs, Real People, <br />Real 
              Success.
            </h1>

            <p className="mt-6 text-[20px] leading-[36px] text-white"
              style={{
                fontFamily:"Jost, sans-serif",
                width: "826px",
                height: "36px",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "36px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                opacity: 1,
              
              }}
            >
              Getting a new job is never easy. Check what new jobs we have in<br/>
              store for you on Job Stock.
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-[420px] justify-self-end">
            <h3 className="text-xl font-semibold mb-4">Find Your Job</h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Job title"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input
                type="text"
                placeholder="Location"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="submit"
                className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
          bg-[#0B8260] hover:bg-[#0a6f51] text-white 
          px-4 py-2 shadow-sm transition 
          no-underline outline-none focus:outline-none"
              >
                Search Jobs
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
