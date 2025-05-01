import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router";

// lazy load layouts
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));

// lazy load pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const ForgetPasswordPage = lazy(
  () => import("@/pages/auth/ForgetPasswordPage")
);
const ResetPasswordPage = lazy(() => import("@/pages/auth/ResetPasswordPage"));
const EmailVerificationPage = lazy(
  () => import("@/pages/auth/EmailVerificationPage")
);
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));

// loader

import { AuthSkeleton } from "@/components/skeletons/AuthSkeleton";
import AboutPage from "@/pages/AboutPage";
import NewPasswordPage from "@/pages/auth/NewPasswordPage";
import {
  forgetPasswordAction,
  loginAction,
  logoutAction,
  newPasswordAction,
  RegisterAction,
} from "./actions/authAction";
import {
  authCheckLoader,
  newPasswordLoader,
  verifyEmailLoader,
} from "./loaders/authLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>loading...</p>}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<p>loading...</p>}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: authCheckLoader,
      },
      {
        path: "about",
        element: <AboutPage />,
        loader: authCheckLoader,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<AuthSkeleton />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<AuthSkeleton />}>
            <RegisterPage />
          </Suspense>
        ),
        action: RegisterAction,
        loader: authCheckLoader,
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<AuthSkeleton />}>
            <LoginPage />
          </Suspense>
        ),
        action: loginAction,
        loader: authCheckLoader,
      },
      {
        path: "logout",
        action: logoutAction,
        loader: () => redirect("/"),
      },
      {
        path: "forget-password",
        element: <ForgetPasswordPage />,
        action: forgetPasswordAction,
        loader: authCheckLoader,
      },
      {
        path: "new-password",
        element: <NewPasswordPage />,
        loader: newPasswordLoader,
        action: newPasswordAction,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
        loader: authCheckLoader,
      },
      {
        path: "verify-email",
        element: <EmailVerificationPage />,
        loader: verifyEmailLoader,
      },
    ],
  },
]);
