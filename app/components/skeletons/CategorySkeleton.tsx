// components/skeletons/CategorySkeleton.tsx
"use client";

export default function CategorySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-[110px] h-[138px] flex flex-col items-center gap-2"
        >
          {/* Circle placeholder for image */}
          <div className="w-[110px] h-[110px] rounded-[23px] bg-gray-200 animate-pulse" />
          {/* Text placeholder */}
          <div className="h-4 w-[80px] bg-gray-200 rounded animate-pulse mt-2" />
        </div>
      ))}
    </div>
  );
}
