import { adminOneOrderQuery } from "@/api/query";
import PrintAndDownload from "@/components/admin/orders/PrintAndDownload";
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
import {
  formatPrice,
  generateInvoiceId,
  invoiceDate,
} from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { OrderDetailType } from "@/types/order";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useLoaderData } from "react-router";
import { useReactToPrint } from "react-to-print";

const VoucherInvoicePage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { orderId } = useLoaderData();
  const { data } = useSuspenseQuery(adminOneOrderQuery(orderId));
  const {
    _id: id,
    items,
    paymentStatus,
    stripeSessionId,
    updatedAt,
    totalPrice,
    userId,
    status,
  } = data.order as OrderDetailType;

  const taxRate = totalPrice * (5 / 100);
  const shipping = 7.5;

  const statusColor = {
    pending: "bg-yellow-100 text-black",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    shipped: "bg-purple-100 text-purple-800",
    cancelled: "bg-gray-200 text-gray-800",
    paid: "bg-green-100 text-green-800",
  };

  return (
    <section className="mx-auto my-4 max-w-5xl">
      <div className="mb-4">
        <PrintAndDownload reactToPrintFn={reactToPrintFn} />
      </div>
      <Card ref={contentRef}>
        <CardHeader className="max-sm:px-2">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-xl">INVOICE</CardTitle>
              <CardDescription className="pt-3 text-base text-black/80 dark:text-white/80">
                <div>Invoice #: {generateInvoiceId()}</div>
                <div>Order #: {id.substring(id.length - 10)}</div>
                <div>Date: {invoiceDate(updatedAt)}</div>
              </CardDescription>
            </div>
            <div>
              <CardTitle className="text-end text-xl">Ecom Sale</CardTitle>
              <CardDescription className="pt-3">
                <p className="text-end text-black/80 dark:text-white/80">
                  Off Jalan Sampeng, Jalan Baiduri
                  <br />
                  Kuala Lumpur ,55200
                  <br />
                  Malaysia
                  <br />
                  Phone: (555) 123-4567
                  <br />
                  Email: billing@ecomSale.com
                </p>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 max-sm:px-2">
          <div>
            <h3 className="pb-3 text-lg font-semibold">Bill To:</h3>
            <div className="space-y-0.5 text-black/80 dark:text-white/80">
              <div>Customer Name: {userId.name}</div>
              <div>
                Customer ID: {userId._id.substring(userId._id.length - 7)}
              </div>
              <div>Email: {userId.email}</div>
              <div>Phone: +60-018-237-3467</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div>
              Order Status:{" "}
              <Badge className={cn("capitalize", statusColor[status])}>
                {" "}
                {status}
              </Badge>
            </div>
            <div>
              Payment Status:{" "}
              <Badge className={cn("capitalize", statusColor[paymentStatus])}>
                {" "}
                {paymentStatus}
              </Badge>
            </div>
          </div>
          <div>
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
            <div className="flex justify-end border-t pt-4">
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
            </div>
          </div>
          <div>
            <h3 className="pb-3 text-lg font-semibold">Payment Information</h3>
            <div className="bg-muted grid grid-cols-2 gap-4 space-y-4 rounded-md px-4 pt-4 text-black/80 md:gap-10 dark:text-white/80">
              <div className="space-y-4">
                <div>
                  <div>Payment Method:</div>
                  <div className="truncate">
                    Credit Card (**** **** **** 4242)
                  </div>
                </div>
                <div>
                  <div>Payment Date:</div>
                  <div>{invoiceDate(updatedAt)}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div>Transaction ID:</div>
                  <div className="truncate text-sm">
                    {stripeSessionId.split("_")[2]}
                  </div>
                </div>
                <div>
                  <div>Payment Status:</div>

                  <Badge
                    className={cn("capitalize", statusColor[paymentStatus])}
                  >
                    {paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="text-muted-foreground flex flex-col gap-3 text-center">
          <div>Thank you for your business!</div>
          <div>
            If you have any questions about this invoice, please contact us at
            billing@ecomsale.com or (555) 123-4567
          </div>
          <div className="text-sm">
            This invoice was generated on {invoiceDate(new Date())}
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default VoucherInvoicePage;
