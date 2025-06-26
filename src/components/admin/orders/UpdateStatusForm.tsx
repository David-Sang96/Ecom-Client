/* eslint-disable react-refresh/only-export-components */
import fetchApi from "@/api";
import { queryClient } from "@/api/query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { OrderStatus } from "@/types/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle, Package2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export const updateStatusSchema = z.object({
  status: z.string({ message: "Status is required" }),
});

type UpdateStatusFormProps = {
  status: OrderStatus;
  orderId: string;
};

export const orderStatus: OrderStatus[] = [
  "cancelled",
  "completed",
  "failed",
  "pending",
  "processing",
  "shipped",
];

const UpdateStatusForm = ({ status, orderId }: UpdateStatusFormProps) => {
  const form = useForm<z.infer<typeof updateStatusSchema>>({
    resolver: zodResolver(updateStatusSchema),
    defaultValues: { status },
  });
  const navigate = useNavigate();

  const updateOrderMutation = useMutation({
    mutationFn: async (status: string) => {
      const response = await fetchApi.put(`/admin/order/${orderId}`, {
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
      navigate("/admin/orders");
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
    <Card>
      <CardHeader>
        <CardTitle>Update Status</CardTitle>
      </CardHeader>
      <CardContent>
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
            <div className="mt-8 mb-4">
              <Button
                className="w-full cursor-pointer"
                variant={"outline"}
                disabled={updateOrderMutation.isPending}
              >
                {updateOrderMutation.isPending ? (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                ) : (
                  <Package2 className="size-4" aria-hidden="true" />
                )}
                {updateOrderMutation.isPending
                  ? "Updating Status..."
                  : "  Update Order Status"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateStatusForm;
