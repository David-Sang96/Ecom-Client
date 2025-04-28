import { Outlet, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";

const RootLayout = () => {
  return (
    <section>
      <div className="max-w-[1500px] mx-auto  min-h-screen flex flex-col justify-between py-2">
        <ScrollRestoration />
        <Toaster
          position="top-center"
          closeButton
          richColors
          duration={3000}
          expand={true}
        />
        <Navbar />
        <div className="px-8 flex-1  ">
          <Outlet />
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default RootLayout;
