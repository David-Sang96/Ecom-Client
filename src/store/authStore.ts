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

export type UserInfo = {
  id: null;
  name: string | null;
  email: string | null;
  image: { url: string; public_id: string } | null;
  role: Role | null;
  isEmailVerified: boolean | null;
  accStatus: AccountStatus | null;
  updatedAt: Date | null;
  status: Status;
  isBanned?: boolean;
  isDeactivated?: boolean;
};

type Actions = {
  setAuth: (value: UserInfo) => void;
  clearAuth: () => void;
  setBanned: (value: boolean) => void;
  setNameAndEmail: (name: string, email: string) => void;
};

const initialState: UserInfo = {
  id: null,
  name: null,
  email: null,
  image: null,
  role: null,
  accStatus: null,
  isEmailVerified: null,
  updatedAt: null,
  status: Status.none,
  isBanned: false,
  isDeactivated: false,
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
        accStatus,
        image,
        isEmailVerified,
        updatedAt,
        isBanned,
        isDeactivated,
      }) =>
        set((state) => {
          state.id = id;
          state.name = name;
          state.email = email;
          state.image = image;
          state.role = role;
          state.accStatus = accStatus;
          state.isEmailVerified = isEmailVerified;
          state.updatedAt = updatedAt;
          state.status = status;
          state.isBanned = isBanned;
          state.isDeactivated = isDeactivated;
        }),

      clearAuth: () => set(initialState),
      setBanned: (val) => set({ isBanned: val }),
      setNameAndEmail: (name, email) => set({ name, email }),
    })),
    {
      name: "auth-credentails",
    },
  ),
);

export default useAuthStore;
