/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_URL, fetchAuthApi } from "@/api";
import useAuthStore, { Status } from "@/store/authStore";
import { AxiosError } from "axios";
import { LoaderFunctionArgs, redirect } from "react-router";

export const authCheckLoader = async ({ request }: LoaderFunctionArgs) => {
  const path = new URL(request.url).pathname;
  try {
    const { data, status } = await fetchAuthApi.get(`${API_URL}/verify-auth`);
    if (data.success && status === 200) {
      if (path.startsWith("/auth")) {
        return redirect("/");
      }
    }
  } catch (error) {
    if (!path.startsWith("/auth")) {
      return redirect(`/auth/login?redirectTo=${encodeURIComponent(path)}`);
    }
  }
  return null;
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

export const newPasswordLoader = () => {
  const auth = useAuthStore.getState();
  if (auth.status !== Status.forget) {
    return redirect("/auth/forget-password");
  }
  return null;
};
