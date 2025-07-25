export type OrderProductType = {
  productId: string;
  name: string;
  description: string;
  categories: string[];
  price: number;
  quantity: number;
  images: { url: string; public_id: string }[];
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "shipped"
  | "cancelled";

export type PaymentStatus = "failed" | "paid";

export type OrderType = {
  _id: string;
  items: OrderProductType[];
  totalPrice: number;
  stripeSessionId: string;
  paymentStatus: PaymentStatus;
  userId: { _id: string; name: string; email: string };
  createdAt: Date;
  status: OrderStatus;
};

export type OrderItemType = {
  _id?: string;
  productId: string;
  name: string;
  description: string;
  categories: string[];
  price: number;
  quantity: number;
  images: string[];
  subCategories: string[];
};

export type OrderDetailType = {
  _id: string;
  items: OrderItemType[];
  totalPrice: number;
  stripeSessionId: string;
  paymentStatus: PaymentStatus;
  userId: { _id: string; name: string; email: string };
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
};
