import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section className="max-w-md mx-auto min-h-screen p-2 pt-20">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
