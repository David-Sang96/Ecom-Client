/* eslint-disable @typescript-eslint/no-unused-vars */
import fetchApi from "@/api";
import {
  infiniteProductQuery,
  oneProductQuery,
  ordersQuery,
  queryClient,
} from "@/api/query";
import useAuthStore from "@/store/authStore";
import { Access, useCartStore } from "@/store/cartStore";
import { AxiosError } from "axios";
import { LoaderFunctionArgs, redirect } from "react-router";
import { authCheckLoader } from "./authLoader";

export const productsLoader = async () => {
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

export const productLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const id = params.productId;
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

export const cartLoader = async (args: LoaderFunctionArgs) => {
  const authResult = await authCheckLoader(args);
  if (authResult) return authResult;

  const cartItem = useCartStore.getState();
  if (cartItem.items.length === 0) {
    return redirect("/products");
  }
  return null;
};

export const successLoader = async (args: LoaderFunctionArgs) => {
  const authResult = await authCheckLoader(args);
  if (authResult) return authResult;
  const setAccess = useCartStore.getState().setAccess;

  const { searchParams } = new URL(args.request.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId) return redirect("/");

  try {
    const { data } = await fetchApi.post("/product/check-stripeId", {
      sessionId,
    });

    if (!data.success) return redirect("/");

    if (data.success) {
      const response = await fetchApi.post("/product/confirm-order", {
        sessionId,
      });
      setAccess(Access.success);
      return { data: response.data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { err: error.message };
    }
  }
};

export const orderLoader = async (args: LoaderFunctionArgs) => {
  const authResult = await authCheckLoader(args);
  if (authResult) return authResult;

  const userInfo = useAuthStore.getState();
  try {
    const userId = userInfo.id;
    await queryClient.ensureQueryData(ordersQuery(userId!));
    return null;
  } catch (error) {
    throw new Response("Failed to load orders", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
