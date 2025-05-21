import { products } from "@/assets/data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatCurrency";
import { Minus, Plus, ShoppingCart } from "lucide-react";

const ProductDetailPage = () => {
  const product = products[0];

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt="shirt"
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </div>

        <div>
          <div className="mb-10">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="mt-2 text-2xl font-semibold">
              {formatPrice(product.price, { notation: "standard" })}
            </p>
            <div className="text-muted-foreground mt-4">
              {product.description}
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
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-12 text-center">{1}</span>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="cursor-pointer"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            <Button className="flex w-full cursor-pointer items-center gap-2">
              <ShoppingCart className="size-5" />
              Add to cart
            </Button>
          </div>

          <Separator className="h-3" />

          <div className="mt-7 md:mt-10">
            <h3 className="mb-2 text-xl font-medium">Product Details</h3>
            <ul className="text-muted-foreground list-inside list-disc space-y-1">
              <li>Category: {product.category}</li>
              <li>In Stock: {product.countInStock > 1 ? "Yes" : "No"} </li>
              <li>Total Stocks: {product.countInStock} </li>
              <li>Free shipping on orders over $50</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
