import { Outlet } from "react-router";
import { Toaster } from "sonner";

const AuthLayout = () => {
  return (
    <section className="max-w-md mx-auto min-h-screen">
      <Toaster
        position="top-center"
        closeButton
        richColors
        duration={5000}
        expand={true}
      />
      <Outlet />
    </section>
  );
};

export default AuthLayout;
