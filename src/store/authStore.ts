import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Role = "ADMIN" | "USER";

export enum Status {
  none = "none",
  forget = "forget",
  reset = "reset",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  FREEZE = "FREEZE",
}

type UserInfo = {
  id: null;
  name: string | null;
  email: string | null;
  image: string | null;
  role: Role | null;
  isEmailVerified: boolean | null;
  accountStatus: AccountStatus | null;
  updatedAt: Date | null;
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
  image: null,
  role: null,
  accountStatus: null,
  isEmailVerified: null,
  updatedAt: null,
  status: Status.none,
};

const useAuthStore = create<UserInfo & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setAuth: ({
        id,
        name,
        email,
        role,
        status,
        accountStatus,
        image,
        isEmailVerified,
        updatedAt,
      }) =>
        set((state) => {
          state.id = id;
          state.name = name;
          state.email = email;
          state.image = image;
          state.role = role;
          state.accountStatus = accountStatus;
          state.isEmailVerified = isEmailVerified;
          state.updatedAt = updatedAt;
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
