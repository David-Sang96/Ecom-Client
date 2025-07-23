import PageHeader from "@/components/PageHeader";
import StripeCheckOut from "@/components/product/StripeCheckOut";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/formatCurrency";
import { useCartStore } from "@/store/cartStore";
import { decode } from "html-entities";
import { Home, Trash } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const CartPage = () => {
  const cartItem = useCartStore((store) => store.items);
  const totalPrice = useCartStore((store) => store.totalPrice);
  const updateQuantity = useCartStore((store) => store.updateQuantity);
  const removeItem = useCartStore((store) => store.removeItem);
  const navigate = useNavigate();

  console.log(cartItem);

  useEffect(() => {
    if (cartItem.length === 0) navigate("/products");
  }, [cartItem.length, navigate]);

  return (
    <section>
      <PageHeader
        title="Shopping Cart"
        description={`${cartItem.length} ${cartItem.length > 1 ? "items" : "item "} in your cart`}
        links={[
          { title: "Home", href: "/", icon: Home },
          { title: "Shopping Cart", href: "#" },
        ]}
      />
      <div className="space-y-10 lg:flex lg:justify-between lg:gap-10">
        <div className="lg:w-2/3 xl:w-3/4">
          <Table>
            <TableCaption className="pb-4">
              A list of your recent products in cart.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base md:w-[500px] xl:w-[600px]">
                  Product
                </TableHead>
                <TableHead className="text-right text-base">Price</TableHead>
                <TableHead className="text-right text-base">Sizes</TableHead>
                <TableHead className="text-right text-base">Quantity</TableHead>
                <TableHead className="text-right text-base">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartItem.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="size-13">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-full rounded-md object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="">
                        <p className="max-w-[200px] truncate font-medium lg:max-w-full">
                          {decode(item.name)}
                        </p>
                        <div
                          className="flex cursor-pointer items-center gap-0.5 font-medium text-red-500"
                          onClick={() => removeItem(item._id)}
                        >
                          <Trash className="size-3.5" />
                          <p>Remove</p>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                  <TableCell className="text-right">
                    {item.subCategories.join(", ")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item._id,
                            Number.parseInt(e.target.value),
                          )
                        }
                        className="w-16 text-center"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(item.price * item.quantity, {
                      notation: "standard",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="lg:w-1/3 xl:w-1/4">
          <div className="space-y-3 rounded-md border border-black p-6 dark:border-white">
            <h2 className="text-lg font-medium lg:text-xl">Order Summary</h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p>{formatPrice(totalPrice, { notation: "standard" })}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Shipping</p>
                <p>
                  {totalPrice > 100
                    ? "Free"
                    : formatPrice(7.5, { notation: "standard" })}
                </p>
              </div>
              <Separator className="bg-black dark:bg-white" />
              <div className="flex items-center justify-between">
                <p>Total</p>
                <p>
                  {formatPrice(
                    totalPrice > 100 ? totalPrice : totalPrice + 7.5,
                    {
                      notation: "standard",
                    },
                  )}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <StripeCheckOut />
              </div>
              <div>
                <Button
                  asChild
                  className="w-full cursor-pointer border py-5"
                  variant={"ghost"}
                >
                  <Link to={"/products"}>Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
