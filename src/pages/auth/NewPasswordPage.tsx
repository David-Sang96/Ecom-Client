import PasswordInput from "@/components/auth/PasswordInput";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { newPasswordSchema } from "@/types/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const NewPasswordPage = () => {
  const actionData = useActionData();
  const submit = useSubmit();
  const navigator = useNavigation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const isSubmitting = navigator.state === "submitting";
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      email,
      token,
      password: "",
      confrimPassword: "",
    },
  });

  useEffect(() => {
    if (!actionData) return;
    if (actionData.success) {
      toast.success(actionData.message);
      navigate("/auth/login", { replace: true });
    } else {
      toast.error(actionData.message);
    }
  }, [actionData, navigate]);

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    submit(values, { method: "POST", action: "/auth/new-password" });
  };

  return (
    <section className="p-2 pt-40">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Enter a new password below to change your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confrimPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                )}
                {isSubmitting ? "Confriming..." : "Confirm"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewPasswordPage;
