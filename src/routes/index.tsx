import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));

const HomePage = lazy(() => import("@/pages/HomePage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const ForgetPasswordPage = lazy(
  () => import("@/pages/auth/ForgetPasswordPage"),
);
const EmailVerificationPage = lazy(
  () => import("@/pages/auth/EmailVerificationPage"),
);
const NewPasswordPage = lazy(() => import("@/pages/auth/NewPasswordPage"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ProductDetailPage = lazy(
  () => import("@/pages/product/ProductDetailPage"),
);
const ProductsPage = lazy(() => import("@/pages/product/ProductsPage"));
const CartPage = lazy(() => import("@/pages/product/CartPage"));

import { AuthSkeleton } from "@/components/skeletons/AuthSkeleton";
import ProductLayout from "@/layouts/ProductLayout";
import ContactPage from "@/pages/ContactPage";
import OrdersPage from "@/pages/product/OrdersPage";
import SuccessPage from "@/pages/product/SuccessPage";
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
import { homeAuthLoader } from "./loaders/homeLoader";
import {
  cartLoader,
  productLoader,
  productsLoader,
  successLoader,
} from "./loaders/productLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeAuthLoader,
      },
      {
        path: "about",
        element: <AboutPage />,
        loader: authCheckLoader,
      },
      {
        path: "contact",
        element: <ContactPage />,
        loader: authCheckLoader,
      },
      {
        path: "me",
        element: <ProfilePage />,
        action: resetPasswordAction,
        loader: authCheckLoader,
      },
      {
        path: "products",
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <ProductsPage />,
            loader: productsLoader,
          },
          {
            path: ":productId",
            element: <ProductDetailPage />,
            loader: productLoader,
          },
        ],
      },
      {
        path: "cart",
        element: <CartPage />,
        loader: cartLoader,
      },
      {
        path: "cancel",
        loader: () => redirect("/cart"),
      },
      {
        path: "success",
        element: <SuccessPage />,
        loader: successLoader,
      },
      {
        path: "orders",
        element: <OrdersPage />,
        // loader: orderLoader,
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
