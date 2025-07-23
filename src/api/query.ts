/* eslint-disable @typescript-eslint/no-unused-vars */
import { keepPreviousData, QueryClient } from "@tanstack/react-query";
import fetchApi from ".";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      //   retry : 2  default is 3
    },
  },
});

// const fetchProducts = async (q?: string) => {
//   const response = await fetchApi.get(`/product${q ?? ""}`);
//   return response.data;
// };

/* ---------------------------  USER PRODUCT ---------------------------------------------- */

export const productQuery = (q?: string) => ({
  queryKey: ["products", q],
  queryFn: async () => {
    const response = await fetchApi.get(`/product${q ?? ""}`);
    return response.data;
  },
});

const fetchInfiniteProducts = async ({
  pageParam = null,
  categories = null,
}: {
  pageParam?: string | null;
  categories?: string | null;
}) => {
  const params = new URLSearchParams({ limit: "6" });
  if (pageParam) params.append("cursor", pageParam);
  if (categories) params.append("category", categories);
  const response = await fetchApi.get(`/product?${params}`);
  return response.data;
};

export const infiniteProductQuery = (categories: string | null = null) => ({
  queryKey: ["products", "infinite", categories],
  queryFn: ({ pageParam }: { pageParam?: string | null }) =>
    fetchInfiniteProducts({ categories, pageParam }),
  placeholderData: keepPreviousData,
  initialPageParam: null,
  // @ts-expect-error notype
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
});

export const oneProductQuery = (productId: string) => ({
  queryKey: ["products", "details", productId],
  queryFn: async () => {
    const response = await fetchApi.get(`/product/${productId}`);
    if (!response) {
      throw new Response("", { status: 404, statusText: "Product not found" });
    }
    return response.data;
  },
});

/* ----------------------------- USER ORDER ------------------------------------------------------- */

export const allUserOrdersQuery = () => ({
  queryKey: ["orders", "all"],
  queryFn: async () => {
    const res = await fetchApi.get("/order/all");
    return res.data;
  },
});

export const oneOrderQuery = (orderId: string) => ({
  queryKey: ["orders", "details", orderId],
  queryFn: async () => {
    const res = await fetchApi.get(`/order/${orderId}`);
    return res.data;
  },
});

/* ---------------------------  ADMIN PRODUCT ---------------------------------------------- */

export const allProductsQuery = () => ({
  queryKey: ["products", "all"],
  queryFn: async () => {
    const response = await fetchApi.get("/admin/product");
    return response.data;
  },
});

export const productSaleQuery = () => ({
  queryKey: ["products", "sales"],
  queryFn: async () => {
    const response = await fetchApi.get("/admin/product/product-sales");
    return response.data;
  },
});

/* ---------------------------  ADMIN ORDER ---------------------------------------------- */

export const lastSevendaysOrdersQuery = () => ({
  queryKey: ["orders", "seven"],
  queryFn: async () => {
    const response = await fetchApi.get("/admin/order");
    return response.data;
  },
});

export const allOrdersQuery = () => ({
  queryKey: ["orders", "all"],
  queryFn: async () => {
    const response = await fetchApi.get("/admin/order/all");
    return response.data;
  },
});

export const adminOneOrderQuery = (orderId: string) => ({
  queryKey: ["orders", "details", orderId],
  queryFn: async () => {
    const response = await fetchApi.get(`/admin/order/${orderId}`);
    if (!response) {
      throw new Response("", { status: 404, statusText: "Order not found" });
    }
    return response.data;
  },
});

/* --------------------------------ADMIN USER ------------------------------------------------- */

export const allUsersQuery = () => ({
  queryKey: ["users", "all"],
  queryFn: async () => {
    const response = await fetchApi.get("/admin/user");
    return response.data;
  },
});

export const oneUserQuery = (userId: string) => ({
  queryKey: ["users", "details", userId],
  queryFn: async () => {
    const response = await fetchApi.get(`/admin/user/${userId}`);
    return response.data;
  },
});
