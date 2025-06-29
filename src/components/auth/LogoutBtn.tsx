import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { TooltipHover } from "../user/Tooltip";

type LogoutBtnProp = {
  isNav: boolean;
};

const LogoutBtn = ({ isNav = true }: LogoutBtnProp) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data && fetcher.data.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form
      method="POST"
      action={`/auth/logout?redirectTo=${encodeURIComponent(
        window.location.pathname,
      )}`}
      className="cursor-pointer px-2 py-1"
    >
      {isNav ? (
        <button
          type="submit"
          className="flex w-full cursor-pointer justify-between text-sm"
        >
          Logout
          <LogOut aria-hidden="true" size={18} />
        </button>
      ) : (
        <TooltipHover content="logout">
          <Button className="cursor-pointer" size={"sm"} aria-label="log out">
            <LogOut className="size-4" />
          </Button>
        </TooltipHover>
      )}
    </fetcher.Form>
  );
};

export default LogoutBtn;
