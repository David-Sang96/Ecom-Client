import PageHeader from "@/components/PageHeader";
import FavoriteCard from "@/components/product/FavoriteCard";
import { Button } from "@/components/ui/button";
import { useFavoriteStore } from "@/store/favoriteStore";
import { Home } from "lucide-react";
import { RiHeartLine } from "react-icons/ri";
import { Link } from "react-router";

const FavoritePage = () => {
  const favoriteItems = useFavoriteStore((store) => store.favoriteItems);

  return (
    <section>
      <PageHeader
        title="My Favorites"
        description={`${favoriteItems.length} items in your favorites`}
        links={[
          { title: "Home", href: "/", icon: Home },
          { title: "Products", href: "/products" },
          { title: "Favorite", href: "#" },
        ]}
      />

      {favoriteItems.length ? (
        <div className="grid grid-cols-4 gap-4">
          {favoriteItems.map((item) => (
            <FavoriteCard key={item._id} {...item} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <div className="mx-auto flex max-w-xl flex-col items-center space-y-2.5">
            <RiHeartLine className="self-center" size={50} />

            <div className="text-2xl font-semibold">No favorites yet</div>
            <div className="text-muted-foreground">
              Start adding items to your favorites to see them here
            </div>
            <Link to="/products" className="self-center">
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-fit cursor-pointer py-4"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default FavoritePage;
