import { lazy, Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "src/layouts/dashboard";

export const IndexPage = lazy(() => import("src/pages/app"));
export const UserPage = lazy(() => import("src/pages/user"));
export const ProductsPage = lazy(() => import("src/pages/products"));
export const AddProductPage = lazy(() => import("src/pages/add-product"));
export const OrdersPage = lazy(() => import("src/pages/orders"));
export const OrderDetailsPage = lazy(() => import("src/pages/order"));
export const DraftOrdersPage = lazy(() => import("src/pages/draft-orders"));
export const CreateDraftOrderPage = lazy(
  () => import("src/pages/create-draft-order"),
);
export const DraftOrderDetailsPage = lazy(
  () => import("src/pages/draft-order"),
);
export const LotsPage = lazy(() => import("src/pages/lots"));
export const LotPage = lazy(() => import("src/pages/lot"));
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
        { path: "products/:id", element: <AddProductPage /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "orders/:id", element: <OrderDetailsPage /> },
        { path: "draft-orders", element: <DraftOrdersPage /> },
        { path: "draft-orders/create", element: <CreateDraftOrderPage /> },
        { path: "draft-orders/:id", element: <DraftOrderDetailsPage /> },
        { path: "lots", element: <LotsPage /> },
        { path: "lots/create", element: <CreateDraftOrderPage /> },
        { path: "lots/:id", element: <LotPage /> },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: !isLoggedIn ? <LoginPage /> : <Navigate to="/"></Navigate>,
    },
  ]);
}
