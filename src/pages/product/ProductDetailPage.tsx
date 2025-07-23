import { oneProductQuery } from "@/api/query";
import PageHeader from "@/components/PageHeader";
import CartNotification from "@/components/product/CartNotification";
import ImageSlider from "@/components/product/ImageSlider";
import { type Option, MultiSelect } from "@/components/product/MultiSelect";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatCurrency";
import { CartItem, useCartStore } from "@/store/cartStore";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import {
  ArrowLeft,
  Heart,
  Home,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { RiHeartFill } from "react-icons/ri";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [addItem, setAddItem] = useState<CartItem>();
  const [selectedSubCategories, setSelectedSubCategories] = useState<Option[]>(
    [],
  );
  const favoriteItems = useFavoriteStore((store) => store.favoriteItems);
  const addOrRemove = useFavoriteStore((store) => store.addOrRemove);
  const navigate = useNavigate();
  const { productId } = useLoaderData();
  const { data } = useSuspenseQuery(oneProductQuery(productId));
  const addToCart = useCartStore((store) => store.addItem);

  const isFav = favoriteItems.find((item) => item._id === data.product._id);

  const subCategoryItems: Option[] = data.product.subCategories.map(
    (cat: string) => ({
      label: cat.toUpperCase(),
      value: cat,
      category: `${data.product.categories}:`,
    }),
  );

  const categories = data.product.categories
    .map((item: string) => item)
    .join(",");

  const handleAddtoFav = () => {
    if (!isFav)
      toast.success("Added to favorite", {
        description: `${data.product.name} has been added to your favorite`,
      });
    else
      toast.error("Remove from favorite", {
        description: `${data.product.name} has been removed from your favorite`,
      });
    addOrRemove({
      _id: data.product._id,
      categories: data.product.categories,
      description: data.product.description,
      image: data.product.images[0].url,
      name: data.product.name,
      price: data.product.price,
      subCategories: data.product.subCategories,
    });
  };

  const handleAddToCart = () => {
    if (selectedSubCategories.length === 0)
      return toast.error("Select at least one sub-categories");
    const item = {
      _id: data.product._id,
      description: data.product.description,
      image: data.product.images[0].url,
      name: data.product.name,
      price: data.product.price,
      categories: data.product.categories,
      quantity,
      subCategories: selectedSubCategories.map((item) => item.value),
    };
    addToCart(item);
    setAddItem(item);
    setShowNotification(true);
  };

  return (
    <section>
      <PageHeader
        links={[
          { title: "Home", href: "/", icon: Home },
          { title: "Products", href: "/products" },
          { title: categories, href: "/products" },
          { title: data.product.name, href: "#" },
        ]}
      />

      <Button
        asChild
        size={"sm"}
        variant={"outline"}
        className="mb-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <div>
          <ArrowLeft className="size-5" />
          Back
        </div>
      </Button>
      <div className="grid gap-8 md:grid-cols-2 xl:gap-0">
        <div>
          <ImageSlider imageUrls={data.product.images} />
        </div>

        <div>
          <div className="mb-10">
            <h2 className="text-2xl font-bold">{decode(data.product.name)}</h2>
            <p className="mt-2 text-xl font-semibold md:text-2xl">
              {formatPrice(data.product.price, { notation: "standard" })}
            </p>
            <div className="text-muted-foreground mt-4">
              {data.product.description}
            </div>
          </div>

          <div className="mb-7 space-y-5 md:mb-10">
            <div className="max-w-xs">
              <MultiSelect
                options={subCategoryItems}
                selected={selectedSubCategories}
                onChange={setSelectedSubCategories}
                placeholder="Select Sub-categories..."
              />
              <div className="mt-4 text-start">
                {!!selectedSubCategories.length && (
                  <h3 className="mb-2 font-semibold">
                    Selected Sub-categories:
                  </h3>
                )}
                <ul className="list-inside list-disc">
                  {selectedSubCategories.map((item) => (
                    <li key={item.value} className="text-sm">
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="items-center justify-between lg:flex">
              <div className="flex items-center gap-4">
                <span>Quantity :</span>
                <div className="flex items-center rounded-md border-2">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="cursor-pointer"
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                  >
                    <Minus className="size-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="cursor-pointer"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <Button
                  variant={"outline"}
                  className="w-full cursor-pointer"
                  onClick={handleAddtoFav}
                >
                  {isFav ? (
                    <RiHeartFill
                      aria-hidden="true"
                      className="size-4 text-red-500"
                    />
                  ) : (
                    <Heart aria-hidden="true" className="size-4" />
                  )}
                  {isFav ? "Remove from Favorite" : "Add to Favorite"}
                </Button>
              </div>
            </div>

            <Button
              className="flex w-full cursor-pointer items-center gap-2 py-5"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-5" />
              Add to cart
            </Button>
          </div>

          <Separator className="h-3" />

          <div className="mt-7 md:mt-10">
            <h3 className="mb-2 text-xl font-medium">Product Details</h3>
            <ul className="text-muted-foreground list-inside list-disc space-y-1">
              <li>Category: {categories}</li>
              <li>In Stock: {data.product.countInStock > 1 ? "Yes" : "No"} </li>
              <li>Total Stocks: {data.product.countInStock} </li>
              <li>Free shipping on orders over $100</li>
            </ul>
          </div>
        </div>
      </div>
      {showNotification && addItem && (
        <div>
          <CartNotification
            item={addItem}
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
    </section>
  );
};

export default ProductDetailPage;
