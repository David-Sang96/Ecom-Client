import { oneProductQuery } from "@/api/query";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatCurrency";
import { useCartStore } from "@/store/cartStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useLoaderData } from "react-router";

const ProductDetailPage = () => {
  const { productId } = useLoaderData();
  const { data } = useSuspenseQuery(oneProductQuery(productId));
  const addToCart = useCartStore((store) => store.addItem);
  const increateQuantity = useCartStore((store) => store.increaseQuantity);
  const decreateQuantity = useCartStore((store) => store.decreaseQuantity);

  const categories = data.product.categories
    .map((item: string) => item)
    .join(",");

  const handleIncrease = () => {};

  const handleDecrease = () => {};

  const handleAddToCart = () => {};

  return (
    <section>
      <div className="grid gap-10 md:grid-cols-2 xl:gap-0">
        <div className="bg-muted relative aspect-square overflow-hidden rounded-lg xl:h-[90%]">
          <img
            src={data.product.images[0].url}
            alt="shirt"
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </div>

        <div>
          <div className="mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">
              {data.product.name}
            </h2>
            <p className="mt-2 text-xl font-semibold md:text-2xl">
              {formatPrice(data.product.price, { notation: "standard" })}
            </p>
            <div className="text-muted-foreground mt-4">
              {data.product.description}
            </div>
          </div>

          <div className="mb-7 space-y-5 md:mb-10">
            <div className="flex items-center gap-4">
              <span>Quantity :</span>
              <div className="flex items-center rounded-md border-2">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="cursor-pointer"
                  onClick={handleDecrease}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-12 text-center">{1}</span>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="cursor-pointer"
                  onClick={handleIncrease}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            <Button
              className="flex w-full cursor-pointer items-center gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-5" />
              Add to cart
            </Button>
          </div>

          <Separator className="h-3" />

          <div className="mt-7 md:mt-10">
            <h3 className="mb-2 text-xl font-medium">Product Details</h3>
            <ul className="text-muted-foreground list-inside list-disc space-y-1">
              <li>Category: {categories}</li>
              <li>In Stock: {data.product.countInStock > 1 ? "Yes" : "No"} </li>
              <li>Total Stocks: {data.product.countInStock} </li>
              <li>Free shipping on orders over $50</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
