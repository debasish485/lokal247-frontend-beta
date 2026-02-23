"use client";

export default function FeaturesProcessSection() {
  const leftItems = [
    {
      title: "SEARCH JOB",
      desc: "Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.",
    },
    {
      img: "/images/find-job.svg",
      title: "FIND JOB",
      desc: "Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.",
    },
    {
      img: "/images/create-account.svg",
      title: "CREATE ACCOUNT",
      desc: "Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.",
    },
    {
      img: "/images/hire-employee.svg",
      title: "HIRE EMPLOYEE",
      desc: "Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.",
    },
  ];

  const rightItems = [
    {
      title: "START WORK",
      desc: "Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.",
    },
    {
      img: "/images/submit-bid.svg",
      title: "SUBMIT BID",
      desc: "Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.",
    },
    {
      title: "PAY MONEY",
      desc: "Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.",
    },
    {
      img: "/images/happy-user.svg",
      title: "HAPPY USER",
      desc: "Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.",
    },
  ];

  return (
    <section className="w-full py-15">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-[32px] leading-[42px] font-semibold"
            style={{ fontFamily: "Font1" }}
          >
            Features & Process
          </h2>
          <p
            className="max-w-[700px] mx-auto mt-4 text-[#333333]"
            style={{ fontFamily: "Font1" }}
          >
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12">

          {/* Left Column */}
          <div className="flex flex-col gap-12">
            {leftItems.map((item, index) => (
              <div key={index} className="flex flex-col items-start text-left">
                
                {/* Icon */}
                <div className="h-[48px] mb-3">
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-[48px] h-[48px]"
                    />
                  )}
                </div>

                <h4
                  className="text-[18px] font-semibold"
                  style={{ fontFamily: "Font1" }}
                >
                  {item.title}
                </h4>

                <p
                  className="mt-1 text-[14px] text-[#333333]"
                  style={{ fontFamily: "Font1" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center">
            <img
              src="/images/iphone.svg"
              alt="iPhone"
              className="max-w-[320px] w-full object-contain"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12">
            {rightItems.map((item, index) => (
              <div key={index} className="flex flex-col items-start text-left">
                
                {/* Icon */}
                <div className="h-[48px] mb-3">
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-[48px] h-[48px]"
                    />
                  )}
                </div>

                <h4
                  className="text-[18px] font-semibold"
                  style={{ fontFamily: "Font1" }}
                >
                  {item.title}
                </h4>

                <p
                  className="mt-1 text-[14px] text-[#333333]"
                  style={{ fontFamily: "Font1" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
