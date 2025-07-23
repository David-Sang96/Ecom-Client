import useAuthStore from "@/store/authStore";
import { ReactNode } from "react";

export function AuthHydrationGuard({ children }: { children: ReactNode }) {
  const hasHydrated = useAuthStore.persist.hasHydrated();

  if (!hasHydrated) return null;

  return <>{children}</>;
}
