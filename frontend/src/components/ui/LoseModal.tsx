import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import  useGameSessionStore  from "@/store/gameSessionStore"; 
import { RotateCcw, Undo2 } from "lucide-react";
import EmojiIcon from "./EmojiIcon";
import { useNavigate } from "react-router";

interface LoseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoseModal = ({ isOpen, onClose }: LoseModalProps) => {
  const startGame = useGameSessionStore((state) => state.startGame); 
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen}>
      <DialogContent className="py-8 px-16 flex flex-col gap-4 sm:gap-8 text-center [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-5xl font-semibold flex items-center justify-center gap-4">
            <EmojiIcon src="/emoji/clown.svg" alt="" />
             Поражение...
             <EmojiIcon src="/emoji/clown.svg" alt="" />
          </DialogTitle>
        </DialogHeader>
        <p className="text-content-3 mb-4">Упс, похоже, что у вас кончились попытки. Попробуйте ещё раз!</p>
        <div className="flex flex-col sm:flex-row justify-between gap-4 ">
          <Button variant="secondary"onClick={() => navigate("/")}>
            <Undo2 className="size-4"/>
             Главное меню
          </Button>
          <Button variant="default" onClick={() => { startGame(); onClose(); }}>
            <RotateCcw className="size-4"/>
             Новое слово
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default LoseModal;