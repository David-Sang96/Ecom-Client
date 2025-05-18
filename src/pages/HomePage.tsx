import FeatureSection from "@/components/product/FeatureSection";
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
        <Button className="px-8 py-5 text-base" asChild>
          <Link to={"/products"}>Shop Now</Link>
        </Button>
      </section>

      {/* Featured Products */}
      <FeatureSection />

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
