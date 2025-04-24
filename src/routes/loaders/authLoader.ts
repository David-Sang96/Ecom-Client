/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_URL, fetchAuthApi } from "@/api";
import { LoaderFunctionArgs, redirect } from "react-router";

export const authCheckLoader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await fetchAuthApi.get(`${API_URL}/verify-auth`);
    console.log(user);
    return null;
  } catch (error) {
    const currentPath = new URL(request.url).pathname;
    throw redirect(`/auth/login?redirectTo=${encodeURIComponent(currentPath)}`);
  }
};
