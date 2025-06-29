import fetchApi from "@/api";
import { queryClient } from "@/api/query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

type DeleteUserModalProp = {
  open: boolean;
  setOpen: (value: boolean) => void;
  userId: string;
};

const DeleteUserModal = ({ open, setOpen, userId }: DeleteUserModalProp) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetchApi.delete(`/admin/user/${userId}`);
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["users", "all"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "something went wrong";
        toast.error(errorMessage);
      }
      toast.error("something went wrong");
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = "auto";
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      observer.disconnect();
      document.body.removeAttribute("style");
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete user data
            and remove from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
              disabled={isPending}
            >
              Close
            </Button>
          </DialogClose>
          <Button
            className="cursor-pointer bg-red-700 text-white hover:bg-red-600 hover:text-white"
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending && (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            )}
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
