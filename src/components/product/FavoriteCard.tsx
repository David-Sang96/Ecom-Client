import { formatPrice } from "@/lib/formatCurrency";
import { FavoriteItem, useFavoriteStore } from "@/store/favoriteStore";
import { RiHeartFill } from "react-icons/ri";
import { Link } from "react-router";
import { toast } from "sonner";
import ProductImageLoader from "../ProductImageLoader";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const FavoriteCard = ({
  _id,
  categories,
  description,
  image,
  name,
  price,
  subCategories,
}: FavoriteItem) => {
  const addOrRemove = useFavoriteStore((store) => store.addOrRemove);
  const handleAddtoFav = () => {
    toast.error("Remove from favorite", {
      description: `${name} has been removed from your favorite`,
    });
    addOrRemove({
      _id: _id,
      categories: categories,
      description: description,
      image,
      name: name,
      price: price,
      subCategories: subCategories,
    });
  };

  return (
    <Card className="p-0 pb-4">
      <CardContent className="p-0">
        <ProductImageLoader alt={name} src={image} />
        <div className="space-y-4 px-5 pt-5">
          <div className="font-semibold">{name}</div>
          <div className="text-muted-foreground line-clamp-3 text-sm">
            {description}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">
              {formatPrice(price, { notation: "compact" })}
            </div>
            <div className="text-sm font-semibold">{categories}</div>
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold">Sub Categories</div>
            <div className="flex flex-wrap items-center gap-2">
              {subCategories.map((item) => (
                <div
                  key={item}
                  className="border-primary py-.5 rounded-2xl border px-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-3">
        <Link to={`/products/${_id}`} className="flex-1">
          <Button variant={"outline"} className="cursor-pointer">
            View Product
          </Button>
        </Link>

        <Button
          variant={"outline"}
          className="flex-1 cursor-pointer"
          onClick={handleAddtoFav}
        >
          <RiHeartFill aria-hidden="true" className="size-4 text-red-500" />
          Remove from Favorite
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FavoriteCard;
