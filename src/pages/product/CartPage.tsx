import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const CartDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <section>
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
              2
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-1.5">
              <ShoppingCart size={20} aria-hidden="true" />
              <p className="text-lg"> Your Cart (0)</p>
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-full items-center justify-center">
            <div className="flex-col text-center">
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
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default CartDrawer;
