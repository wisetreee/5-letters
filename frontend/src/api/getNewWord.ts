const currentWord = "спорт";

export const getNewWord = async (userId: number) => {
  const attemptsLeft = 6; // Сбрасываем попытки

  return {
    userId: userId,
    gameId: Date.now(), // Уникальный идентификатор сессии
    wordLength: currentWord.length,
    attemptsLeft: attemptsLeft,
  };
};
