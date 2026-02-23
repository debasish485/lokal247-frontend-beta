"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CategorySkeleton from "@/app/components/skeletons/CategorySkeleton";
import StepLayout from "./StepLayout";
import SubCategorySkeleton from "@/app/components/skeletons/SubCategorySkeleton";

interface Category {
  id: number;
  uuid: string;
  name: string;
  image?: string;
}

interface SubCategory {
  id: number;
  name: string;
}

interface StepExpertiseProps {
  onNext: () => void;
  onBack: () => void;
  setWorkerData: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepExpertise({
  onNext,
  onBack,
  setWorkerData,
}: StepExpertiseProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubs, setSelectedSubs] = useState<number[]>([]);

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);


  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        setCategories(json.data || []);
        if (json.data && json.data.length > 0) setSelectedCategory(json.data[4]);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  /* ---------------- FETCH SUB CATEGORIES ---------------- */
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchSubCategories = async () => {
      setLoadingSubs(true);
      try {
        const res = await fetch(
          `/api/categories/${selectedCategory.uuid}/sub-categories`
        );
        const json = await res.json();
        setSubCategories(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error("Failed to load sub categories", err);
        setSubCategories([]);
      } finally {
        setLoadingSubs(false);
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  /* ---------------- CATEGORY SELECT ---------------- */
  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setSelectedSubs([]);

    setWorkerData((prev: any) => ({
      ...prev,
      expertise: {
        id: cat.id,
        uuid: cat.uuid,
      },
      subExpertise: {},
    }));
  };

  /* ---------------- SUB CATEGORY TOGGLE ---------------- */
  const toggleSubCategory = (id: number) => {
    setSelectedSubs((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  /* ---------------- NEXT ---------------- */
  const handleNext = () => {
    if (!selectedCategory) return;

    setWorkerData((prev: any) => ({
      ...prev,
      subExpertise: {
        [selectedCategory.uuid]: selectedSubs,
      },
    }));

    onNext();
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };


  return (
    <StepLayout
      footer={
        <div className="flex justify-between gap-4 w-full">
          <button
            onClick={onBack}
            className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
              text-black px-4 py-2 shadow-sm transition 
              no-underline outline-none focus:outline-none"
          >
            Back
          </button>

          <button
            disabled={!selectedCategory || selectedSubs.length === 0}
            onClick={handleNext}
            className="flex justify-center items-center w-full rounded-[4px] text-[16px] h-[50px] font-medium tracking-[0.2px] 
              bg-[#0B8260] hover:bg-[#0a6f51] text-white 
              px-4 py-2 shadow-sm transition 
              no-underline outline-none focus:outline-none"
          >
            Next
          </button>
        </div>
      }
    >
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-8">
          Select your area of expertise
        </h2>

        {/* ================= CATEGORIES ================= */}

        <div className="relative w-[978px] max-w-full p-[20px] mx-auto">


          {/* LEFT ARROW */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-[75%] z-10 
             bg-white/90 shadow-md rounded-full 
             w-9 h-9 flex items-center justify-center 
             hover:bg-gray-100"
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-[75%] z-10 
             bg-white/90 shadow-md rounded-full 
             w-9 h-9 flex items-center justify-center 
             hover:bg-gray-100"
          >
            ›
          </button>


          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide"
          >
            {loadingCategories ? (
              <CategorySkeleton count={6} />
            ) : (


              <div className="flex gap-[16px]">
                {categories.map((item) => {
                  const isSelected = selectedCategory?.uuid === item.uuid;

                  return (
                    <button
                      key={item.uuid}
                      onClick={() => handleCategorySelect(item)}
                      className="flex-shrink-0 w-[110px] h-[138px] flex flex-col items-center gap-[5px]"
                    >
                      <div
                        className={`
                w-[110px] h-[110px] p-[23px]
                rounded-[23px] border
                flex items-center justify-center
                transition
                ${isSelected
                            ? "border-[#0B8260] bg-[#EDFFFA]"
                            : "border-gray-300"
                          }
              `}
                      >
                        {item.image ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${item.image}`}
                            alt={item.name}
                            width={48}
                            height={48}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-full" />
                        )}

                      </div>

                      <p
                        className={`text-sm font-medium ${isSelected ? "text-[#0B8260]" : "text-gray-700"
                          }`}
                      >
                        {item.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* ================= SUB CATEGORIES ================= */}
        {selectedCategory && (
          <div className="mt-8 w-full flex  gap-[8px] justify-center">
            {loadingSubs && <SubCategorySkeleton count={6} />}

            {!loadingSubs &&
              subCategories.map((item) => {
                const isSelected = selectedSubs.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSubCategory(item.id)}
                    className={`
                    w-[183px] h-[43px]
                    px-[15px] py-[10px]
                    rounded-[28px]
                    text-sm transition
                    whitespace-nowrap
                    ${isSelected
                        ? "bg-[#EDFFFA] text-[#0B8260]"
                        : "bg-[#F5F7FA] text-[#333333]"
                      }
                  `}
                  >
                    {item.name}
                  </button>
                );
              })}
          </div>
        )}
        </div>
      </StepLayout>
      );
}