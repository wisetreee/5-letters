import Board from "@/components/Board";
import Keyboard from "@/components/Keyboard";
import LoseModal from "@/components/modals/LoseModal";
import WinModal from "@/components/modals/WinModal";
import useGameSessionStore from "@/store/gameSessionStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

const EndlessModePage = () => {
  const startGame = useGameSessionStore((state) => state.startGame);
  const gameState = useGameSessionStore((state) => state.gameState);
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [loseModalOpen, setLoseModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (gameState === "inactive" && user) {
      console.log("launch yopta");
      startGame(user);
    }
    if (gameState === "win") {
      setTimeout(() => setWinModalOpen(true), 2000);
    }
    if (gameState === "lost") {
      setTimeout(() => setLoseModalOpen(true), 2000);
    }
  }, [gameState, startGame]);

  return (
    <div className="container flex flex-col items-center">
      <Board />
      <Keyboard />
      { user&& <button onClick={() => startGame(user)}>Start Game</button> }
      <WinModal
        rewardAmount={25}
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
