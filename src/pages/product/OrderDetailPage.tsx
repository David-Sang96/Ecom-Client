import { oneOrderQuery } from "@/api/query";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatPrice } from "@/lib/formatCurrency";
import { OrderDetailType } from "@/types/order";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BoxIcon, CheckCircle, DollarSign, Home } from "lucide-react";
import { CiCalendar } from "react-icons/ci";
import { useLoaderData } from "react-router";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrderDetailPage = () => {
  const { orderId } = useLoaderData();
  const { data } = useSuspenseQuery(oneOrderQuery(orderId));
  const order = data.order as OrderDetailType;
  console.log(data);

  return (
    <section>
      <PageHeader
        title="My Orders"
        description={"Order Summary"}
        links={[
          { title: "Home", href: "/", icon: Home },
          { title: "Orders", href: "/orders" },
          { title: "Summary", href: "#" },
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="px-3">
            <div className="mb-5 text-lg font-bold md:text-xl">
              Order Information
            </div>
            <div className="space-y-3 border-b pb-5">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-3">
                  <BoxIcon size={17} />
                  <span className="text-sm">Order ID</span>
                </div>
                <div className="text-sm font-medium"> {order._id}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-3">
                  <CiCalendar size={17} />
                  <span className="text-sm">Date</span>
                </div>
                <div className="text-sm font-medium">
                  {" "}
                  {formatDate(order.createdAt!)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-3">
                  <CheckCircle size={17} />
                  <span className="text-sm">Status</span>
                </div>
                <div className="text-sm font-medium"> {order.status}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-3">
                  <DollarSign size={17} />
                  <span className="text-sm">Payment Status</span>
                </div>
                <div className="text-sm font-medium">{order.paymentStatus}</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-5">
              <div className="font-bold"> Total Amount</div>
              <div className="text-xl font-bold text-green-700 md:text-2xl">
                {formatPrice(order.totalPrice, { notation: "standard" })}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-3">
            <div className="mb-5 text-lg font-bold md:text-xl">Order Items</div>
            <Table>
              <TableHeader>
                <TableRow className="dark:bg-muted bg-gray-200">
                  <TableHead className="hidden py-5 text-gray-700 md:table-cell dark:text-gray-300">
                    Image
                  </TableHead>
                  <TableHead className="py-5 text-gray-700 dark:text-gray-300">
                    Product
                  </TableHead>
                  <TableHead className="py-5 text-gray-700 dark:text-gray-300">
                    Qty
                  </TableHead>
                  <TableHead className="py-5 text-right text-gray-700 dark:text-gray-300">
                    Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow
                    key={item.productId}
                    className="hover:bg-primary dark:hover:bg-primary transition-colors duration-200 hover:text-white"
                  >
                    <TableCell className="hidden md:table-cell">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="size-10 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>

                    <TableCell className="text-right">
                      {formatPrice(item.price, { notation: "standard" })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OrderDetailPage;
