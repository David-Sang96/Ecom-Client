import { infiniteProductQuery, queryClient } from "@/api/query";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/product/ProductCard";
import ProductSkeleton from "@/components/skeletons/productsSkeleton";
import { Input } from "@/components/ui/input";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import { useFilterStore } from "@/store/filterStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Home, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import ProductFilter from "../../components/product/ProductFilter";

const ProductsPage = () => {
  const [searchResult, setSearchResult] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const previousStoreCat = useFilterStore((store) => store.categories);
  const clear = useFilterStore((store) => store.clear);
  const rawCategory = searchParam.get("category");
  useScrollRestore("products-scroll");
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // reference to bottom div

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
    if (!hasNextPage || isFetchingNextPage) return; // stop if no more pages or already loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage(); // load next page when div is visible
        }
      },
      {
        rootMargin: "100px", // trigger before fully visible
      },
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current); // start watching the div

    return () => {
      if (current) observer.unobserve(current); // clean up on unmount
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    <ProductSkeleton />
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <section>
      <PageHeader
        title="All Products"
        description="Discover our complete collection of high-quality products"
        links={[
          { title: "Home", href: "/", icon: Home },
          { title: "Products", href: "#" },
        ]}
      />

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/4">
          <ProductFilter
            handleFilter={handleFilter}
            previousCategories={selectedCategories}
          />
        </div>

        <div className="w-full md:w-3/4">
          <div className="flex max-lg:flex-col-reverse lg:items-center lg:justify-between">
            <p className="text-muted-foreground pb-4 text-[.95rem]">
              Showing {result.length} products
            </p>
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

          {result.length ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {/* triggers infinite scroll */}
              <div ref={loadMoreRef} className="h-10" />
              {isFetchingNextPage && (
                <div className="text-muted-foreground mt-4 text-center">
                  Loading more...
                </div>
              )}

              {/* 
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
              </div> */}
            </>
          ) : (
            <div className="flex w-full items-center justify-center py-20 md:w-3/4">
              <p className="text-muted-foreground text-lg">No product found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
