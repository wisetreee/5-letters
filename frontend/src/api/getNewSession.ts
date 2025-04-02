
import { sendRequest } from "@/api/sendRequest";

interface NewSessionData {
  wordLength: number;
  attemptsLeft: number;
  gameId: number;
}

export const getNewSession = async (
  userId: string,
  onError: (error: string) => void,
  setLoading: (loading: boolean) => void
): Promise<NewSessionData | undefined> => {
  try {
    setLoading(true);
    const response = await sendRequest<NewSessionData, void>(
      `/api/game/start?user_id=${userId}`,
      'get'
    );

    if (!response.succeeded || !response.data) {
      onError(response.err || 'No data');
      return undefined;
    }
    const data:any = response.data;
    const formattedData: NewSessionData = {
      wordLength: data.word_length,
      attemptsLeft: data.attempts_left,
      gameId: data.game_id,
    };

    return formattedData;
  } catch (error: any) {
    onError(error.message);
    return undefined;
  } finally {
    setLoading(false);
  }
};

