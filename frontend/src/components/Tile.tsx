
import { TileState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TileProps {
  letter?: string;
  state: TileState;
}

export default function Tile({ letter, state = "empty" }: TileProps) {
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (letter) {
      setIsBouncing(true);
      const timeout = setTimeout(() => setIsBouncing(false), 150); // Длительность анимации
      return () => clearTimeout(timeout);
    }
  }, [letter]);

  return (
    <div
      className={cn(
        "size-12 sm:size-20 border-2 flex items-center justify-center rounded-md",
        "text-2xl sm:text-4xl font-semibold uppercase transition-all ",
        {
          "border-accent-1": state === "empty",
          "bg-accent-1 text-white border-accent-1": state === "correct",
          "bg-accent-2 text-white border-accent-2": state === "present",
          "bg-accent-3 text-white border-accent-3": state === "absent",
          "transforn -translate-y-1 duration-100 ": isBouncing,
        }
      )}
    >
      {letter}
    </div>
  );
}
