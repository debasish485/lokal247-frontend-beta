"use client"

import HeroSection from "@/app/components/HeroSection";
import TrustedCompaniesSection from "@/app/components/TrustedCompaniesSection";
import FeaturedJobsSection from "@/app/components/FeaturedJobsSection";
import TopCategoriesSection from "@/app/components/TopCategoriesSection";
import FeaturesProcessSection from "@/app/components/FeaturesProcessSection";
import ReviewSection from "@/app/components/ReviewsSection";
import WorkingWithUsSection from "@/app/components/WorkingWithUsSection";
import HomeSkeleton from "@/app/components/skeletons/HomeSkeleton";
import { useEffect, useState } from "react";


export default function HomePage() {
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }
  return (
    <>
      <HeroSection />
      <TrustedCompaniesSection/>
      <FeaturedJobsSection/>
      <TopCategoriesSection/>
      <FeaturesProcessSection/>
      <ReviewSection/>
      <WorkingWithUsSection/>
      {/* Next sections later */}
      {/* <PopularJobs /> */}
      {/* <Categories /> */}
      {/* <Testimonials /> */}
    </>
  );
}
