import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-xl border p-3 shadow-sm">
        <Skeleton className="h-4 w-60" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-2/5" />
        <Skeleton />
      </div>
      <div className="gap-4 md:flex">
        <div className="space-y-3 rounded-xl border p-3 pt-6 shadow-sm md:w-1/4">
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-1/2" />
          </div>
        </div>
        <div className="space-y-3 md:w-3/4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="h-4 w-2/5" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border p-4 shadow-sm"
              >
                <Skeleton className="h-[150px] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
