import { useRequest } from "@/api/useRequest";
import { LeaderboardData, userData } from "@/lib/types";
import { useState } from "react";

export function useTop3Leaderboard() {
  const [top3, setTop3] = useState<userData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTop3 = useRequest<undefined, LeaderboardData>(
    "/api/leaderboard/top3",
    "get",
    (e) => setError(e),
    setLoading
  );

  const getTop3 = async () => {
    const res = await fetchTop3();
    if (res.succeeded && res.data) {
      setTop3(res.data.leaderboard);
    }
  };

  return {
    top3,
    loading,
    error,
    getTop3,
  };
}