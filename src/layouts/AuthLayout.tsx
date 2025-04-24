import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section className="max-w-[1600px] mx-auto  min-h-screen flex  justify-center items-center py-2">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
