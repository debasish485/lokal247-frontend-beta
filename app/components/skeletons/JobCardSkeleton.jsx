export default function JobCardSkeleton() {
  return (
    <div className="bg-white flex flex-col p-2 rounded-lg border border-[#DEE2E6] gap-4 animate-pulse">
      
      {/* HEADER */}
      <div className="flex items-start justify-between gap-2">
        <div className="w-full">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      </div>

      {/* CHIPS */}
      <div className="flex gap-2 flex-wrap">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-auto gap-2">
        <div className="h-5 bg-gray-300 rounded w-24"></div>
        <div className="h-5 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}