import { LeaderboardTable } from "@/components/tables/LeaderboardTable/LeaderboardTable";
import { LeaderboardTableSkeleton } from "@/components/tables/LeaderboardTable/LeaderboardTableSkeleton";
import { Top3Panel } from "@/components/top3panel/Top3Panel";
import { Top3PanelSkeleton } from "@/components/top3panel/Top3PanelSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useTop3Leaderboard } from "@/hooks/useTop3Leaderboard";
import { LeaderboardData } from "@/lib/types";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export const SeasonPage: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const currentUserId = user?.user_id;

  const {
    data,
    loading: leaderboardLoading,
    error: leaderboardError,
    getLeaderboard,
  } = useLeaderboard();
  const {
    top3,
    loading: top3Loading,
    error: top3Error,
    getTop3,
  } = useTop3Leaderboard();
  const [startRank, setStartRank] = useState(1);
  const [count] = useState(10);

  const restData: LeaderboardData | undefined = data
    ? {
        ...data,
        leaderboard: data.leaderboard.slice(3),
      }
    : undefined;

    useEffect(() => {
      if (currentUserId) {
        getLeaderboard(currentUserId, startRank, count);
        getTop3();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserId, startRank, count]);

  const handlePrev = () => {
    if (startRank - count >= 1) {
      setStartRank(startRank - count);
    }
  };

  const handleNext = () => {
    if (startRank + count < (data?.total_count ?? 0)) {
      setStartRank(startRank + count);
    }
  };

  return (
    <section className="container lg:max-w-3xl flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <h1>Сезон 1</h1>
        <p className="text-muted-foreground text-center">
          Набирай звёзды и попади в топ-1000 отгадывателей слов!
        </p>
      </div>

      {top3Loading ? <Top3PanelSkeleton /> : top3 && <Top3Panel top3={top3} />}
      {leaderboardLoading ? (
        <LeaderboardTableSkeleton />
      ) : (
        restData && <LeaderboardTable leaderboardData={restData} />
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrev} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {top3Error && (
        <div className="text-color-accent-red text-sm">
          Не удалось загрузить топ-3.{" "}
          <button onClick={getTop3} className="underline">
            Повторить
          </button>
        </div>
      )}

      {leaderboardError && (
        <div className="text-color-accent-red text-sm">
          Не удалось загрузить лидерборд.{" "}
          {currentUserId && (
            <button
              onClick={() => getLeaderboard(currentUserId, startRank, count)}
              className="underline"
            >
              Повторить
            </button>
          )}
        </div>
      )}
    </section>
  );
};
