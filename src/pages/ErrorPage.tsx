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
import { FaExclamation } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <section className="max-w-[1500px] mx-auto  min-h-screen flex flex-col justify-between pt-2">
      <Navbar />
      <div className="flex-1 mt-24 px-2.5">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <div className="flex flex-col items-center justify-center gap-2 pb-4">
              <div className="border-muted-foreground/70  grid size-15 place-items-center rounded-full border border-dashed ">
                <FaExclamation
                  className="text-muted-foreground/70 size-6"
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-center">Oops!</CardTitle>
            </div>
            <CardDescription className="text-center">
              An error occurs! This page could not be found.
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
    </section>
  );
};

export default ErrorPage;
