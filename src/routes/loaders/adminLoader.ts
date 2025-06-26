/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  adminOneOrderQuery,
  allOrdersQuery,
  allProductsQuery,
  allUsersQuery,
  oneProductQuery,
  oneUserQuery,
  queryClient,
} from "@/api/query";
import useAuthStore from "@/store/authStore";
import { LoaderFunctionArgs, redirect } from "react-router";

export const adminDashboardLoader = () => {
  const { role } = useAuthStore.getState();
  if (role === "USER") return redirect("/");
  return null;
};

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

export const adminOrdersLoader = async () => {
  try {
    const response = await queryClient.ensureQueryData(allOrdersQuery());
    return response;
  } catch (error) {
    throw new Response("Failed to load orders", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export const adminOneOrderLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const id = params.orderId;
    if (!id) {
      throw new Error("No order ID provided");
    }
    await queryClient.ensureQueryData(adminOneOrderQuery(id));
    return { orderId: id };
  } catch (error) {
    throw new Response("Failed to load orders", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export const adminUsersLoader = async () => {
  try {
    const response = await queryClient.ensureQueryData(allUsersQuery());
    return response;
  } catch (error) {
    throw new Response("Failed to load orders", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export const adminOneUserLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const id = params.userId;
    if (!id) {
      throw new Error("No order ID provided");
    }
    await queryClient.ensureQueryData(oneUserQuery(id));
    return { userId: id };
  } catch (error) {
    throw new Response("Failed to load orders", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

export const adminSettingLoader = async () => {
  await queryClient.ensureQueryData(allProductsQuery());
  await queryClient.ensureQueryData(allUsersQuery());
  await queryClient.ensureQueryData(allOrdersQuery());
  return null;
};
