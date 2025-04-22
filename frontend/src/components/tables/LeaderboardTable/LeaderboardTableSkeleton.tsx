import { Skeleton } from "@/components/ui/skeleton";

export const LeaderboardTableSkeleton = () => {
  const rows = Array.from({ length: 11 });

  return (
    <div className="w-full border rounded-xl overflow-hidden">
      {rows.map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between px-4 py-3 border-t"
        >
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
};
