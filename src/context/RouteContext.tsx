/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router";

type RouteContextType = {
  previousPath: string | null;
};

export const RouteContext = createContext<RouteContextType | undefined>(
  undefined,
);

export const PreviousRouteProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState<string | null>(null);

  useEffect(() => {
    const storedCurrentUrl = sessionStorage.getItem("currentUrl");
    if (storedCurrentUrl && storedCurrentUrl !== location.pathname) {
      setPrevPath(storedCurrentUrl);
    }

    sessionStorage.setItem("currentUrl", location.pathname);
  }, [location.pathname]);
  return (
    <RouteContext.Provider value={{ previousPath: prevPath }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error(
      "useRouteContext must be used within PreviousRouteProvider",
    );
  }
  return context.previousPath;
};
