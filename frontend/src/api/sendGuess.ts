import { TileState } from "@/lib/types";
import { sendRequest } from "./sendRequest";

interface GuessRequest {
  game_id: number;
  guess: string;
}

interface GuessResponse {
  result: "win" | "incorrect" | "lose";
  feedback: TileState[];
  attempts_used?: number;
  correct_word?: string;
}

export const sendGuess = async (
  gameId: number,
  guessWord: string
): Promise<GuessResponse | null> => {
  try {
    const response = await sendRequest<GuessResponse, GuessRequest>(
      "/api/game/guess",
      "post",
      { game_id: gameId, guess: guessWord }
    );

    if (!response.succeeded || !response.data) {
      throw new Error("Не удалось получить ответ от сервера.");
    }

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке слова:", error);
    return null;
  }
};