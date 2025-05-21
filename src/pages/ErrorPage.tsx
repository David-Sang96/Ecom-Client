import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/store/authStore";
import { FaExclamation } from "react-icons/fa";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const userInfo = useAuthStore();
  const error = useRouteError();

  let message = "";
  if (isRouteErrorResponse(error)) {
    message = error.statusText || error.data;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <section className="container mx-auto flex min-h-screen flex-col justify-between pt-2">
      {userInfo.id ? (
        <>
          <Navbar />
          <div className="mt-24 flex-1 px-2.5">
            <Card className="mx-auto max-w-lg">
              <CardHeader>
                <div className="flex flex-col items-center justify-center gap-2 pb-4">
                  <div className="border-muted-foreground/70 grid size-15 place-items-center rounded-full border border-dashed">
                    <FaExclamation
                      className="text-muted-foreground/70 size-6"
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle className="text-center text-2xl">Oops!</CardTitle>
                </div>
                <CardDescription className="text-center">
                  <div className="space-y-3">
                    <p>An error occurs! This page could not be found.</p>
                    <p> {message}</p>
                  </div>
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-center">
                <Button asChild variant={"outline"}>
                  <Link to={"/"}>Go back home</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Footer />
        </>
      ) : (
        <div className="mt-32 flex-1 px-2.5">
          <Card className="mx-auto max-w-lg">
            <CardHeader>
              <div className="flex flex-col items-center justify-center gap-2 pb-4">
                <div className="border-muted-foreground/70 grid size-15 place-items-center rounded-full border border-dashed">
                  <FaExclamation
                    className="text-muted-foreground/70 size-6"
                    aria-hidden="true"
                  />
                </div>
                <CardTitle className="text-center">Oops!</CardTitle>
              </div>
              <CardDescription className="text-center">
                {message}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-center">
              <Button asChild variant={"outline"}>
                <Link to={"/auth/login"}>Go back to login</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </section>
  );
};

export default ErrorPage;
