import { LetterStates, TileState } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { GameState } from "@/lib/types";
import { updateLetterStates } from "@/lib/gameUtils";
import { getNewSession } from "@/api/getNewSession";
import { sendGuess } from "@/api/sendGuess";
import { useUserStore } from "./userStore";

interface Tile {
  letter: string;
  state: TileState;
}

interface GameSessionState {
  board: Tile[][];
  gameId: number | null;
  wordLength: number;
  gameState: GameState;
  currentRow: number;
  currentGuess: string;
  letterStates: LetterStates;
  reward: number;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  startGame: () => void;
  makeGuess: (guessWord: string) => void;
  onKeyPress: (key: string) => void;
  resetGame: () => void;
}

const useGameSessionStore = create<GameSessionState>()(
  persist(
    (set, get) => ({
      board: [],
      gameId: null,
      wordLength: 0,
      gameState: "inactive",
      currentRow: 0,
      currentGuess: "",
      letterStates: {},
      reward: 0,
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),

      startGame: async () => {
        console.log("STARTING GAME");
        const userId = useUserStore.getState().user?.user_id;
        const { resetGame, setLoading } = get();
        if (!userId) {
          console.error("Ошибка: пользователь не авторизован.");
          return;
        }
        resetGame();
        try {
          const response = await getNewSession(
            userId,
            console.error,
            setLoading,
          );
          if (!response) {
            throw new Error("Данные не получены.");
          }
          const { wordLength, attemptsLeft, gameId, reward } = response;
          console.log(response);
          set({
            board: Array.from({ length: attemptsLeft }, () =>
              Array.from({ length: wordLength }, () => ({
                letter: "",
                state: "empty",
              })),
            ),
            gameId,
            wordLength,
            gameState: "playing",
            currentRow: 0,
            letterStates: {},
            reward,
          });
          console.log("Новое состояние:", get());
          console.log("установил доску");
        } catch (error) {
          console.error("Ошибка при старте игры:", error);
        }
      },

      makeGuess: async (guessWord: string) => {
        console.log("GUESS WORD:", guessWord);
        const { wordLength } = get();

        if (!guessWord || guessWord.length < wordLength) {
          console.warn("makeGuess: guessWord is incomplete", guessWord);
          return;
        }
        try {
          const { gameId, letterStates, board, currentRow } = get();

          if (!gameId || currentRow >= board.length) return;

          const response = await sendGuess(gameId, guessWord);

          if (
            !response ||
            !response.feedback ||
            response.feedback.length !== guessWord.length
          ) {
            console.error("Некорректный ответ от сервера:", response);
            return;
          }

          const { feedback, result } = response;
          const updatedBoard = [...board];

          updatedBoard[currentRow] = guessWord.split("").map((letter, i) => ({
            letter,
            state: feedback[i] || "absent", // Если feedback[i] нет, подставляем "absent"
          }));
          console.log("SETTING result TO:", result);
          set((state) => ({
            
            board: updatedBoard,
            currentRow: state.currentRow + 1,
            letterStates: updateLetterStates(guessWord, feedback, letterStates),
            gameState:
              result === "win" ? "win" : result === "lose" ? "lost" : "playing",
            currentGuess: "", 
          }));
          console.log("SETTING GAME STATE TO:", get().gameState);
          console.log("LETTER STATES UPDATED:", updateLetterStates(guessWord, feedback, letterStates));
        } catch (error) {
          console.error("Ошибка при угадывании слова:", error);
        }
      },
      onKeyPress: (key: string) => {
        const {
          wordLength,
          board,
          currentRow,
          gameState,
          makeGuess,
        } = get();
        const currentGuess = get().currentGuess;

        console.log("KEY PRESSED:", key);
        console.log("currentGuess BEFORE:", get().currentGuess);
        if (gameState !== "playing" || currentRow >= board.length) return;

        if (key.toUpperCase() === "ENTER") {
          console.log("ENTER PRESSED. currentGuess:", currentGuess);
          if (currentGuess.length === wordLength) {
            makeGuess(currentGuess);
          }
        } else if (key.toUpperCase() === "BACKSPACE") {
          set({ currentGuess: currentGuess.slice(0, -1) });
          const index = currentGuess.length - 1;
          if (index >= 0) {
            const newBoard = [...board];
            newBoard[currentRow][index] = { letter: "", state: "empty" };
            set({ board: newBoard });
          }
        } else if (
          key.toUpperCase().match(/^[а-яА-Я]$/) &&
          currentGuess.length < wordLength
        ) {
          const newBoard = [...board];
          newBoard[currentRow][currentGuess.length] = {
            letter: key,
            state: "empty",
          };
          set({
            board: newBoard,
            currentGuess: currentGuess + key,
          });
        }
      },

      resetGame: () => {
        console.log("RESETTING GAME");
        set({
          board: [],
          gameId: null,
          wordLength: 0,
          // gameState: "inactive",
          currentRow: 0,
          currentGuess: "",
          letterStates: {},
          reward: 0,
        });
      },
    }),
    {
      name: "game-session-store",
    },
  ),
);

export default useGameSessionStore;
