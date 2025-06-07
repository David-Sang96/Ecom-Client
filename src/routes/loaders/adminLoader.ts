/* eslint-disable @typescript-eslint/no-unused-vars */
import { allProductsQuery, oneProductQuery, queryClient } from "@/api/query";
import { LoaderFunctionArgs } from "react-router";

export const adminProductsLoader = async () => {
  try {
    await queryClient.ensureQueryData(allProductsQuery());
    return null;
  } catch (error) {
    throw new Response("Failed to load the products in admin", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export const adminOneProductLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const id = params.productId;
    if (!id) {
      throw new Error("No product ID provided");
    }
    await queryClient.ensureQueryData(oneProductQuery(id));
    return { productId: id };
  } catch (error) {
    throw new Response("", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
