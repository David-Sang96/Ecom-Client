import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type FavoriteItem = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  categories: string[];
  image: string;
  subCategories: string[];
};

type Favorite = {
  favoriteItems: FavoriteItem[];
};

type Actions = {
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  addOrRemove: (item: FavoriteItem) => void;
  clear: () => void;
};

const initialState: Favorite = {
  favoriteItems: [],
};

export const useFavoriteStore = create<Favorite & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      addOrRemove: (favItem) =>
        set((state) => {
          const isExisting = state.favoriteItems.find(
            (item) => item._id === favItem._id,
          );
          if (isExisting) {
            state.favoriteItems = state.favoriteItems.filter(
              (item) => item._id !== isExisting._id,
            );
          } else {
            state.favoriteItems.push(favItem);
          }
        }),
      addItem: (newItem) =>
        set((state) => {
          state.favoriteItems.push(newItem);
        }),
      removeItem: (_id) =>
        set((state) => {
          state.favoriteItems = state.favoriteItems.filter(
            (item) => item._id !== _id,
          );
        }),
      clear: () => set({ ...initialState }),
    })),
    {
      name: "favorite-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
