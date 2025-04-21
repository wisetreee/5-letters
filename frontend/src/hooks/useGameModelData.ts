import { useState, useEffect, useCallback } from "react";
import { getGameModelData } from "@/api/getGameModelData";
import { GameModelData } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";

export const useGameModelData = (userId: string | null) => {
  const [gameModelData, setGameModelData] = useState<GameModelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGameModel = useCallback(async () => {
    if (!userId) return;

    const result = await getGameModelData(userId, setError, setLoading);
    if (result) {
      setGameModelData(result);
    }
  
  }, [userId]);

  useEffect(() => {
    if (userId) {
      try {
      fetchGameModel();
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(
          error,
          "Неизвестная ошибка при получении данных об игре",
        );
      setError(errorMessage);
    }
    }
  }, [fetchGameModel]);

  return {
    gameModelData,
    loading,
    error,
    refetch: fetchGameModel,
  };
};