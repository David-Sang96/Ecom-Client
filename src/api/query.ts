import { QueryClient } from "@tanstack/react-query";
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
