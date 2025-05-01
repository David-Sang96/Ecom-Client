import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Role = "ADMIN" | "USER";

export enum Status {
  none = "none",
  forget = "forget",
  reset = "reset",
}

type UserInfo = {
  id: null;
  name: string | null;
  email: string | null;
  role: Role | null;
  status: Status;
};

type Actions = {
  setAuth: (value: UserInfo) => void;
  clearAuth: () => void;
};

const initialState: UserInfo = {
  id: null,
  name: null,
  email: null,
  role: null,
  status: Status.none,
};

const useAuthStore = create<UserInfo & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setAuth: ({ id, name, email, role, status }) =>
        set((state) => {
          state.id = id;
          state.name = name;
          state.email = email;
          state.role = role;
          state.status = status;
        }),

      clearAuth: () => set(initialState),
    })),
    {
      name: "auth-credentails",
    }
  )
);

export default useAuthStore;
