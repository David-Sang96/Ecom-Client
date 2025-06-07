import { oneProductQuery } from "@/api/query";
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
import { useSuspenseQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { z } from "zod";

const UpdateProductPage = () => {
  const loaderData = useLoaderData();
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
      images: [],
    },
  });

  const onSubmit = (values: z.infer<typeof updateProductSchema>) => {
    console.log(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="ps-4 text-xl">Product Information</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between gap-4 px-4">
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
                                field.onChange(e.target.valueAsNumber)
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
                        <Dropzone />
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
                    </FormItem>
                  )}
                />

                <ImageGallery images={data.product.images} />
              </div>
            </div>
            <div className="flex justify-end pe-4 pt-6">
              <Button className="w-[200px] cursor-pointer" type="submit">
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default UpdateProductPage;
