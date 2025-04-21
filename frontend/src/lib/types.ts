export type TileState = "empty" | "correct" | "present" | "absent";
export type GameState = "inactive" | "playing" | "win" | "lost";
export type LetterStates = Record<string, TileState>;
export enum userRole {
  "USER",
  "ADMIN",
}

export type userData = {
  user_id: string;
  photo_url: string;
  username: string;
  role?: userRole;
  star_balance?: number;
  rank?: number;
};

export type authData = {
  auth_date: string;
  query_id: string;
};

export type SessionData = {
  id: number;
  attempts_left: number;
  word_length: number;
  created_at: string;
  updated_at: string;
};

export type GameModelData = {
  rewards: {
    daily: number;
    endless: number;
  };
  rank: number;
  star_balance: number;
  season: {
    id: number;
    remaining_time: string;
  };
};

export type LeaderboardData = {
  leaderboard: userData[];
  current_user?: userData;
  total_count?: number;
};
