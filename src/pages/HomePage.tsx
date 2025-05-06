import { products } from "@/assets/data";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <main>
      {/* Hero section */}
      <section className="bg-muted space-y-4 py-12 text-center md:py-24 lg:py-32">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Shop the Latest Trends
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl font-medium md:text-xl">
          Discover our curated collection of high-quality products at affordable
          prices.
        </p>
        <Button className="px-8 py-5 text-base">Shop Now</Button>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:px-12 md:py-24">
        <div className="space-y-8 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Featured Products
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl font-medium">
              Check out our most popular items this season.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <Link to={"/products"}>
            <Button variant={"outline"} className="cursor-pointer">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted py-12">
        <div className="grid gap-6 md:grid-cols-3 md:gap-0">
          <div className="flex flex-col items-center justify-center space-y-1.5 text-center">
            <div className="bg-primary/10 rounded-full p-3">
              <ShoppingBag aria-hidden="true" className="text-primary" />
            </div>
            <p className="text-xl font-medium">Free Shipping</p>
            <p className="text-muted-foreground">On all orders over $50</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1.5 text-center">
            <div className="bg-primary/10 rounded-full p-3">
              <ShoppingBag aria-hidden="true" className="text-primary" />
            </div>
            <p className="text-xl font-medium">Easy Returns</p>
            <p className="text-muted-foreground">30-day return policy</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1.5 text-center">
            <div className="bg-primary/10 rounded-full p-3">
              <ShoppingBag aria-hidden="true" className="text-primary" />
            </div>
            <p className="text-xl font-medium">Secure Checkout</p>
            <p className="text-muted-foreground">Safe & protected shopping</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
