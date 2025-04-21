import { sendRequest } from "@/api/sendRequest";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";

interface NewSessionDataResponse {
  word_length: number;
  attempts_left: number;
  game_id: number;
  reward: number;
}

interface NewSessionData {
  wordLength: number;
  attemptsLeft: number;
  gameId: number;
  reward: number;
}

export const getNewSession = async (
  userId: string,
  onError: (error: string) => void,
  setLoading: (loading: boolean) => void,
): Promise<NewSessionData | null> => {
  try {
    setLoading(true);
    const response = await sendRequest<void, NewSessionDataResponse>(
      `/api/game/start?user_id=${userId}`,
      "get",
    );

    if (!response.succeeded || !response.data) {
      onError(response.err || "No data");
      return null;
    }
    const data = response.data;
    const formattedData: NewSessionData = {
      wordLength: data.word_length,
      attemptsLeft: data.attempts_left,
      gameId: data.game_id,
      reward: data.reward,
    };

    return formattedData;
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(
      error,
      "Неизвестная ошибка при создании новой сессии",
    );
    onError(errorMessage);
    return null;
  } finally {
    setLoading(false);
  }
};
