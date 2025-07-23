import { formatPrice } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { useFavoriteStore } from "@/store/favoriteStore";
import { ProductType } from "@/types/product";
import { decode } from "html-entities";
import { Heart } from "lucide-react";
import { RiHeartFill } from "react-icons/ri";
import { Link } from "react-router";
import { toast } from "sonner";
import ProductImageLoader from "../ProductImageLoader";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addOrRemove = useFavoriteStore((store) => store.addOrRemove);
  const favoriteItems = useFavoriteStore((store) => store.favoriteItems);

  const isFav = favoriteItems.find((item) => item._id === product._id);

  const handleAdd = () => {
    if (!isFav)
      toast.success("Added to favorite", {
        description: `${product.name} has been added to your favorite`,
      });
    else
      toast.error("Remove from favorite", {
        description: `${product.name} has been removed from your favorite`,
      });

    addOrRemove({
      _id: product._id,
      categories: product.categories,
      description: product.description,
      image: product.images[0].url,
      name: product.name,
      price: product.price,
      subCategories: product.subCategories,
    });
  };

  return (
    <Card className="pt-0 pb-3">
      <div className="group relative overflow-hidden">
        <ProductImageLoader src={product.images[0].url} alt={product.name} />
        <div
          className={cn(
            "absolute top-1 right-2 rounded-full",
            isFav
              ? "hover:bg-black/70"
              : "bg-black/70 opacity-0 transition-opacity group-hover:opacity-100",
          )}
        >
          <Button
            variant={isFav ? "ghost" : "outline"}
            className="cursor-pointer rounded-full"
            onClick={handleAdd}
          >
            {isFav ? (
              <RiHeartFill aria-hidden="true" className="size-5 text-red-500" />
            ) : (
              <Heart aria-hidden="true" className="size-5" />
            )}
          </Button>
        </div>
      </div>

      <CardContent className="px-3 text-start">
        <h3 className="max-w-[300px] truncate font-medium">
          {decode(product.name)}
        </h3>
        <p className="text-muted-foreground text-sm">{product.categories[0]}</p>
        <p className="mt-2 font-bold">
          {formatPrice(product.price, { notation: "standard" })}
        </p>
      </CardContent>
      <CardFooter className="px-3">
        <Link to={`/products/${product._id}`} className="w-full">
          <Button variant={"outline"} className="w-full cursor-pointer">
            View Product
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
