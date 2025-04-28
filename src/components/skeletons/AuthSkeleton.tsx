import { Skeleton } from "@/components/ui/skeleton";

export function AuthSkeleton() {
  return (
    <div className="w-md h-[450px] mx-auto pt-20">
      <Skeleton className="size-full" />
    </div>
  );
}
