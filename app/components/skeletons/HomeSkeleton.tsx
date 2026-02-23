export default function HomeSkeleton() {
  return (
    <div className="w-full p-4 space-y-6 animate-pulse">
      {/* Heading */}
      <div className="h-6 w-40 bg-gray-200 rounded"></div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-5 space-y-4"
          >
            {/* Title */}
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>

            {/* Subtitle */}
            <div className="h-3 w-1/2 bg-gray-200 rounded"></div>

            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
            </div>

            {/* Chips */}
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
