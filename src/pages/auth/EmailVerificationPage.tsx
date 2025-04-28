import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link, useLoaderData } from "react-router";

const EmailVerificationPage = () => {
  const loaderData = useLoaderData() as { message: string; success: boolean };

  return (
    <section className="flex flex-col items-center min-h-screen pt-52">
      <Card className="w-full">
        <CardHeader className="text-center">
          <h1
            className={cn(
              "text-2xl font-bold",
              loaderData.success ? " text-green-500" : "text-red-500"
            )}
          >
            Email Verification {loaderData.success ? "Success" : "Failed"}
          </h1>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg font-medium pb-2">{loaderData.message}</p>
          <div>
            {loaderData.success ? (
              <Button asChild variant={"outline"}>
                <Link to={"/auth/login"}>Log in to your account</Link>
              </Button>
            ) : (
              <Button asChild variant={"outline"}>
                <Link to={"/auth"}>Register again</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default EmailVerificationPage;
