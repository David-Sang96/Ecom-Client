import { PlusIcon } from "lucide-react";
import { Link, Outlet } from "react-router";

const AdminProductLayout = () => {
  return (
    <section className="mb-10">
      <div className="mb-10 flex items-center justify-between">
        <div className="">
          <h2 className="text-xl">Products</h2>
          <div className="text-muted-foreground text-sm">
            Manage your product catalog
          </div>
        </div>
        <div>
          <Link
            to={"/admin/products/new"}
            className="bg-accent-foreground flex items-center gap-2 rounded-sm p-2.5 text-white max-sm:gap-1 max-sm:p-2 dark:text-black"
          >
            <PlusIcon className="size-4" />
            <span className="text-sm font-medium">Add Product</span>
          </Link>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default AdminProductLayout;
