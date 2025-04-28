/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_URL, fetchAuthApi } from "@/api";
import { AxiosError } from "axios";
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

export const verifyEmailLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const userId = url.searchParams.get("userId");

  try {
    const response = await fetchAuthApi.post("/verify-email", {
      token,
      userId,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || "something went wrong";
    }
  }
};
