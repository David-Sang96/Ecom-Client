import { useEffect } from "react";

export const useScrollRestore = (key: string) => {
  useEffect(() => {
    const saved = sessionStorage.getItem(key);
    if (saved) {
      window.scrollTo(0, +saved);
      sessionStorage.removeItem(key);
    }

    return () => {
      sessionStorage.setItem(key, window.scrollY.toString());
    };
  }, [key]);
};
