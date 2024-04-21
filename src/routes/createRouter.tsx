import { lazy, Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "src/layouts/dashboard";

export const IndexPage = lazy(() => import("src/pages/app"));
export const UserPage = lazy(() => import("src/pages/user"));
export const ProductsPage = lazy(() => import("src/pages/products"));
export const AddProductPage = lazy(() => import("src/pages/add-product"));
export const LoginPage = lazy(() => import("src/pages/login"));
export const ErrorPage = lazy(() => import("src/pages/error-page"));

// ----------------------------------------------------------------------

export function createRouter(isLoggedIn: boolean) {
  return createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { path: "", element: <IndexPage />, index: true },
        { path: "user", element: <UserPage /> },
        {
          path: "products",
          element: <ProductsPage />,
        },
        { path: "products/add", element: <AddProductPage /> },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: !isLoggedIn ? <LoginPage /> : <Navigate to="/"></Navigate>,
    },
  ]);
}
