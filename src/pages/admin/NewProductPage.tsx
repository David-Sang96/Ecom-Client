import fetchApi from "@/api";
import { queryClient } from "@/api/query";
import { categories } from "@/components/admin/CategoryMultiSelect";
import Dropzone from "@/components/admin/Dropzone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProductSchema } from "@/types/schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const NewProductPage = () => {
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      categories: "",
      countInStock: 0,
      description: "",
      images: [],
    },
  });

  const addSubCategory = () => {
    const value = inputRef.current?.value.trim();
    if (value) {
      const capitalize = value.slice(0, 1).toUpperCase() + value.slice(1);
      if (subCategories.includes(capitalize)) {
        inputRef.current!.value = "";
        return;
      }
      setSubCategories((cat) => [...cat, capitalize]);
      inputRef.current!.value = "";
    }
  };

  const createProductMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetchApi.post("/admin/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["products", "all"] });
      navigate("/admin/products");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "Something went wrong";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof createProductSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("description", values.description);
    formData.append("categories", values.categories);
    formData.append("countInStock", values.countInStock.toString());

    subCategories.forEach((cat) => formData.append("subCategories", cat));
    values.images.forEach((file) => formData.append("images", file));
    createProductMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Create a new product for your store</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardDescription>
                    Basic details about your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1.5">Product Name*</FormLabel>
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
                      <FormItem>
                        <FormLabel className="pb-1.5">Description*</FormLabel>
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
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="0.00"
                              type="number"
                              {...field}
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
                    name="categories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1.5">
                          Select one category
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select cateogry" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((item, idx) => (
                                <SelectItem key={idx} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem className="w-full">
                    <FormLabel className="pb-1.5">Sub Categories</FormLabel>
                    <FormControl>
                      <Input
                        ref={inputRef}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSubCategory();
                          }
                        }}
                      />
                    </FormControl>
                    {subCategories.length === 0 && (
                      <div className="text-sm text-red-400">
                        Sub categories is required
                      </div>
                    )}
                  </FormItem>

                  <div className="flex flex-wrap gap-1">
                    {subCategories.map((item) => (
                      <Badge key={item} variant={"secondary"}>
                        {item}
                        <button
                          onClick={() =>
                            setSubCategories((prev) =>
                              prev.filter((cat) => cat !== item),
                            )
                          }
                          className="ml-1 cursor-pointer text-xs hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <FormField
                control={form.control}
                name="images"
                render={() => <Dropzone />}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button
                className="cursor-pointer"
                disabled={createProductMutation.isPending}
              >
                {createProductMutation.isPending && (
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                )}
                {createProductMutation.isPending
                  ? "Creating..."
                  : "Create New Product"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewProductPage;
