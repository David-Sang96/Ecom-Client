import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/types/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import AdminDialog from "./AdminDialog";
import PasswordInput from "./PasswordInput";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const submit = useSubmit();
  const navigator = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigator.state === "submitting";
  const actionData = useActionData();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "user",
      secret: "",
    },
  });

  const date = new Date();
  const formattedDate = format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a");

  useEffect(() => {
    if (!actionData) return;
    if (actionData?.success) {
      toast(actionData?.message, {
        description: formattedDate,
        action: {
          label: "Open Gmail",
          onClick() {
            window.open("https://mail.google.com", "_blank");
          },
        },
      });
      navigate("/auth/login");
    } else {
      toast.error(actionData?.message);
    }
  }, [actionData, navigate, formattedDate]);

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    if (values.secret) values.role = "admin";
    submit(values, { method: "POST", action: "." });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up new account</CardTitle>
          <CardDescription>
            Enter your email below to create new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="JohnDoe"
                        {...field}
                        disabled={isSubmitting}
                      />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="foe@example.com..."
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="*********"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm flex justify-between items-center ">
                <AdminDialog />
                <Link
                  to={"/auth/forget-password"}
                  className=" underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className=" space-y-3">
                <Button
                  type="submit"
                  className="w-full cursor-pointer disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <LoaderCircle className="animate-spin" aria-hidden="true" />
                  )}
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full cursor-pointer"
                >
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/auth/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
