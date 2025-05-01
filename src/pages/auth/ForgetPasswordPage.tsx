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
import { Input } from "@/components/ui/input";
import { forgetPasswordEmailSchema } from "@/types/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const ForgetPasswordPage = () => {
  const submit = useSubmit();
  const actionData = useActionData();
  const form = useForm<z.infer<typeof forgetPasswordEmailSchema>>({
    resolver: zodResolver(forgetPasswordEmailSchema),
    defaultValues: { email: "" },
  });
  const navigator = useNavigation();
  const isSubmitting = navigator.state === "submitting";

  const date = new Date();
  const formattedDate = format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a");

  useEffect(() => {
    if (!actionData) return;
    if (actionData?.success) {
      form.reset();
      toast.success(actionData?.message, {
        description: formattedDate,
        action: {
          label: "Open Gmail",
          onClick() {
            window.open("https://mail.google.com", "_blank");
          },
        },
      });
    } else {
      toast.error(actionData?.message);
    }
  }, [actionData, formattedDate, form]);

  const onSubmit = (value: z.infer<typeof forgetPasswordEmailSchema>) => {
    submit(value, { method: "POST", action: "/auth/forget-password" });
  };

  return (
    <section className="p-2 pt-40">
      <Card>
        <CardHeader>
          <CardTitle>Forget Password</CardTitle>
          <CardDescription>
            Enter your email address below and we’ll send you a link to reset
            your password.
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
                    <FormLabel className="flex justify-between items-center">
                      <div>Email</div>
                      <Button variant={"link"} asChild>
                        <Link to={"/auth/login"}>Back to login</Link>
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com..."
                        {...field}
                      />
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
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgetPasswordPage;
