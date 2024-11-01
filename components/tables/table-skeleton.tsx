import { useId } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export default function TableSkeleton({
  rows = 5,
  columns = 4,
  className = "",
}: TableSkeletonProps) {
  const id = useId();

  return (
    <div
      className={`w-full overflow-hidden rounded-lg shadow-md ${className}`}
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="w-full  h-[30px] rounded-md" />
      <div className="overflow-x-auto w-full ">
        <div className="w-full">
          <div className="flex flex-col gap-1 pt-4">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={`${id}-row-${rowIndex}`} className="my-3">
                <Skeleton className="w-full h-[27px] rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
