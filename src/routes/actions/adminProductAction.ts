import fetchApi from "@/api";
import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router";

export const updateProductAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const productId = params.productId;

  const credentials = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    categories: formData.getAll("categories"),
    images: formData.getAll("images"),
    countInStock: formData.get("countInStock"),
  };

  try {
    await fetchApi.put(`/admin/product/${productId}`, credentials, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return redirect("/admin/products");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || "Something went wrong";
    }
    return { message: "Something went wrong", success: false };
  }
};
