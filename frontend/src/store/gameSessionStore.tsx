import { LetterStates, TileState } from '@/lib/types';
import { create } from 'zustand';
import { GameState } from '@/lib/types';
import { updateLetterStates } from '@/lib/gameUtils';
import { persist } from 'zustand/middleware';
import { getNewWord } from '@/api/getNewWord';
import { sendGuess } from '@/api/sendGuess';

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
      wordLength: 5,
      gameState: 'inactive',
      currentRow: 0,
      currentGuess: "",
      letterStates: {},

      startGame: async () => {
        const { resetGame } = get();
        resetGame();
        const response = await getNewWord(1);
        const { wordLength, attemptsLeft, gameId } = response;

        set({
          board: Array.from({ length: attemptsLeft }, () =>
            Array.from({ length: wordLength }, () => ({ letter: '', state: 'empty' }))
          ),
          gameId,
          wordLength,
          gameState: 'playing',
          currentRow: 0,
          letterStates: {},
        });
      },

      makeGuess: async (guessWord: string) => {
        const { gameId, letterStates, board, currentRow } = get();
        if (!gameId || currentRow >= board.length) return;

        const response = await sendGuess(gameId, guessWord);
        const { feedback, result } = response;

        const updatedBoard = [...board];
        updatedBoard[currentRow] = guessWord.split('').map((letter, i) => ({
          letter,
          state: feedback[i],
        }));

        set({
          board: updatedBoard,
          currentRow: currentRow + 1,
          letterStates: updateLetterStates(guessWord, feedback, letterStates),
          gameState: result=="win" ? "win" : result=="lose" ? "lost" : "playing",
        });
      },

      onKeyPress: (key: string) => {
        const { wordLength, board, currentRow, gameState, currentGuess, makeGuess } = get();
        if (gameState !== "playing" || currentRow >= board.length) return;

        if (key === "ENTER") {
          if (currentGuess.length === wordLength) {
            makeGuess(currentGuess);
            set({ currentGuess: "" });
          }
        } else if (key === "BACKSPACE") {
          set ({ currentGuess: currentGuess.slice(0, -1) });
          const index = currentGuess.length - 1;
          if (index >= 0) {
            const newBoard = [...board];
            newBoard[currentRow][index] = { letter: "", state: "empty" };
            set({ board: newBoard });
          }
        } else if (key.match(/^[а-яА-Я]$/) && currentGuess.length < wordLength) {
          const newBoard = [...board];
          newBoard[currentRow][currentGuess.length] = { letter: key, state: "empty" };
          set({
            board: newBoard,
            currentGuess: currentGuess + key,
          });
        }
      },

      resetGame: () => {
        set({
          board: [],
          gameId: null,
          wordLength: 5,
          gameState: 'inactive',
          currentRow: 0,
          currentGuess: "",
          letterStates: {},
        });
      },
    }),
    {
      name: 'game-session-store',
    }
  )
);

export default useGameSessionStore;
