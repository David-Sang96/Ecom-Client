import useAuthStore from "@/store/authStore";

const OrdersPage = () => {
  const userId = useAuthStore((store) => store.id);
  //   const { data } = useSuspenseQuery(ordersQuery(userId!));

  console.log(userId);

  return <div>OrdersPage</div>;
};

export default OrdersPage;
