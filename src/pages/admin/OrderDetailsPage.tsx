import { adminOneOrderQuery } from "@/api/query";
import UpdateStatusForm from "@/components/admin/orders/UpdateStatusForm";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { OrderDetailType, OrderStatus } from "@/types/order";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RiVisaFill } from "react-icons/ri";
import { useLoaderData } from "react-router";

const statusColor = {
  pending: "bg-yellow-100 text-black",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  shipped: "bg-purple-100 text-purple-800",
  cancelled: "bg-gray-200 text-gray-800",
  paid: "bg-green-100 text-green-800",
};

const OrderDetailsPage = () => {
  const { orderId } = useLoaderData();
  const { data } = useSuspenseQuery(adminOneOrderQuery(orderId));
  const {
    _id: id,
    createdAt,
    items,
    paymentStatus,
    stripeSessionId,
    updatedAt,
    totalPrice,
    userId,
    status,
  } = data.order as OrderDetailType;

  const statusText: Record<OrderStatus, string> = {
    pending: "Order is pending and not yet processed",
    processing: "Order is being processed",
    completed: "Order has been delivered successfully",
    failed: "Payment failed or there was an error",
    shipped: "Order has been shipped via Express Delivery",
    cancelled: "Order was cancelled",
  };

  const taxRate = totalPrice * (5 / 100);
  const shipping = 7.5;

  return (
    <section className="mt-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="pb-2">
                Order #{id.substring(id.length - 7)}
              </CardTitle>
              <CardDescription>
                Placed on {formatDate(createdAt)}
              </CardDescription>
            </div>
            <CardDescription>
              <div className="flex items-center gap-2">
                <Badge className={cn("capitalize", statusColor[status])}>
                  {status}
                </Badge>
                <Badge className={cn("capitalize", statusColor[paymentStatus])}>
                  {paymentStatus}
                </Badge>
              </div>
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 pt-3">
            <div className="max-sm:text-sm">
              <span className="text-muted-foreground">Customer:</span>{" "}
              {userId.name}
            </div>
            <div className="max-sm:text-sm">
              <span className="text-muted-foreground">Total:</span>{" "}
              {formatPrice(totalPrice)}
            </div>
            <div className="max-sm:text-sm">
              <span className="text-muted-foreground">Items:</span>{" "}
              {items.length}
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="my-4 gap-4 lg:flex">
        <div className="mb-4 space-y-4 lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.productId}>
                      {item?.images?.map((img) => (
                        <TableCell className="font-medium" key={img}>
                          <img
                            src={img}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="size-full rounded-md object-cover"
                          />
                        </TableCell>
                      ))}
                      <TableCell className="max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[360px] xl:max-w-[500px] 2xl:max-w-full">
                        <div className="flex flex-col">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground truncate">
                            {item.description}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.categories.map((category) => (
                              <Badge
                                key={category}
                                variant="outline"
                                className="text-xs"
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{formatPrice(item.price)}</TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end border-t">
              <div className="w-[150px] space-y-2 sm:w-[250px]">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>
                    {totalPrice > 100
                      ? "Free"
                      : formatPrice(shipping, { notation: "standard" })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax ( 5% ):</span>
                  <span>{formatPrice(taxRate, { notation: "standard" })}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>
                    {formatPrice(totalPrice + taxRate + shipping, {
                      notation: "standard",
                    })}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <div className="bg-primary absolute top-1 h-4 w-4 rounded-full"></div>
                <div className="ps-5">
                  <p className="font-medium">Order Placed</p>
                  <p className="text-muted-foreground text-sm">
                    {formatDate(createdAt)}
                  </p>
                  <p className="mt-1 text-sm">
                    Order was placed by {userId.name}
                  </p>
                </div>
              </div>
              <div className="relative mb-6">
                <div className="bg-primary absolute top-1 h-4 w-4 rounded-full"></div>
                <div className="ps-5">
                  <p className="font-medium">
                    {paymentStatus === "paid"
                      ? "Payment Confirmed"
                      : "Payment Cancelled"}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {formatDate(createdAt)}
                  </p>
                  <p className="mt-1 text-sm">
                    {paymentStatus === "paid"
                      ? "Payment was confirmed via Stripe"
                      : "Payment was cancelled via Stripe"}
                  </p>
                </div>
              </div>
              <div className="relative mb-6">
                <div className="bg-primary absolute top-1 h-4 w-4 rounded-full"></div>
                <div className="ps-5">
                  <p className="font-medium">
                    {paymentStatus === "paid" ? "Pending" : "Cancelled"}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {formatDate(createdAt)}
                  </p>
                  <p className="mt-1 text-sm">
                    {paymentStatus === "paid"
                      ? " Order is pending and not yet processed"
                      : `Order was cancelled by ${userId.name}`}
                  </p>
                </div>
              </div>
              {paymentStatus === "paid" && (
                <div className="relative mb-6">
                  <div className="bg-primary absolute top-1 h-4 w-4 rounded-full"></div>
                  <div className="ps-5">
                    <p className="font-medium capitalize">{status}</p>
                    <p className="text-muted-foreground text-sm">
                      {formatDate(updatedAt)}
                    </p>
                    <p className="mt-1 text-sm">{statusText[status]}</p>
                    <p className="mt-1 text-sm">Tracking Number: TRK12345678</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-medium">{userId.name}</div>
                <div className="text-muted-foreground text-sm">
                  Customer ID: {userId._id.substring(userId._id.length - 7)}
                </div>
              </div>
              <div>
                <div className="font-medium">Shipping Address</div>
                <div className="text-muted-foreground text-sm">
                  <span>Jalan Baiduri</span> <br />
                  <span>7e Off Jalan Sampeng</span> <br />
                  <span>Kuala Lumpur , Pudu</span> <br />
                  <span>Malaysia</span>
                </div>
              </div>
              <div>
                <div className="font-medium">Contact</div>
                <div className="text-muted-foreground text-sm">
                  Email: {userId.email}
                </div>
                <div className="text-muted-foreground text-sm">
                  Phone: +60-182-373-467
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Status</div>
                <Badge className={cn("capitalize", statusColor[status])}>
                  {status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Payment Method</div>
                <div className="flex items-center gap-2">
                  <RiVisaFill className="size-8 text-blue-500" />
                  <span className="text-sm">**** **** **** 4242</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Transaction Details</div>
                <div className="text-muted-foreground truncate">
                  Transaction ID:{" "}
                  <span className="overflow-hidden text-sm">
                    {stripeSessionId.split("_")[2]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <UpdateStatusForm status={status} orderId={id} />
        </div>
      </div>
    </section>
  );
};

export default OrderDetailsPage;
