import { authData, userData } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: userData | null;
  authData: authData | null;
  setUser: (user: UserState["user"]) => void;
  setAuthData: (authData: UserState["authData"]) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      authData: null,
      setUser: (user) => set({ user }),
      setAuthData: (authData) => set({ authData }),

      clearUser: () =>
        set({
          user: null,
          authData: null,
        }),
    }),

    {
      name: "user-store",
    },
  ),
);
