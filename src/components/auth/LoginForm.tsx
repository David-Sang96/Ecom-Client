import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
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
import { loginSchema } from "@/types/schema/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import PasswordInput from "./PasswordInput";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const submit = useSubmit();
  const actionData = useActionData();
  const navigator = useNavigation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSubmitting = navigator.state === "submitting";
  const redirectTo = searchParams.get("redirectTo") || "/";
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const date = new Date();
  const formattedDate = format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a");

  useEffect(() => {
    if (!actionData) return;
    if (actionData.success) {
      toast.success(actionData.message);
      navigate(decodeURIComponent(redirectTo), {
        replace: true,
      });
    } else {
      if (actionData.message?.includes("verify")) {
        toast.error(actionData.message, {
          description: formattedDate,
          action: {
            label: "Open Gmail",
            onClick() {
              window.open("https://mail.google.com", "_blank");
            },
          },
        });
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData, navigate, formattedDate, redirectTo]);

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    submit(values, {
      method: "POST",
      action: `/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to={"/auth/forget-password"}
                        className="text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
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

              <div className="space-y-3 pt-3">
                <Button
                  type="submit"
                  className="w-full cursor-pointer disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <LoaderCircle className="animate-spin" aria-hidden="true" />
                  )}
                  {isSubmitting ? "Logging in..." : "Log in"}
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
                Don&apos;t have an account?{" "}
                <Link to="/auth" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
