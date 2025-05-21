import ProgressBar from "@/components/ProgressBar";
import { Outlet, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";

const RootLayout = () => {
  return (
    <section>
      <div className="container mx-auto flex min-h-screen flex-col justify-between py-2">
        <ScrollRestoration />
        <Toaster
          position="top-center"
          closeButton
          richColors
          duration={3000}
          expand={true}
        />
        <ProgressBar />
        <Navbar />
        <div className="flex-1 px-2 py-8 md:px-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default RootLayout;
