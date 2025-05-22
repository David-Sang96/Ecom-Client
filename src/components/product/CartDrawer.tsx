import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/formatCurrency";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, ShoppingCart, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const cartItems = useCartStore((store) => store.items);
  const totalPrice = useCartStore((store) => store.totalPrice);
  const increaseQuantity = useCartStore((store) => store.increaseQuantity);
  const decreaseQuantity = useCartStore((store) => store.decreaseQuantity);
  const removeItem = useCartStore((store) => store.removeItem);

  const handleIncrease = (id: string) => {
    increaseQuantity(id);
  };

  const handleDecrease = (id: string) => {
    decreaseQuantity(id);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="relative cursor-pointer rounded-md border"
          variant={"ghost"}
          size={"icon"}
          aria-label="shopping cart"
        >
          <ShoppingCart size={5} aria-hidden="true" />
          <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full text-xs">
            {cartItems.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-1.5">
            <ShoppingCart size={20} aria-hidden="true" />
            <p className="text-lg"> Your Cart ({cartItems.length})</p>
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="mt-24 flex-col text-center">
            <div className="bg-muted mb-4 w-fit justify-self-center rounded-full p-6">
              <ShoppingCart
                aria-hidden="true"
                className="text-muted-foreground size-10"
              />
            </div>
            <p className="mb-1.5 text-xl font-medium">Your cart is empty</p>
            <p className="text-muted-foreground mb-4 px-5 text-lg">
              Look like you haven't added any products to your cart yet.
            </p>
            <Button asChild onClick={() => setOpen((prev) => !prev)}>
              <Link to={"/products"}>Browser Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="px-2">
              <ScrollArea className="my-4 h-[calc(100vh-21rem)]">
                {cartItems.map((item) => (
                  <>
                    <div className="flex gap-3 pt-2 pb-4" key={item._id}>
                      <div className="w-1/4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-22 rounded-sm object-cover"
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-2/4 space-y-2 ps-2 text-start">
                        <div>
                          <p className="font-medium">
                            {item.name.length > 18
                              ? item.name.slice(0, 18) + "..."
                              : item.name}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {formatPrice(item.price, {
                              notation: "standard",
                            })}
                          </p>
                        </div>
                        <div className="flex w-fit items-center rounded-md border-2">
                          <Button
                            variant={"ghost"}
                            size={"sm"}
                            className="cursor-pointer"
                            onClick={() => handleDecrease(item._id)}
                          >
                            <Minus className="size-3" />
                          </Button>
                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant={"ghost"}
                            size={"sm"}
                            className="cursor-pointer"
                            onClick={() => handleIncrease(item._id)}
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex w-1/4 flex-col items-end justify-between pe-4 pt-1">
                        <TrashIcon
                          className="size-5 cursor-pointer"
                          onClick={() => removeItem(item._id)}
                        />
                        <div>
                          {formatPrice(item.price * item.quantity, {
                            notation: "standard",
                          })}
                        </div>
                      </div>
                    </div>
                    <Separator className="bg-black dark:bg-white" />
                  </>
                ))}
              </ScrollArea>
            </div>
            <Separator className="bg-black dark:bg-white" />
            <div className="px-3">
              <div className="flex justify-between font-medium">
                <p>Subtotal</p>
                <p>
                  {formatPrice(totalPrice, {
                    notation: "standard",
                  })}
                </p>
              </div>
              <p className="text-muted-foreground py-3">
                Shipping and taxes calculated at checkout
              </p>
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full py-5"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <Link to={"/cart"}>Checkout</Link>
                </Button>
                <Button
                  asChild
                  className="w-full border-2 py-5"
                  variant={"ghost"}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <Link to={"/products"}>Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
