"use client";
import FallbackImage from "../components/FallbackImage";

export default function TopCategoriesSection() {
  const categories = [
    {
      img: "/images/account-finance.svg",
      title: "Account & Finance",
      activeJobs: 122,
    },
    {
      img: "/images/automotive-jobs.svg",
      title: "Automotive Jobs",
      activeJobs: 98,
    },
    {
      img: "", // business part image empty for now
      title: "Business & Consulting",
      activeJobs: 76,
    },
    {
      img: "/images/education-training.svg",
      title: "Education & Training",
      activeJobs: 145,
    },
    {
      img: "/images/health-care.svg",
      title: "Health Care",
      activeJobs: 210,
    },
    {
      img: "/images/restaurant-food.svg",
      title: "Restaurant & Food",
      activeJobs: 64,
    },
    {
      img: "/images/transportation.svg",
      title: "Transportation",
      activeJobs: 53,
    },
    {
      img: "/images/telecommunications.svg",
      title: "Telecommunications",
      activeJobs: 89,
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="max-w-[1400px] mx-auto px-4 text-center">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="mx-auto font-semibold text-[32px] leading-[42px]"
            style={{ fontFamily: "Font1" }}>
            Explore Top Categories
          </h2>
          <p className="mx-auto mt-4 text-[15px] leading-[25.5px] text-[#333333]"
            style={{
              maxWidth: "802px",
              fontFamily: "Font1",
              fontWeight: 400,
            }}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          </p>
        </div>
        {/* Category Boxes */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition border" style={{ borderColor: "#DEE2E6" }}
            >
              {/* Image */}
              <FallbackImage
                src={cat.img}
                alt={cat.title}
                className="w-[80px] h-[80px] max-w-[80px] max-h-[80px] object-contain mb-4"
              />


              {/* Title */}
              <h4
                className="text-center truncate"
                style={{
                  width: "194px",
                  height: "24px",
                  opacity: 1,
                  fontFamily: "Font1",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "24px",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                }}
                title={cat.title}
              >
                {cat.title}
              </h4>

              {/* Active Jobs */}
              <span
                className="flex items-center justify-center whitespace-nowrap rounded-full mt-4"
                style={{
                  width: "83px",
                  height: "22px",
                  opacity: 1,
                  fontFamily: "Font1",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "21.6px",
                  letterSpacing: "0%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  backgroundColor: "#F1F3F7",
                  color: "black",
                }}
              >
                {cat.activeJobs} Active jobs
              </span>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
