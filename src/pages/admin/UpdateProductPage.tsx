import fetchApi from "@/api";
import { oneProductQuery, queryClient } from "@/api/query";
import CategoryMultiSelect from "@/components/admin/CategoryMultiSelect";
import Dropzone from "@/components/admin/Dropzone";
import ImageGallery from "@/components/admin/products/ImageGallery";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProductSchema } from "@/types/schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const UpdateProductPage = () => {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(oneProductQuery(loaderData.productId));
  const form = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      productId: data.product._id,
      name: data.product.name,
      price: data.product.price,
      description: data.product.description,
      categories: data.product.categories,
      countInStock: data.product.countInStock,
      status: data.product.status,
      images: [],
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetchApi.put(
        `/admin/product/${data.product._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["products", "details", data.product._id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["products", "all"],
      });
      navigate("/admin/products");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "Something went wrong.";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong.");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof updateProductSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("description", values.description);
    formData.append("countInStock", values.countInStock.toString());
    formData.append("productId", values.productId);

    values.categories.forEach((cat) => formData.append("categories", cat));
    values.images?.forEach((file) => formData.append("images", file));

    updateProductMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl lg:ps-4">Product Information</CardTitle>
      </CardHeader>
      <CardContent className="max-sm:px-0">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 lg:grid-cols-2 lg:px-4">
              <Card className="flex-1">
                <CardHeader>
                  <CardDescription>
                    Basic details about your product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mb-5">
                        <FormLabel className="pb-1.5">Product Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="mb-5">
                        <FormLabel className="pb-1.5">Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mb-8 flex justify-between gap-2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="pb-1.5">Price</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="countInStock"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="pb-1.5">
                            Stock Quantity
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="1"
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="images"
                    render={() => (
                      <FormItem className="mt-8">
                        <Dropzone
                          existingImagesCount={data.product.images.length}
                        />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <CategoryMultiSelect />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ImageGallery />
              </div>
            </div>
            <div className="flex justify-end pe-4 pt-6">
              <Button
                className="w-[200px] cursor-pointer"
                type="submit"
                disabled={
                  updateProductMutation.isPending || !form.formState.isDirty
                }
              >
                {updateProductMutation.isPending && (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                )}
                {updateProductMutation.isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default UpdateProductPage;
