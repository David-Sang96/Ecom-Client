/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_URL, fetchAuthApi } from "@/api";
import useAuthStore, { Status } from "@/store/authStore";
import { AxiosError } from "axios";
import { LoaderFunctionArgs, redirect } from "react-router";

export const authCheckLoader = async ({ request }: LoaderFunctionArgs) => {
  const path = new URL(request.url).pathname;
  const auth = useAuthStore.getState();
  const isAuthPage = path.startsWith("/auth");

  // Don't re-check if already banned the user and on an auth page
  if (auth.isBanned && isAuthPage) {
    return null;
  }

  try {
    const { data, status } = await fetchAuthApi.get(`${API_URL}/verify-auth`);
    if (data.success && status === 200) {
      if (data.user.isBanned) {
        auth.clearAuth();
        auth.setBanned(true);
        return redirect("/auth/login");
      }

      // Logged-in users trying to go to login/register -> block
      if (isAuthPage) {
        return redirect("/");
      }
    }
    return null;
  } catch (error) {
    // Not logged in and trying to go to protected page -> redirect to login
    if (!isAuthPage) {
      return redirect(`/auth/login?redirectTo=${encodeURIComponent(path)}`);
    }
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

export const newPasswordLoader = () => {
  const auth = useAuthStore.getState();
  if (auth.status !== Status.forget) {
    return redirect("/auth/forget-password");
  }
  return null;
};

export const authenticationLoader = () => {
  const auth = useAuthStore.getState();
  if (auth.id && auth.email && auth.name) {
    return redirect("/");
  }
  return null;
};
