/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import fetchApi from "@/api";
import { queryClient } from "@/api/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Eye,
  LoaderCircle,
  MoreHorizontal,
  Package,
  Package2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { orderStatus, updateStatusSchema } from "./UpdateStatusForm";

const TableActions = ({ order }: { order: any }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof updateStatusSchema>>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: { status: order.status },
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

  const updateOrderMutation = useMutation({
    mutationFn: async (status: string) => {
      const response = await fetchApi.put(`/admin/order/${order._id}`, {
        status,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["orders", "details", data.order._id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["orders", "all"],
      });
      setOpen(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "Something went wrong.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong.");
      }
    },
  });

  const onSubmit = ({ status }: z.infer<typeof updateStatusSchema>) => {
    updateOrderMutation.mutate(status);
  };

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
        <DropdownMenuItem asChild>
          <Link to={`${order._id}`} className="cursor-pointer">
            <Eye className="mr-2 size-4" />
            View details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Package className="mr-2 size-4" />
          Update status
        </DropdownMenuItem>
        {order.paymentStatus === "paid" && (
          <DropdownMenuItem asChild>
            <Link
              to={`voucher-invoice/${order._id}`}
              className="cursor-pointer"
            >
              <Eye className="mr-2 size-4" />
              View Invoice
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={updateOrderMutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {orderStatus.map((status, idx) => (
                          <SelectItem value={status} key={idx}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button variant={"outline"} className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className="cursor-pointer"
                  variant={"outline"}
                  disabled={updateOrderMutation.isPending}
                >
                  {updateOrderMutation.isPending ? (
                    <LoaderCircle className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Package2 className="size-4" aria-hidden="true" />
                  )}
                  {updateOrderMutation.isPending
                    ? "Updating..."
                    : "  Update Status"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
};

export default TableActions;
