import fetchApi from "@/api";
import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router";

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
    categories: formData.get("categories"),
    images: formData.get("images"),
    countInStock: formData.get("countInStock"),
  };

  try {
    const response = await fetchApi.put(
      `/admin/product/${productId}`,
      credentials,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || "Something went wrong";
    }
    return { message: "Something went wrong", success: false };
  }
};
