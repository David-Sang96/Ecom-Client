import { ShoppingCart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatCurrency";
import { CartItem } from "@/store/cartStore";
import { Link } from "react-router";

interface CartNotificationProps {
  item: CartItem;
  onClose: () => void;
}

export default function CartNotification({
  item,
  onClose,
}: CartNotificationProps) {
  return (
    <div className="animate-in slide-in-from-bottom-5 fixed right-0.5 bottom-4 z-50 w-full sm:right-4 sm:max-w-sm">
      <Card className="border-primary/10 border-2 p-4 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <ShoppingCart className="text-primary mr-2 h-5 w-5" />
            <h3 className="font-medium">Added to Cart</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-6"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-muted relative size-16 flex-shrink-0 overflow-hidden rounded">
            <img
              src={item.image}
              alt={item.name}
              className="size-full object-cover"
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <p className="line-clamp-1 font-medium">{item.name}</p>
            <p className="text-muted-foreground text-sm">
              Quantity: {item.quantity} ×
              {formatPrice(item.price, { notation: "standard" })}
            </p>
            <p className="mt-1 font-medium">
              Total:{" "}
              {formatPrice(item.price * item.quantity, {
                notation: "standard",
              })}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to="/cart" className="flex-1">
            <Button className="w-full cursor-pointer" size="sm">
              View Cart
            </Button>
          </Link>
          <Link to="/products" className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full cursor-pointer"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
