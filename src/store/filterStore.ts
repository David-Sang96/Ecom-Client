import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type FilterState = {
  categories: string[];
};

type Actions = {
  setFilterState: (value: string[]) => void;
  clear: () => void;
};

const initialState: FilterState = { categories: [] };

export const useFilterStore = create<Actions & FilterState>()(
  persist(
    immer((set) => ({
      ...initialState,
      setFilterState: (categories) =>
        set((state) => {
          state.categories = categories;
        }),
      clear: () => set(initialState),
    })),
    { name: "filter-state", storage: createJSONStorage(() => sessionStorage) },
  ),
);
