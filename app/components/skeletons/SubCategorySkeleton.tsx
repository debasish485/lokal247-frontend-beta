export default function SubCategorySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-[8px] justify-center overflow-x-auto scrollbar-hide">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-[150px] h-[36px] rounded-[28px] bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
}