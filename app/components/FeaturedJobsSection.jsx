"use client";

export default function FeaturedJobsSection() {
  const jobs = [
    {
      img: "/images/php.svg",
      title: "Jr. PHP Developer",
      skills: "CSS3, HTML5, Javascript, Bootstrap, Jquery",
      price: "$5K - $8K",
    },
    {
      img: "/images/project-manager.svg",
      title: "Exp. Project Manager",
      skills: "CSS3, HTML5, Javascript, Bootstrap, Jquery",
      price: "$6K - $10K",
    },
    {
      img: "/images/wordpress-developer.svg",
      title: "Sr. WordPress Developer",
      skills: "CSS3, HTML5, Javascript, Bootstrap, Jquery",
      price: "$5K - $8K",
    },
    {
      img: "/images/laravel-developer.svg",
      title: "Jr. Laravel Developer",
      skills: "CSS3, HTML5, Javascript, Bootstrap, Jquery",
      price: "$4K - $7K",
    },
    {
      img: "/images/ui-ux-designer.svg",
      title: "Sr. UI/UX Designer",
      skills: "CSS3, HTML5, Javascript, Bootstrap, Jquery",
      price: "$8K - $12K",
    },
    {
      img: "/images/java-python-developer.svg",
      title: "Java & Python Developer",
      skills: "CSS3, HTML5, Javascript, Bootstrap, Jquery",
      price: "$6K - $10K",
    },
    {
      img: "/images/code-ignetor.svg",
      title: "Sr. CodeIgniter Developer",
      skills: "CSS3, HTML5, Javascript, Bootstrap, Jquery",
      price: "$5K - $8K",
    },
    {
      img: "/images/magento-developer.svg",
      title: "Sr. Magento Developer",
      skills: "CSS3, HTML5, Javascript, Bootstrap, Jquery",
      price: "$7K - $11K",
    },
  ];

  return (
    <section className="w-full py-15">
      <div className="max-w-[1400px] mx-auto px-6 text-center">

        {/* Heading */}
        <h2
          className="mx-auto font-semibold text-[32px] leading-[42px]"
          style={{ fontFamily: "Font1" }}
        >
          Featured Jobs
        </h2>

        {/* Description */}
        <p
          className="mx-auto mt-4 text-[15px] leading-[25.5px] text-[#333333]"
          style={{
            maxWidth: "802px",
            fontFamily: "Font1",
            fontWeight: 400,
          }}
        >
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
          praesentium voluptatum deleniti atque corrupti quos dolores
        </p>

        {/* Job Boxes */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between p-6 rounded-xl shadow-sm hover:shadow-md transition bg-white border" style={{ borderColor: "#DEE2E6" }}
            >
              {/* Image */}
              <img
                src={job.img}
                alt={job.title}
                className="w-[60px] h-[60px] object-contain mb-4"
              />

              {/* Title */}
              <h4
                className=" mt-2 text-[16px] font-bold text-center truncate"
                style={{
                  width: "178px",
                  height: "24px",
                  lineHeight: "24px",
                  fontFamily: "Font1",
                  whiteSpace: "nowrap",
                }}
              >
                {job.title}
              </h4>

              {/* Skills */}
              <p
                className="mt-2 text-[14px] leading-[21px] text-gray-500 text-center"
                style={{ fontFamily: "Font1" }}
              >
                {job.skills}
              </p>

              {/* Footer */}
              <div className="job-instructor-footer w-full flex items-center justify-between mt-12">

                {/* Price (LEFT) */}
                <span
                  style={{
                    fontFamily: "Font1",
                    fontWeight: 600,
                    fontSize: "17.6px",
                    lineHeight: "21.12px",
                  }}
                >
                  {job.price}
                </span>

                {/* Open Button (RIGHT) */}
                <span
                  className="text-white"
                  style={{
                    backgroundColor: "#0B8260", // Elf Green
                    width: "69px",
                    height: "30px",
                    padding: "4px 14px",
                    borderRadius: "50px",
                    fontFamily: "Font1",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Open
                </span>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
