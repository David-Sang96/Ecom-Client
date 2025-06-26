/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchApi from "@/api";
import { queryClient } from "@/api/query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Edit2Icon,
  LoaderCircle,
  MoreHorizontal,
  TrashIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const TableActions = ({ payment }: { payment: any }) => {
  const [open, setOpen] = useState(false);

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

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetchApi.delete(`/admin/product/${payment._id}`);
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["products", "all"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["products", "details", payment._id],
      });
      setOpen(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "something went wrong";
        toast.error(errorMessage);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(payment._id)}
          className="cursor-pointer"
        >
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link to={`${payment._id}`}>
          <DropdownMenuItem className="flex cursor-pointer justify-between text-green-500 focus:text-green-400">
            Update
            <Edit2Icon />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="flex cursor-pointer justify-between text-red-500 focus:text-red-400"
          onClick={() => setOpen(true)}
        >
          Delete
          <TrashIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending} className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className="cursor-pointer bg-red-500 text-white hover:bg-red-400"
                onClick={() => mutate()}
                disabled={isPending}
              >
                {isPending && (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                )}
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};

export default TableActions;
