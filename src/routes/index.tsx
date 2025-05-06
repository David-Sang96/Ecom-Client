import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));

const HomePage = lazy(() => import("@/pages/HomePage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const ForgetPasswordPage = lazy(
  () => import("@/pages/auth/ForgetPasswordPage")
);
const EmailVerificationPage = lazy(
  () => import("@/pages/auth/EmailVerificationPage")
);
const NewPasswordPage = lazy(() => import("@/pages/auth/NewPasswordPage"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

import { AuthSkeleton } from "@/components/skeletons/AuthSkeleton";

import {
  forgetPasswordAction,
  loginAction,
  logoutAction,
  newPasswordAction,
  RegisterAction,
  resetPasswordAction,
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
      {
        path: "me",
        element: <ProfilePage />,
        loader: authCheckLoader,
        action: resetPasswordAction,
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
        element: (
          <Suspense fallback={<AuthSkeleton />}>
            <ForgetPasswordPage />
          </Suspense>
        ),
        action: forgetPasswordAction,
        loader: authCheckLoader,
      },
      {
        path: "new-password",
        element: (
          <Suspense fallback={<AuthSkeleton />}>
            <NewPasswordPage />
          </Suspense>
        ),
        loader: newPasswordLoader,
        action: newPasswordAction,
      },

      {
        path: "verify-email",
        element: <EmailVerificationPage />,
        loader: verifyEmailLoader,
      },
    ],
  },
]);
