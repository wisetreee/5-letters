import { Skeleton } from "@/components/ui/skeleton";

export const Top3PanelSkeleton: React.FC = () => {
  return (
    <div className="flex w-full items-center">
      {[2, 1, 3].map((place) => (
        <div key={place} className="flex flex-col items-center gap-2 w-1/3">
          {/* Crown placeholder for top 1 */}
          {place === 1 && <Skeleton className="w-12 h-12 rounded-full" />}

          {/* Avatar */}
          <Skeleton
            className={
              place === 1
                ? "w-24 h-24 sm:w-32 sm:h-32 rounded-full"
                : "w-16 h-16 sm:w-24 sm:h-24 rounded-full"
            }
          />

          {/* Circle with place number */}
          <Skeleton
            className={
              place === 1
                ? "w-6 h-6 sm:w-9 sm:h-9 rounded-full -mt-3"
                : "w-5 h-5 sm:w-8 sm:h-8 rounded-full -mt-2"
            }
          />

          {/* Username */}
          <Skeleton className="h-4 w-20 sm:w-24" />
        </div>
      ))}
    </div>
  );
};
