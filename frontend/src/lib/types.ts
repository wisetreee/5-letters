export type TileState = "empty" | "correct" | "present" | "absent";
export type GameState = "inactive" | "playing" | "win" | "lost";
export type LetterStates = Record<string, TileState>;
