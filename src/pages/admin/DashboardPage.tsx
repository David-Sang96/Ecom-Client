/* eslint-disable @typescript-eslint/no-explicit-any */
import { allOrdersQuery, allProductsQuery, allUsersQuery } from "@/api/query";
import { Chart } from "@/components/admin/dashboard/Chart";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import Survey from "@/components/admin/dashboard/Survey";
import { formatPrice } from "@/lib/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const DashboardPage = () => {
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useQuery(allProductsQuery());
  const {
    data: orderData,
    isLoading: isOrderLoading,
    isError: isOrderError,
    error: orderError,
  } = useQuery(allOrdersQuery());
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery(allUsersQuery());

  if (isProductLoading || isOrderLoading || isUserLoading)
    return (
      <div className="mt-20 flex flex-col items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 font-medium text-blue-600">
          Loading data, please wait...
        </p>
      </div>
    );

  if (isProductError || isOrderError || isUserError)
    return (
      <p className="text-center">
        {productError?.message ||
          orderError?.message ||
          userError?.message ||
          "Something went wrong"}
      </p>
    );

  const totalRevenue = orderData.orders.reduce(
    (item: number, cur: any) => item + cur.totalPrice,
    0,
  );

  return (
    <section className="mb-6 space-y-6">
      <div className="text-muted-foreground">
        Welcome back! Here's what's happening with your store.
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-md border bg-yellow-50 p-6 shadow-md">
          <div className="flex items-center justify-between pb-2">
            <div className="text-black">Total Products</div>
            <Package className="size-4" />
          </div>
          <div className="text-2xl font-medium text-black">
            {productData.products.length}
          </div>
          <div className="text-muted-foreground text-sm">
            Active products in catalog
          </div>
        </div>

        <div className="rounded-md border bg-green-50 p-6 shadow-md">
          <div className="flex items-center justify-between pb-2">
            <div className="text-black">Total Orders</div>
            <ShoppingCart className="size-4" />
          </div>
          <div className="text-2xl font-medium text-black">
            {orderData.orders.length}
          </div>
          <div className="text-muted-foreground text-sm">
            +12% from last 7 days
          </div>
        </div>

        <div className="rounded-md border bg-blue-50 p-6 shadow-md">
          <div className="flex items-center justify-between pb-2">
            <div className="text-black">Total Users</div>
            <Users className="size-4" />
          </div>
          <div className="text-2xl font-medium text-black">
            {userData.users.length}
          </div>
          <div className="text-muted-foreground text-sm">
            +8% from last 7 days
          </div>
        </div>

        <div className="rounded-md border bg-purple-50 p-6 shadow-md">
          <div className="flex items-center justify-between pb-2">
            <div className="text-black">Total Revenue</div>
            <DollarSign className="size-4" />
          </div>
          <div className="text-2xl font-medium text-black">
            {formatPrice(totalRevenue, { notation: "standard" })}
          </div>
          <div className="text-muted-foreground text-sm">
            +15% from last 7 days
          </div>
        </div>
      </div>
      <Chart />
      <Survey orderData={orderData.orders} />
      <QuickActions />
    </section>
  );
};

export default DashboardPage;
