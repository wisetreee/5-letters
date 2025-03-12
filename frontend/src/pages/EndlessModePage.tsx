
import Board from "@/components/Board"
import Keyboard from "@/components/Keyboard";
import LoseModal from "@/components/ui/LoseModal";
import WinModal from "@/components/ui/WinModal";
import useGameSessionStore from "@/store/gameSessionStore";
import { useEffect, useState } from "react";

const EndlessModePage = () => {

  const startGame= useGameSessionStore((state) => state.startGame);
  const gameState= useGameSessionStore((state) => state.gameState);
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [loseModalOpen, setLoseModalOpen] = useState(false);
  useEffect(() => {
    if (gameState === 'inactive') {
      startGame();
    }
    if (gameState === "win") {
      setWinModalOpen(true);
    }
    if (gameState === "lost") {
      setLoseModalOpen(true);
    }
  },[gameState, startGame])
  return (
    <div className="container flex flex-col items-center">
      <Board/>
      <Keyboard/>
      <button onClick={() => startGame()}>Start Game</button>
      <WinModal rewardAmount={25} isOpen={winModalOpen} onClose={() => setWinModalOpen(false)} />
      <LoseModal isOpen={loseModalOpen} onClose={() => setLoseModalOpen(false)} />
    </div>
  )
}

export default EndlessModePage