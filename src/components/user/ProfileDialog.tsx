import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore, { Status } from "@/store/authStore";
import {
  resetAccountSchema,
  resetPasswordSchema,
} from "@/types/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ellipsis, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "../auth/PasswordInput";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import ProfileImageUploader from "./ProfileImageUploader";
import { TooltipHover } from "./Tooltip";

const ProfileDialog = () => {
  const [open, setOpen] = useState(false);
  const { name: username, email: userEmail } = useAuthStore();
  const clearAuth = useAuthStore((store) => store.clearAuth);
  const setUser = useAuthStore((store) => store.setAuth);
  const submit = useSubmit();
  const navigator = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const isSubmitting = navigator.state === "submitting";

  const openChange = () => setOpen((prev) => !prev);

  const passwordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confrimPassword: "",
    },
  });
  const { isDirty: passwordFormDirty } = passwordForm.formState;

  const accountForm = useForm<z.infer<typeof resetAccountSchema>>({
    resolver: zodResolver(resetAccountSchema),
    defaultValues: {
      name: username || "",
      email: userEmail || "",
    },
  });
  const { isDirty: accountFormDirty } = accountForm.formState;

  useEffect(() => {
    if (!actionData) return;
    if (actionData.success && actionData.type === "reset-password") {
      toast.success(actionData.message);
      clearAuth();
      navigate("/auth/login", { replace: true });
    } else if (actionData.success && actionData.type === "account-update") {
      toast.success(actionData.message);
      const userInfo = {
        ...actionData.user,
        status: Status.none,
      };
      setUser(userInfo);
      openChange();
      accountForm.setValue("name", userInfo.name, { shouldDirty: true });
      accountForm.setValue("email", userInfo.email, { shouldDirty: true });
    } else {
      toast.error(actionData.message);
      passwordForm.reset();
      accountForm.reset();
      passwordForm.setValue("password", "", { shouldDirty: true });
      accountForm.setValue("name", "", { shouldDirty: true });
      accountForm.setValue("email", "", { shouldDirty: true });
    }
  }, [actionData, navigate, clearAuth, setUser, passwordForm, accountForm]);

  const passwordFormSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    submit(values, { method: "POST", action: "/me" });
  };

  const accountFormSubmit = (values: z.infer<typeof resetAccountSchema>) => {
    submit(values, { method: "POST", action: "/me" });
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger>
        <TooltipHover content="setting">
          <Button className="cursor-pointer" size={"sm"} aria-label="setting">
            <Ellipsis className="size-4" />
          </Button>
        </TooltipHover>
      </DialogTrigger>
      <DialogContent className="top-[40%] max-md:p-3 max-md:py-4">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account" className="cursor-pointer">
              Account
            </TabsTrigger>
            <TabsTrigger value="password" className="cursor-pointer">
              Password
            </TabsTrigger>
            <TabsTrigger
              value="profile-image-uploader"
              className="cursor-pointer"
            >
              Profile Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click update when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...accountForm}>
                  <form
                    onSubmit={accountForm.handleSubmit(accountFormSubmit)}
                    className="space-y-4 md:space-y-6"
                  >
                    <FormField
                      control={accountForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormLabel className="w-10">Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoFocus
                                className="max-md:text-sm"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-end" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={accountForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormLabel className="w-10">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                {...field}
                                className="max-md:text-sm"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-end" />
                        </FormItem>
                      )}
                    />

                    <div className="text-end">
                      <Button
                        type="submit"
                        className="w-[30%] cursor-pointer text-end disabled:cursor-not-allowed"
                        disabled={isSubmitting || !accountFormDirty}
                      >
                        {isSubmitting && (
                          <LoaderCircle
                            className="animate-spin"
                            aria-hidden="true"
                          />
                        )}
                        {isSubmitting ? "Updating..." : "Update"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(passwordFormSubmit)}
                    className="space-y-4 md:space-y-6"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormLabel className="w-20">
                              Current Password
                            </FormLabel>
                            <FormControl>
                              <PasswordInput
                                {...field}
                                placeholder="*********"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-end" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormLabel className="w-20">New Password</FormLabel>
                            <FormControl>
                              <PasswordInput
                                {...field}
                                placeholder="*********"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-end" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confrimPassword"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormLabel className="w-20">
                              Confirm Password
                            </FormLabel>
                            <FormControl>
                              <PasswordInput
                                {...field}
                                placeholder="*********"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-end" />
                        </FormItem>
                      )}
                    />
                    <div className="text-end">
                      <Button
                        type="submit"
                        className="w-[30%] cursor-pointer text-end disabled:cursor-not-allowed"
                        disabled={isSubmitting || !passwordFormDirty}
                      >
                        {isSubmitting && (
                          <LoaderCircle
                            className="animate-spin"
                            aria-hidden="true"
                          />
                        )}
                        {isSubmitting ? "Updating..." : "Update"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="profile-image-uploader">
            <ProfileImageUploader setOpen={setOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
