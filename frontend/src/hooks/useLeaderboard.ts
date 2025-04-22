import { useCallback, useState } from "react";
import { sendRequest } from "@/api/sendRequest";
import { LeaderboardData } from "@/lib/types";

export const useLeaderboard = () => {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLeaderboard = useCallback(
    async (userId: string, startRank: number, count: number) => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        user_id: userId,
        start_rank: startRank.toString(),
        count: count.toString(),
      });

      const response = await sendRequest<undefined, LeaderboardData>(
        `/api/leaderboard/?${params.toString()}`,
        "get",
      );

      setLoading(false);

      if (!response.succeeded || !response.data) {
        setError(response.err || "Ошибка при получении лидерборда");
        return null;
      }

      setData(response.data);
    },
    [],
  );

  return {
    data,
    loading,
    error,
    getLeaderboard,
  };
};
