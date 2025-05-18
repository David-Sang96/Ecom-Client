import { formatPrice } from "@/lib/formatCurrency";
import { ProductType } from "@/types/product";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="pt-0 pb-3">
      <img
        src={product.images[0].url}
        alt="shirt"
        loading="lazy"
        decoding="async"
        className="aspect-square size-full rounded-tl-md rounded-tr-md object-cover"
      />
      <CardContent className="px-3 text-start">
        <h3 className="truncate text-lg font-medium">{product.name}</h3>
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
