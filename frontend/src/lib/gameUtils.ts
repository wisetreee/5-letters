import { LetterStates, TileState } from "./types";

export const compareWords = (
  guessWord: string,
  targetWord: string,
): TileState[] => {
  const guessWordArray = guessWord.toLowerCase().split("");
  const targetWordArray = targetWord.toLowerCase().split("");
  const states: TileState[] = Array(guessWordArray.length).fill("absent");

  // Создаём массив-флаг для отслеживания использованных букв в targetWord
  const usedLetters = Array(targetWordArray.length).fill(false);

  //  Сначала отмечаем буквы, которые стоят на своём месте
  for (let i = 0; i < guessWordArray.length; i++) {
    if (guessWordArray[i] === targetWordArray[i]) {
      states[i] = "correct";
      usedLetters[i] = true; // Помечаем букву как использованную
    }
  }

  //  Затем проверяем буквы, которые есть в слове, но не на месте
  for (let i = 0; i < guessWordArray.length; i++) {
    if (states[i] === "correct") continue; // Пропускаем уже отмеченные буквы

    for (let j = 0; j < targetWordArray.length; j++) {
      if (!usedLetters[j] && guessWordArray[i] === targetWordArray[j]) {
        states[i] = "present";
        usedLetters[j] = true; // Помечаем букву как использованную
        break;
      }
    }
  }

  return states;
};

export const updateLetterStates = (
  guessWord: string,
  states: TileState[],
  oldLetterStates: LetterStates,
) => {
  const newStates = { ...oldLetterStates };
  for (let i = 0; i < guessWord.length; i++) {
    const letter = guessWord[i];
    const state = states[i];
    newStates[letter] = state;
  }
  return newStates;
};
