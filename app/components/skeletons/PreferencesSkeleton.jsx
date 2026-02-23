"use client";

export default function PreferencesSkeleton() {
  return (
    <div className="relative animate-pulse">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 bg-gray-200 rounded w-44 h-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="w-full h-14 bg-gray-200 rounded" />
        ))}
      </div>

      <div className="mt-6">
        <div className="w-32 h-12 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
