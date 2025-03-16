import { TileState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TileProps {
  letter?: string;
  state: TileState;
  delay?: number;
  inactive?: boolean;
}

export default function Tile({
  letter,
  state = "empty",
  delay = 0,
  inactive = false,
}: TileProps) {
  const [isBouncing, setIsBouncing] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [tileState, setTileState] = useState<TileState>(state);

  useEffect(() => {
    if (letter && !inactive) {
      setIsBouncing(true);
      const timeout = setTimeout(() => setIsBouncing(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [letter, inactive]);

  useEffect(() => {
    if (state !== "empty" && !inactive) {
      setTimeout(() => {
        setIsFlipping(true);

        setTimeout(() => {
          setTileState(state);
        }, 500);

        setTimeout(() => {
          setIsFlipping(false);
        }, 1000);
      }, delay);
    }
  }, [state, delay, inactive]);

  return (
    <div
      className={cn(
        "size-12 sm:size-20 border-2 flex items-center justify-center rounded-md",
        "text-2xl sm:text-4xl font-semibold uppercase transition-all transform",
        "will-change-transform border-accent-1", // Оптимизация анимации
        {
          "bg-accent-1 text-white border-accent-1": tileState === "correct",
          "bg-accent-2 text-white border-accent-2": tileState === "present",
          "bg-accent-3 text-white border-accent-3": tileState === "absent",
          "-translate-y-1 duration-100": isBouncing,
          "animate-flip": isFlipping,
        },
      )}
    >
      {letter}
    </div>
  );
}
