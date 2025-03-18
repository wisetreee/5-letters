import { RUSSIAN_KEYBOARD_LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import useGameSessionStore from "@/store/gameSessionStore";
import { CornerDownLeft, Delete } from "lucide-react";
import { useEffect } from "react";

export default function Keyboard() {
  const onKeyPress = useGameSessionStore((state) => state.onKeyPress);
  const letterStates = useGameSessionStore((state) => state.letterStates);
  const wordLength = useGameSessionStore((state) => state.wordLength);
  const currentGuess = useGameSessionStore((state) => state.currentGuess);

  useEffect(() => {
    const onRealKeyboardDown = (e: KeyboardEvent) => onKeyPress(e.key);
    document.addEventListener("keydown", onRealKeyboardDown);

    return () => {
      document.removeEventListener("keydown", onRealKeyboardDown);
    };
  });

  const getKeyStyle = (letter: string) => {
    const state = letterStates[letter];
    return cn(
      "w-6 h-9 sm:size-12 text-sm sm:text-2xl rounded-md font-regular uppercase transition-all duration-300",
      " active:scale-95",
      {
        "border border-2 border-content-1 active:bg-content-1": !state,
        "bg-accent-1 text-white active:none": state === "correct",
        "bg-accent-2 text-white active:none": state === "present",
        "bg-accent-3 text-white": state === "absent",
      },
    );
  };

  return (
    <div className="grid gap-0.5 sm:gap-1">
      {RUSSIAN_KEYBOARD_LAYOUT.map((row, i) => (
        <div key={i} className="flex justify-center gap-0.5 sm:gap-1">
          {row.map((key) => {
            if (key === "ENTER") {
              return (
                <button
                  key={key}
                  disabled={currentGuess.length !== wordLength}
                  onClick={() => onKeyPress(key)}
                  className="size-9 sm:w-24 sm:h-12 flex justify-center items-center disabled:bg-content-1 disabled:text-content-3 bg-accent-1 text-content-2 rounded-md disabled:animate-none  transition-all duration-300 "
                >
                  <CornerDownLeft className="size-3 sm:size-auto" />
                </button>
              );
            }
            if (key === "BACKSPACE") {
              return (
                <button
                  key={key}
                  disabled={currentGuess.length === 0}
                  onClick={() => onKeyPress(key)}
                  className="size-9 sm:w-24 sm:h-12 flex justify-center items-center disabled:bg-content-1 disabled:text-content-3 bg-content-2 text-content-1 rounded-md transition-all duration-300 "
                >
                  <Delete className="size-3 sm:size-auto" />
                </button>
              );
            }

            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={getKeyStyle(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
