import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/formatCurrency";
import { OrderType } from "@/types/order";
import { Link } from "react-router";

interface SurveyProps {
  orderData: OrderType[];
}

const Survey = ({ orderData }: SurveyProps) => {
  const products = new Map();

  orderData.forEach((item) =>
    item.items.forEach((order) => {
      const existing = products.get(order.productId);
      if (existing) {
        existing.quantity += order.quantity;
        existing.totalPrice += order.price * order.quantity;
      } else {
        products.set(order.productId, {
          productId: order.productId,
          name: order.name,
          quantity: order.quantity,
          price: order.price,
          totalPrice: order.price * order.quantity,
        });
      }
    }),
  );

  const groupedAndSorted = Array.from(products.values()).sort(
    (a, b) => b.quantity - a.quantity,
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Orders</CardTitle>
          <CardDescription>Latest orders from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          {orderData.slice(0, 6).map((item) => (
            <div
              className="flex items-center justify-between pb-3"
              key={item._id}
            >
              <div>
                <div>ORD-{item._id.substring(item._id.length - 3)}</div>

                <div className="text-muted-foreground text-sm">
                  {item.userId.name}
                </div>
              </div>
              <div>
                <div>{formatPrice(item.totalPrice)}</div>
                <div className="text-muted-foreground text-sm">Completed</div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer" variant={"outline"} asChild>
            <Link to={"/admin/orders"}>View All Orders</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Top Products</CardTitle>
          <CardDescription>Best performing products this month</CardDescription>
        </CardHeader>
        <CardContent>
          {groupedAndSorted.slice(0, 6).map((item, idx) => (
            <div
              className="flex items-center justify-between pb-3"
              key={item.productId}
            >
              <div className="flex items-center gap-2">
                <div className="bg-muted flex size-8 items-center justify-center rounded-full">
                  {idx + 1}
                </div>
                <div className="">
                  <div>{item.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {item.quantity} sales
                  </div>
                </div>
              </div>
              <div className="">
                {formatPrice(item.totalPrice, { notation: "standard" })}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer" variant={"outline"} asChild>
            <Link to={"/admin/products"}> Manage Products</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Survey;
