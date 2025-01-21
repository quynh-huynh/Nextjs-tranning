import { Skeleton } from "../skeletons";

export function CardSkeleton() {
  return (
    <div className="w-[250px] h-[350px] m-[10px] flex flex-col items-center justify-between p-2 border border-gray-300 rounded-md shadow-md">
      {/* Card Header (Title) */}
      <Skeleton className="w-[70%] h-[20px] mb-2" />

      {/* Card Content (Image) */}
      <Skeleton className="w-[200px] h-[200px] mb-2" />

      {/* Card Footer (Buttons) */}
      <div className="flex justify-between w-full">
        <Skeleton className="w-[80px] h-[30px]" />
        <Skeleton className="w-[80px] h-[30px]" />
      </div>
    </div>
  );
}