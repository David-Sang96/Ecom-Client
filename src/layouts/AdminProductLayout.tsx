import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link, Outlet } from "react-router";

const AdminProductLayout = () => {
  return (
    <section className="mb-10">
      <div className="mb-10 flex items-center justify-between">
        <div className="">
          <Link to={"/admin/products"} className="text-xl">
            Products
          </Link>
          <div className="text-muted-foreground text-sm">
            Manage your product catalog
          </div>
        </div>
        <Button asChild variant={"outline"}>
          <Link to={"/admin/products/new"}>
            <PlusIcon className="size-4" />
            <span className="text-sm font-medium">Add Product</span>
          </Link>
        </Button>
      </div>
      <Outlet />
    </section>
  );
};

export default AdminProductLayout;
