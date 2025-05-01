import fetchApi, { fetchAuthApi } from "@/api";
import useAuthStore, { Status } from "@/store/authStore";
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
      return { message: error.response?.data || "something went wrong" };
    }
    return { message: "Something went wrong" };
  }
};

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentails = Object.fromEntries(formData);
  const auth = useAuthStore.getState();

  try {
    const response = await fetchAuthApi.post("/login", credentails);
    if (response.status !== 201) {
      return response.data || "Login failed";
    }

    const userInfo = {
      id: response.data.user.id,
      name: response.data.user.name,
      email: response.data.user.email,
      role: response.data.user.role,
      status: Status.none,
    };

    auth.setAuth(userInfo);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || "something went wrong";
    }
    return { message: "Something went wrong", success: false };
  }
};

export const logoutAction = async ({ request }: ActionFunctionArgs) => {
  const auth = useAuthStore.getState();

  try {
    await fetchApi.post("/logout");
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") || "/";
    auth.clearAuth();
    return redirect(`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data || "something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

export const forgetPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const auth = useAuthStore.getState();

  try {
    const response = await fetchAuthApi.post("/forget", { email });
    const userInfo = {
      id: auth.id,
      name: auth.name,
      email: auth.email,
      role: auth.role,
      status: Status.forget,
    };
    auth.setAuth(userInfo);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || "something went wrong";
    }
    return { message: "something went wrong", success: false };
  }
};

export const newPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await fetchAuthApi.post("/forget-password", credentials);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || "something went wrong";
    }
    return { message: "something went wrong", success: false };
  }
};
