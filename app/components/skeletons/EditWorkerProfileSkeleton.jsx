"use client";

export default function EditWorkerProfileSkeleton() {
  const skeletonInput =
    "w-full h-[56px] rounded-[8px] bg-gray-200 animate-pulse";

  const skeletonCircle = "w-20 h-20 rounded-full bg-gray-200 animate-pulse";

  return (
    <div className="space-y-6">
      <h2 className="h-6 w-1/4 bg-gray-200 animate-pulse rounded"></h2>

      {/* PHOTO */}
      <div className="flex items-center gap-4">
        <div className={skeletonCircle}></div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <div className={skeletonInput}></div>
        </div>

        <div className={skeletonInput}></div>
        <div className={skeletonInput}></div>
        <div className={skeletonInput}></div>
        <div className={skeletonInput}></div>
        <div className={skeletonInput}></div>
        <div className={skeletonInput}></div>
      </div>

      {/* SAVE BUTTON */}
      <div className="h-12 w-40 bg-gray-200 animate-pulse rounded"></div>
    </div>
  );
}
