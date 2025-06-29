/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchApi from "@/api";
import { oneUserQuery, queryClient } from "@/api/query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useAuthStore from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const userUpdateFormSchema = z.object({
  userId: z
    .string()
    .trim()
    .nonempty("User ID is required")
    .regex(/^[a-f\d]{24}$/i, "Invalid User ID format"),
  name: z
    .string()
    .trim()
    .min(5, { message: "Name must be at least 5 characters" })
    .max(50, { message: "Name must not be longer than 50 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),
  role: z
    .string()
    .min(1, "Role is required")
    .refine(
      (val) => ["ADMIN", "USER"].includes(val),
      "Invalid role. Must be Admin or user",
    ),
  isEmailVerified: z.boolean(),
  ban: z.boolean(),
  reason: z.string().trim().optional(),
});

const UserEditPage = () => {
  const setNameAndEmail = useAuthStore((store) => store.setNameAndEmail);
  const { userId } = useLoaderData();
  const { data } = useSuspenseQuery(oneUserQuery(userId));
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof userUpdateFormSchema>>({
    resolver: zodResolver(userUpdateFormSchema),
    defaultValues: {
      email: data.user.email,
      ban: Boolean(data.user.ban.isBanned),
      isEmailVerified: Boolean(data.user.isEmailVerified),
      name: data.user.name,
      role: data.user.role,
      userId,
      reason: data.user.ban.reason,
    },
  });

  const userEmail = useAuthStore((store) => store.email);
  const userID = useAuthStore((store) => store.id);
  const username = useAuthStore((store) => store.name);

  const isCurrentLoginUser =
    data.user.name === username &&
    userEmail === data.user.email &&
    data.user._id === userID;

  const updateUserMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetchApi.put("/admin/user", data);
      return response.data;
    },
    onSuccess: async (data) => {
      setNameAndEmail(data.user.name, data.user.email);
      toast.success(data.message);
      navigate("/admin/users");
      await queryClient.invalidateQueries({
        queryKey: ["users", "all"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["users", "details", userId],
      });
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "something went wrong";
        toast.error(errorMessage);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof userUpdateFormSchema>) => {
    updateUserMutation.mutate(values);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Basic Information</CardTitle>
                <CardDescription>
                  Update the user's basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-1">Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-1">Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pb-1">Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="USER">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Account Settings</CardTitle>
                <CardDescription>
                  Manage account verification and restrictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isEmailVerified"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Email Verified</FormLabel>
                          <FormDescription>
                            Mark the user's email as verified
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isCurrentLoginUser}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ban"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Banned</FormLabel>
                          <FormDescription>
                            Restrict user access to the platform
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-readonly
                            disabled={isCurrentLoginUser}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 mb-4 flex justify-end">
            <Button
              className="cursor-pointer max-sm:w-full"
              variant={form.formState.isDirty ? "outline" : "secondary"}
              disabled={updateUserMutation.isPending || !form.formState.isDirty}
            >
              {updateUserMutation.isPending ? (
                <LoaderCircle className="animate-spin" aria-hidden="true" />
              ) : (
                <Save className="size-4" aria-hidden="true" />
              )}
              {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default UserEditPage;
