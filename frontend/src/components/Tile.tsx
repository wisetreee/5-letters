import { TileState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TileProps {
  letter?: string;
  state: TileState;
  delay?: number;
}

export default function Tile({ letter, state = "empty", delay = 0 }: TileProps) {
  const [isBouncing, setIsBouncing] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [tileState, setTileState] = useState<TileState>(state);


  useEffect(() => {
    if (letter) {
      setIsBouncing(true);
      const timeout = setTimeout(() => setIsBouncing(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [letter]);


  useEffect(() => {
    if (state !== "empty") {
      setTimeout(() => {
        setIsFlipping(true); 
        setTileState(state); 
        setTimeout(() => {
          setIsFlipping(false);
        }, 500); // Время анимации переворота
      }, delay);
    }
  }, [state, delay]);

  return (
    <div
      className={cn(
        "size-12 sm:size-20 border-2 flex items-center justify-center rounded-md",
        "text-2xl sm:text-4xl font-semibold uppercase transition-all transform",
        "will-change-transform", // Оптимизация анимации
        {
          "border-accent-1": state === "empty",
          "bg-accent-1 text-white border-accent-1": tileState === "correct",
          "bg-accent-2 text-white border-accent-2": tileState === "present",
          "bg-accent-3 text-white border-accent-3": tileState === "absent",
          "-translate-y-1 duration-100": isBouncing,
          "animate-flip": isFlipping,
        }
      )}
    >
      {letter}
    </div>
  );
}