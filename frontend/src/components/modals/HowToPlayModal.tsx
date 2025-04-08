import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import Tile from "../Tile";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlayModal = ({ isOpen, onClose }: HowToPlayModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="py-8 flex flex-col gap-4 sm:gap-8 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-start">
            Как играть?
          </DialogTitle>
        </DialogHeader>
        <p className="text-content-3 mb-4">
          У вас есть несколько попыток, количество которых зависит от длины
          слова. После каждой попытки цвета букв меняются. Вот что они означают:
        </p>
        <div className="flex gap-1 sm:gap-2">
          <Tile letter="А" inactive={true} state="present" />
          <Tile letter="Р" inactive={true} state="present" />
          <Tile letter="Б" inactive={true} state="correct" />
          <Tile letter="У" inactive={true} state="absent" />
          <Tile letter="З" inactive={true} state="absent" />
        </div>
        <p className="text-content-3 mb-4">
          Буквы “У” и “З” серые. Это означает, что их нет в слове. Буквы “Р” и
          “А” жёлтые — они есть в этом слове, но находятся не на своём месте.
          Буква “Б” зелёная — она есть в этом слове и находится на своём месте.
        </p>
        <div className="flex gap-1 sm:gap-2">
          <Tile letter="К" inactive={true} state="correct" />
          <Tile letter="О" inactive={true} state="correct" />
          <Tile letter="Б" inactive={true} state="correct" />
          <Tile letter="Р" inactive={true} state="correct" />
          <Tile letter="А" inactive={true} state="correct" />
        </div>
        <p className="text-content-3 mb-4">
          Когда вы угадаете слово, все буквы окрасятся в зелёный цвет. Буквы в
          словах могут повторяться, а буква “Ё” заменена буквой “Е”.
        </p>
        <div className="flex items-center justify-center">
          <Button variant="default" onClick={() => onClose()}>
            Отлично, теперь пусти меня играть!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default HowToPlayModal;
