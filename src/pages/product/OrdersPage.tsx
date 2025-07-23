import { allUserOrdersQuery } from "@/api/query";
import PageHeader from "@/components/PageHeader";
import OrderCard from "@/components/product/OrderCard";
import { Button } from "@/components/ui/button";
import { OrderDetailType } from "@/types/order";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BoxIcon, Home } from "lucide-react";
import { Link } from "react-router";

const OrdersPage = () => {
  const { data } = useSuspenseQuery(allUserOrdersQuery());
  const orders = data.orders;

  return (
    <section>
      <PageHeader
        title="My Orders"
        description={`${orders.length} orders`}
        links={[
          { title: "Home", href: "/", icon: Home },
          { title: "Products", href: "/products" },
          { title: "Orders", href: "#" },
        ]}
      />
      {orders.length ? (
        <div className="grid gap-3 xl:grid-cols-2">
          {orders.map((order: OrderDetailType) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <div className="mx-auto flex max-w-xl flex-col items-center space-y-2.5">
            <BoxIcon className="self-center" size={50} />

            <div className="text-2xl font-semibold">No orders yet</div>
            <div className="text-muted-foreground">
              Your order history will appear here once you make your first
              purchasee
            </div>
            <Link to="/products" className="self-center">
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-fit cursor-pointer py-4"
              >
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrdersPage;
