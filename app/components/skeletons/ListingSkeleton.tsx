"use client";

export default function JobSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-pulse">
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-md bg-gray-300" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="flex gap-1 mt-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="mt-3 h-3 bg-gray-300 rounded w-full"></div>
      <div className="flex flex-wrap gap-2 mt-3">
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
      </div>
      <div className="mt-4 h-8 bg-gray-300 rounded w-32"></div>
    </div>
  );
}
