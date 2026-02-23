"use client";

export default function SubCategorySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-8 w-full flex gap-[8px] justify-center flex-wrap">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[150px] h-[36px] rounded-[28px] bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
}