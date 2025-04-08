export type TileState = "empty" | "correct" | "present" | "absent";
export type GameState = "inactive" | "playing" | "win" | "lost";
export type LetterStates = Record<string, TileState>;
export enum userRole { "USER" , "ADMIN"};

export type userData = {
    user_id: string,
    photo_url: string,
    username: string,
    role: userRole,

}

export type authData = {
    auth_date: string,
    query_id: string,
}

export type SessionData = {
    id: number;
    attempts_left: number;
    word_length: number;
    created_at: string;
    updated_at: string;
}