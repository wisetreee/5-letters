import { useEffect } from "react";
import DailyModeCard from "@/components/ui/DailyModeCard";
import EndlessModeCard from "@/components/ui/EndlessModeCard";
import NewWordsCard from "@/components/ui/NewWordsCard";
import PastSeasonCard from "@/components/ui/PastSeasonCard";
import SeasonCard from "@/components/ui/SeasonCard";
import StatsCard from "@/components/ui/StatsCard";
import { useGameModelData } from "@/hooks/useGameModelData";
import { useUserStore } from "@/store/userStore";
import { Skeleton } from "@/components/ui/skeleton"; // для лоадера

const HomePage = () => {
  const user = useUserStore((state) => state.user);
  const { gameModelData, loading, error, refetch } = useGameModelData(user?.user_id || null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading || !gameModelData) {
    return (
      <section className="container lg:max-w-3xl flex flex-col gap-2">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <div className="grid gap-2 sm:grid-cols-2">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container lg:max-w-3xl">
        <div>Ошибка: {error}</div>
      </section>
    );
  }

  return (
    <section className="container lg:max-w-3xl flex flex-col gap-2">
      <SeasonCard
        href="/season"
        seasonId={gameModelData.season.id}
        userRank={gameModelData.rank}
        userBalance={gameModelData.star_balance}
        seasonEndDate={gameModelData.season.remaining_time}
      />
      <PastSeasonCard />
      <div className="grid gap-2 sm:grid-cols-2">
        <EndlessModeCard  
          href="/game/endless"
          reward={gameModelData.rewards.endless} />
        <DailyModeCard reward={gameModelData.rewards.daily} />
        <StatsCard />
        <NewWordsCard />
      </div>
    </section>
  );
};

export default HomePage;