import { formatDateOnly, formatPrice } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { OrderDetailType } from "@/types/order";
import { CiCalendar } from "react-icons/ci";
import { IoCardOutline } from "react-icons/io5";
import {
  MdAutorenew,
  MdCancel,
  MdCheckCircle,
  MdClose,
  MdLocalShipping,
  MdPending,
} from "react-icons/md";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import OrderItemCard from "./OrderItemCard";

interface OrderCardProps {
  order: OrderDetailType;
}

const OrderCard = ({ order }: OrderCardProps) => {
  function getStatusStyles(status: string) {
    switch (status) {
      case "pending":
        return {
          className: "bg-yellow-100 text-black",
          icon: <MdPending size={20} />,
        };
      case "processing":
        return {
          className: "bg-blue-100 text-blue-800",
          icon: <MdAutorenew size={20} />,
        };
      case "completed":
        return {
          className: "bg-green-100 text-green-800",
          icon: <MdCheckCircle size={20} />,
        };
      case "failed":
        return {
          className: "bg-red-100 text-red-800",
          icon: <MdClose size={20} />,
        };
      case "shipped":
        return {
          className: "bg-purple-100 text-purple-800",
          icon: <MdLocalShipping size={20} />,
        };
      case "cancelled":
        return {
          className: "bg-red-200 text-red-800",
          icon: <MdCancel size={20} />,
        };
      default:
        return {
          className: "bg-gray-100 text-gray-600",
          icon: null,
        };
    }
  }
  const { className, icon } = getStatusStyles(order.status);

  return (
    <Card className="pb-0">
      <CardTitle className="flex flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-bold">
            Order #{order._id.slice(0, 10)}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CiCalendar size={20} />
              <div className="text-muted-foreground text-sm">
                {formatDateOnly(order.createdAt)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IoCardOutline size={20} />
              <div className="text-muted-foreground text-sm">
                {order.paymentStatus}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between md:flex-col md:items-end">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1 px-1.5 py-0.5 text-xs capitalize",
                className,
              )}
            >
              {icon}
              {order.status}
            </div>
            <div className="text-xl font-bold">
              {formatPrice(order.totalPrice, { notation: "standard" })}
            </div>
          </div>

          <Link to={`/orders/${order._id}`}>
            <Button
              size={"sm"}
              variant={"link"}
              className="cursor-pointer text-xs"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardTitle>
      <CardContent className="px-0">
        {order.items.map((item) => (
          <OrderItemCard key={item._id} order={item} />
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
