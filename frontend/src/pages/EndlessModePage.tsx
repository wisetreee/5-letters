import Board from "@/components/Board";
import Keyboard from "@/components/Keyboard";
import LoseModal from "@/components/modals/LoseModal";
import WinModal from "@/components/modals/WinModal";
import useGameSessionStore from "@/store/gameSessionStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useRef, useState } from "react";

const EndlessModePage = () => {
  const startGame = useGameSessionStore((state) => state.startGame);
  const gameState = useGameSessionStore((state) => state.gameState);
  const reward = useGameSessionStore((state) => state.reward);
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [loseModalOpen, setLoseModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (gameState === "inactive" && user && !hasStarted.current) {
      hasStarted.current = true;
      startGame();
    }
  }, [gameState, user, startGame]);

  useEffect(() => {
    if (gameState === "win") {
      setTimeout(() => setWinModalOpen(true), 2000);
    } else if (gameState === "lost") {
      setTimeout(() => setLoseModalOpen(true), 2000);
    }
  }, [gameState]);

  return (
    <div className="container flex flex-col items-center">
      <Board />
      <Keyboard />
      <button onClick={() => startGame()}>Start Game</button>
      <WinModal
        rewardAmount={reward}
        isOpen={winModalOpen}
        onClose={() => setWinModalOpen(false)}
      />
      <LoseModal
        isOpen={loseModalOpen}
        onClose={() => setLoseModalOpen(false)}
      />
    </div>
  );
};

export default EndlessModePage;
