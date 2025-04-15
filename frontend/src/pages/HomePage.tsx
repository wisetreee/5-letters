import DailyModeCard from "@/components/ui/DailyTaskCard";
import EndlessModeCard from "@/components/ui/EndlessModeCard";
import NewWordsCard from "@/components/ui/NewWordsCard";
import PastSeasonCard from "@/components/ui/PastSeasonCard";
import SeasonCard from "@/components/ui/SeasonCard";
import StatsCard from "@/components/ui/StatsCard";
import { useUserStore } from "@/store/userStore";

const HomePage = () => {
  const user = useUserStore((state) => state.user);
  return (
    <section className="container lg:max-w-3xl flex flex-col gap-2">
      <SeasonCard userRank={4} seasonEndDate={1670} userBalance={user?.star_balance || 0} />
      <PastSeasonCard />
      <div className="grid gap-2 sm:grid-cols-2 ">
        <EndlessModeCard />
        <DailyModeCard />
        <StatsCard />
        <NewWordsCard />
      </div>
    </section>
  );
};

export default HomePage;
