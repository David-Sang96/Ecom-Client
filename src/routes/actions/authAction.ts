import fetchApi, { fetchAuthApi } from "@/api";
import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router";

export const RegisterAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await fetchAuthApi.post("/register", credentials);
    if (response.status !== 201) {
      return response.data || "Register failed";
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || "something went wrong";
    }
  }
};

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentails = Object.fromEntries(formData);

  try {
    const response = await fetchAuthApi.post("/login", credentails);
    if (response.status !== 200) {
      return response.data || "Login failed";
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || "something went wrong";
    }
  }
};

export const logoutAction = async ({ request }: ActionFunctionArgs) => {
  try {
    await fetchApi.post("/logout");
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") || "/";
    return redirect(`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};
