"use client";

import { useEffect, useState } from "react";

interface SubCategory {
  id: number;
  name: string;
}

interface StepExpertiseWithSubProps {
  selectedCategoryUuid: string | null;
  onNext: () => void;
  onBack: () => void;
  setWorkerData: React.Dispatch<React.SetStateAction<any>>;
}

export default function StepExpertiseWithSub({
  selectedCategoryUuid,
  onNext,
  onBack,
  setWorkerData,
}: StepExpertiseWithSubProps) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSub, setSelectedSub] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCategoryUuid) return;

    const fetchSubCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/categories/${selectedCategoryUuid}/sub-categories`
        );
        const json = await res.json();
        setSubCategories(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error("Failed to load sub categories", err);
        setSubCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [selectedCategoryUuid]);

  const handleNext = () => {
    setWorkerData((prev: any) => ({
      ...prev,
      subExpertise: {
        ...prev.subExpertise,
        [selectedCategoryUuid!]: [selectedSub],
      },
    }));

    onNext();
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-8">
        Select your sub category
      </h2>

      {loading && <p>Loading sub categories...</p>}

      {!loading && subCategories.length === 0 && (
        <p className="text-gray-500">No sub categories found</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {subCategories.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedSub(item.id)}
            className={`border p-4 rounded-lg transition
              ${
                selectedSub === item.id
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-gray-300 hover:border-emerald-400"
              }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        <button onClick={onBack} className="w-full border rounded-lg py-3">
          Back
        </button>

        <button
          disabled={!selectedSub}
          onClick={handleNext}
          className="w-full bg-emerald-700 text-white rounded-lg py-3 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
