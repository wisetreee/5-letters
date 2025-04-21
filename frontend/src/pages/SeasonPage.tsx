import { LeaderboardTable } from "@/components/tables/LeaderboardTable";
import { Top3Avatar } from "@/components/ui/avatars/Top3Avatar";
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

  const { data, loading: leaderboardLoading, error: leaderboardError, getLeaderboard } = useLeaderboard();
  const { top3, loading: top3Loading, error: top3Error, getTop3 } = useTop3Leaderboard();
  const [startRank, setStartRank] = useState(1);
  const [count, setCount] = useState(10);

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
    };
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

      <div className="flex w-full items-center">
        {top3?.[1] && <Top3Avatar user={top3[1]} place={2} />}
        {top3?.[0] && <Top3Avatar user={top3[0]} place={1} />}
        {top3?.[2] && <Top3Avatar user={top3[2]} place={3} />}
      </div>

      {restData && <LeaderboardTable leaderboardData={restData} />}

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
        <div className="text-red-500 text-sm">
          Не удалось загрузить топ-3. {" "}
          <button
            onClick={getTop3}
            className="underline"
          >
            Повторить
          </button>
        </div>
      )}
    </section>
  );
};