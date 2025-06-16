import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, redirect } from "react-router";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));

import ErrorPage from "@/pages/ErrorPage";
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

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ProductDetailPage = lazy(
  () => import("@/pages/product/ProductDetailPage"),
);
const ProductsPage = lazy(() => import("@/pages/product/ProductsPage"));
const CartPage = lazy(() => import("@/pages/product/CartPage"));

import { AuthSkeleton } from "@/components/skeletons/AuthSkeleton";
import { PreviousRouteProvider } from "@/context/RouteContext";
import AdminLayout from "@/layouts/AdminLayout";
import AdminOrderLayout from "@/layouts/AdminOrderLayout";
import AdminProductLayout from "@/layouts/AdminProductLayout";
import ProductLayout from "@/layouts/ProductLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import NewProductPage from "@/pages/admin/NewProductPage";
import OrderDetailsPage from "@/pages/admin/OrderDetailsPage";
import AdminOrdersPage from "@/pages/admin/OrdersPage";
import AdminProductsPage from "@/pages/admin/ProductsPage";
import SettingPage from "@/pages/admin/SettingPage";
import UpdateProductPage from "@/pages/admin/UpdateProductPage";
import UsersPage from "@/pages/admin/UsersPage";
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
  adminOneOrderLoader,
  adminOneProductLoader,
  adminOrdersLoader,
  adminProductsLoader,
} from "./loaders/adminLoader";
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
    element: (
      <PreviousRouteProvider>
        <RootLayout />
      </PreviousRouteProvider>
    ),
    loader: authCheckLoader,
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
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "me",
        element: <ProfilePage />,
        action: resetPasswordAction,
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
        loader: () => <Navigate to={"/login"} replace />,
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
  {
    path: "/admin",
    element: (
      <PreviousRouteProvider>
        <AdminLayout />
      </PreviousRouteProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "orders",
        element: <AdminOrderLayout />,
        children: [
          {
            index: true,
            element: <AdminOrdersPage />,
            loader: adminOrdersLoader,
          },
          {
            path: ":orderId",
            element: <OrderDetailsPage />,
            loader: adminOneOrderLoader,
          },
        ],
      },
      {
        path: "products",
        element: <AdminProductLayout />,
        children: [
          {
            index: true,
            element: <AdminProductsPage />,
            loader: adminProductsLoader,
          },
          {
            path: ":productId",
            element: <UpdateProductPage />,
            loader: adminOneProductLoader,
          },
          {
            path: "new",
            element: <NewProductPage />,
          },
        ],
      },

      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "settings",
        element: <SettingPage />,
      },
    ],
  },
]);
