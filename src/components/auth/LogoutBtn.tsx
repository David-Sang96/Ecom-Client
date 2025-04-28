import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

const LogoutBtn = () => {
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
        window.location.pathname
      )}`}
      className="px-2 py-1 cursor-pointer"
    >
      <button
        type="submit"
        className="cursor-pointer text-sm flex justify-between w-full"
      >
        Logout
        <LogOut aria-hidden="true" size={18} />
      </button>
    </fetcher.Form>
  );
};

export default LogoutBtn;
