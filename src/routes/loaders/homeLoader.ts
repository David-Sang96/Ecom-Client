import { productQuery, queryClient } from "@/api/query";

export const homeAuthLoader = async () => {
  // const authResult = await authCheckLoader(args);
  // if (authResult) return authResult;

  try {
    await queryClient.ensureQueryData(productQuery("?limit=3"));
    return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new Response("Failed to load products", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
