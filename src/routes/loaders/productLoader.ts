/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  infiniteProductQuery,
  oneProductQuery,
  queryClient,
} from "@/api/query";
import { LoaderFunctionArgs } from "react-router";
import { authCheckLoader } from "./authLoader";

export const productsLoader = async (args: LoaderFunctionArgs) => {
  const authResult = await authCheckLoader(args);
  if (authResult) return authResult;

  try {
    await queryClient.ensureInfiniteQueryData(infiniteProductQuery());
    return null;
  } catch (err) {
    throw new Response("Failed to load products", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export const productLoader = async (args: LoaderFunctionArgs) => {
  const authResult = await authCheckLoader(args);
  if (authResult) return authResult;

  try {
    const id = args.params.productId;
    if (!id) {
      throw new Error("No product ID provided");
    }
    await queryClient.ensureQueryData(oneProductQuery(id));
    return { productId: id };
  } catch (error) {
    throw new Response("Failed to load one product", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
