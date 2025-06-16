import { allOrdersQuery } from "@/api/query";
import { columns } from "@/components/admin/orders/column";
import { DataTable } from "@/components/admin/orders/DataTable";
import { useSuspenseQuery } from "@tanstack/react-query";

const OrdersPage = () => {
  const { data } = useSuspenseQuery(allOrdersQuery());
  const ordersData = data.orders;

  return <DataTable columns={columns} data={ordersData} />;
};

export default OrdersPage;
