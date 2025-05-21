import { infiniteProductQuery, queryClient } from "@/api/query";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/store/filterStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ProductFilter from "../../components/product/ProductFilter";

const ProductsPage = () => {
  const [searchResult, setSearchResult] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const previousStoreCat = useFilterStore((store) => store.categories);
  const clear = useFilterStore((store) => store.clear);
  const rawCategory = searchParam.get("category");

  const selectedCategories = previousStoreCat
    ? previousStoreCat
    : decodeURIComponent(rawCategory as string).split(",") || [];

  const categories =
    selectedCategories.length > 0 ? selectedCategories.join(",") : null;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery(infiniteProductQuery(categories));

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];
  const result = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchResult.toLocaleLowerCase()),
  );

  const handleFilter = (categories: string[]) => {
    const newParams = new URLSearchParams();
    if (categories.length > 0) {
      newParams.set("category", encodeURIComponent(categories.join(",")));
    } else {
      newParams.delete("category");
      clear();
    }
    setSearchParam(newParams);

    queryClient.cancelQueries({ queryKey: ["products", "infinite"] });
    queryClient.removeQueries({ queryKey: ["products", "infinite"] });
    refetch();
  };

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (previousStoreCat.length > 0) {
      newParams.set("category", encodeURIComponent(previousStoreCat.join(",")));
    } else {
      newParams.delete("category");
    }
    setSearchParam(newParams);
  }, []);

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <section className="mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="item-center flex justify-between">
        <h2 className="mb-8 w-1/4 text-3xl font-bold max-lg:hidden">
          All Products
        </h2>
        <div className="relative mb-6 w-full lg:w-lg">
          <Input
            type="text"
            placeholder="search product..."
            className="ps-7"
            onChange={(e) => setSearchResult(e.target.value)}
          />
          <SearchIcon className="text-muted-foreground absolute top-1.5 size-6 ps-2" />
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/4">
          <ProductFilter
            handleFilter={handleFilter}
            previousCategories={selectedCategories}
          />
        </div>

        {result.length ? (
          <div className="w-full md:w-3/4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className="cursor-pointer"
                variant={!hasNextPage ? "ghost" : "secondary"}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"}
              </Button>
            </div>
            <div>
              {isFetching && !isFetchingNextPage
                ? "Background updating..."
                : null}
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center py-20 md:w-3/4">
            <p className="text-muted-foreground text-lg">No product found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
