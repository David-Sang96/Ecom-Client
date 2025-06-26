import { Link, Outlet } from "react-router";

const AdminOrderLayout = () => {
  return (
    <section>
      <div className="px-2">
        <Link to={"/admin/orders"} className="text-xl font-semibold">
          Orders
        </Link>
        <div className="text-muted-foreground text-sm">View all the orders</div>
      </div>
      <Outlet />
    </section>
  );
};

export default AdminOrderLayout;
