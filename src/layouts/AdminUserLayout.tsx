import { Link, Outlet } from "react-router";

const AdminUserLayout = () => {
  return (
    <section>
      <div className="mb-5 px-2">
        <Link to={"/admin/users"} className="text-xl font-semibold">
          User Management
        </Link>
        <div className="text-muted-foreground text-sm">
          Manange users information
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default AdminUserLayout;
