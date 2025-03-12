
import { TileState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TileProps {
  letter?: string;
  state: TileState;
}

export default function Tile({ letter, state = "empty" }: TileProps) {
  return (
    <div
      className={cn(
        "size-12 sm:size-20 border-2 flex items-center justify-center rounded-md",
        "text-2xl sm:text-4xl font-semibold uppercase transition-colors",
        {
          "border-accent-1": state === "empty",
          "bg-accent-1 text-white border-accent-1": state === "correct",
          "bg-accent-2 text-white border-accent-2": state === "present",
          "bg-accent-3 text-white border-accent-3": state === "absent",
        }
      )}
    >
      {letter}
    </div>
  );
}
