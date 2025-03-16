import { compareWords } from "@/lib/gameUtils";
const currentWord = "спорт";
let attemptsLeft = 6;

export const sendGuess = async (gameId: number | null, guessWord: string) => {
  if (!currentWord) {
    throw new Error("Слово не установлено. Запросите новое слово.");
  }

  const feedback = compareWords(guessWord, currentWord); // Сравниваем слова
  const isWin = feedback.every((state) => state === "correct"); // Проверяем победу

  // Обновляем количество оставшихся попыток
  attemptsLeft--;

  return {
    gameId: gameId,
    result: isWin ? "win" : attemptsLeft === 0 ? "lose" : "incorrect",
    feedback,
    correctWord: attemptsLeft === 0 ? currentWord : null,
    attemptsUsed: 6 - attemptsLeft,
  };
};
