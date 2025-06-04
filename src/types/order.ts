export type OrderProductType = {
  productId: string;
  name: string;
  description: string;
  categories: [string];
  price: number;
  quantity: number;
  image: string;
};

export type OrderType = {
  _id: string;
  items: OrderProductType[];
  totalPrice: number;
  stripeSessionId: string;
  paymentStatus: string;
  userId: { _id: string; name: string };
};
