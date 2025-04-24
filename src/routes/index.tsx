import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import EmailVerificationPage from "../pages/auth/EmailVerificationPage";
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import HomePage from "../pages/HomePage";
import { authCheckLoader } from "./loaders/authLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: authCheckLoader,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forget-password",
        element: <ForgetPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
        loader: authCheckLoader,
      },
      {
        path: "verify-email",
        element: <EmailVerificationPage />,
      },
    ],
  },
]);
