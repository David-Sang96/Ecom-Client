import { Product } from "@/assets/data";
import { formatPrice } from "@/lib/formatCurrency";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="pt-0 pb-3">
      <img
        src={product.image}
        alt="shirt"
        loading="lazy"
        decoding="async"
        className="size-full object-cover rounded-tl-md rounded-tr-md aspect-square"
      />
      <CardContent className="text-start px-3">
        <h3 className="truncate font-medium text-lg">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <p className="font-bold mt-2">
          {formatPrice(product.price, { notation: "standard" })}
        </p>
      </CardContent>
      <CardFooter className="px-3">
        <Link to={`/product${product.id}`} className="w-full ">
          <Button variant={"outline"} className="w-full cursor-pointer ">
            View Product
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
