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
      return {
        message: error.response?.data.message || "something went wrong",
      };
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
      image: response.data.user.image,
      accountStatus: response.data.user.accStatus,
      isEmailVerified: response.data.user.isEmailVerified,
      updatedAt: response.data.user.updatedAt,
      role: response.data.user.role,
      status: Status.none,
      isDeactivated: response.data.isDeactivated,
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
    localStorage.removeItem("auth-credentails");
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
      ...auth,
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

export const resetPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    const response = await fetchApi.post("/reset-password", credentials);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || "Something went wrong";
    }
    return { message: "Something went wrong", success: false };
  }
};
