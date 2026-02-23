"use client";

import { FaStar } from "react-icons/fa";

export default function ReviewsSection() {
  const reviews = [
    {
      title: "The best useful website",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
      img: "/images/review1.svg",
      name: "Lucia E. Nugent",
      role: "CEO of Climber",
    },
    {
      title: "Ranking is the #1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
      img: "/images/review2.svg",
      name: "Brenda R. Smith",
      role: "Founder of Yeloower",
    },
    {
      title: "The website is eco friendly",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
      img: "/images/review3.svg",
      name: "Brian B. Wilkerson",
      role: "CEO of Mark Soft",
    },
    {
      title: "100% save and secure website",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
      img: "/images/review1.svg",
      name: "Lucia E. Nugent",
      role: "CEO of Climber",
    },
    {
      title: "Very developer friendly website",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
      img: "/images/review2.svg",
      name: "Brenda R. Smith",
      role: "Founder of Yeloower",
    },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto py-24 px-4">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2
          className="text-[32px] leading-[42px] font-semibold"
          style={{ fontFamily: "Font1" }}
        >
          Good Reviews By Customers
        </h2>
        <p
          className="max-w-[700px] mx-auto mt-4 text-[#333333]"
          style={{ fontFamily: "Font1" }}
        >
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
          praesentium voluptatum deleniti atque corrupti quos dolores.
        </p>
      </div>

      {/* Review Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="jobstock-reviews-box bg-white p-4 rounded-[10px] border"
            style={{
              width: "100%",
              minHeight: "216px",
              borderColor: "#DEE2E6"
            }}
          >
            {/* Box Heading */}
            <h4
              className="text-[18px] font-semibold mb-2"
              style={{ fontFamily: "Font1" }}
            >
              {item.title}
            </h4>

            {/* Description */}
            <p
              className="text-[14px] text-gray-500 mb-6"
              style={{ fontFamily: "Font1" }}
            >
              {item.desc}
            </p>

            {/* Bottom Info */}
            <div className="flex items-center gap-4 mt-auto">
              <img
                src={item.img}
                alt={item.name}
                className="w-[58px] h-[58px] rounded-full"
              />

              <div>
                <h5
                  className="text-[14px] font-semibold"
                  style={{ fontFamily: "Font1" }}
                >
                  {item.name}
                </h5>
                <p
                  className="text-[12px] text-gray-500"
                  style={{ fontFamily: "Font1" }}
                >
                  {item.role}
                </p>

                {/* Stars */}
                <div className="flex gap-1 mt-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
