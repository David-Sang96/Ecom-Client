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
  queryKey: ["products", "infinite", categories ?? undefined],
  queryFn: ({ pageParam }: { pageParam?: string | null }) =>
    fetchInfiniteProducts({ categories, pageParam }),
  placeholderData: keepPreviousData,
  initialPageParam: null,
  // @ts-expect-error notype
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
});

export const oneProductQuery = (id: string) => ({
  queryKey: ["products", "detail", id],
  queryFn: async () => {
    const response = await fetchApi.get(`/product/${id}`);
    if (!response) {
      throw new Response("", { status: 404, statusText: "Product not found" });
    }
    return response.data;
  },
});

export const ordersQuery = (id: string) => ({
  queryKey: ["products", "order", id],
  queryFn: async () => {
    const response = await fetchApi.get(`/product/orders/${id}`);
    if (!response) {
      throw new Response("", { status: 404, statusText: "Order not found" });
    }
    return response.data;
  },
});
