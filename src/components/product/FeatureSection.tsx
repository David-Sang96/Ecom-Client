import { productQuery } from "@/api/query";
import { ProductType } from "@/types/product";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Button } from "../ui/button";
import ProductCard from "./ProductCard";

const FeatureSection = () => {
  // const { data, isLoading, isError, error } = useQuery(
  //   productQuery("?limit=3"),
  // );

  // if (isLoading) return <p className="text-center">Loading...</p>;
  // if (isError) return <p className="text-center">{error.message}</p>;
  const { data } = useSuspenseQuery(productQuery("?limit=4"));

  return (
    <section className="py-12 md:px-12 md:py-24">
      <div className="space-y-12 text-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Featured Products
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl font-medium">
            Check out our most popular items this season.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {data.products.map((product: ProductType) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
        <Link to={"/products"}>
          <Button variant={"outline"} className="cursor-pointer">
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeatureSection;
