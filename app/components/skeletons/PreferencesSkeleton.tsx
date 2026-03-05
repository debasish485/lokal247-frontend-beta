"use client";

export default function PreferencesSkeleton() {
  return (
    <div className="animate-pulse">
      <h2 className="h-6 w-40 bg-gray-300 rounded mb-6"></h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-[56px] w-full bg-gray-300 rounded-lg"></div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="h-[50px] w-[150px] bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}