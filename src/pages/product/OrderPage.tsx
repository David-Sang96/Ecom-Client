import PageHeader from "@/components/PageHeader";
import { Home } from "lucide-react";

const OrderPage = () => {
  return (
    <section>
      <PageHeader
        title="Order History"
        description="Track your orders and view purchase history"
        links={[
          { title: "Home", href: "/", icon: Home },
          { title: "Products", href: "/products" },
          { title: "Order", href: "#" },
        ]}
      />
    </section>
  );
};

export default OrderPage;
