import PageHeader from "@/components/PageHeader";
import { Home } from "lucide-react";

const FavoritePage = () => {
  return (
    <section>
      <PageHeader
        title="My Favorites"
        description="Your saved products for later"
        links={[
          { title: "Home", href: "/", icon: Home },
          { title: "Products", href: "/products" },
          { title: "Favorite", href: "#" },
        ]}
      />
    </section>
  );
};

export default FavoritePage;
