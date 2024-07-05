import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Invoice from "src/components/invoice";

import DashboardLayout from "src/layouts/dashboard";

export const IndexPage = lazy(() => import("src/pages/app"));
export const UserPage = lazy(() => import("src/pages/user"));
export const ProductsPage = lazy(() => import("src/pages/products"));
export const ProductPage = lazy(() => import("src/pages/product"));
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
export const CreateLotPage = lazy(() => import("src/pages/create-lot"));
export const LoginPage = lazy(() => import("src/pages/login"));
export const ErrorPage = lazy(() => import("src/pages/error-page"));
export const CustomersPage = lazy(() => import("src/pages/customers"));
export const CustomerPage = lazy(() => import("src/pages/customer"));

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
        { path: "products/:id", element: <ProductPage /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "orders/:id", element: <OrderDetailsPage /> },
        { path: "draft-orders", element: <DraftOrdersPage /> },
        { path: "draft-orders/create", element: <CreateDraftOrderPage /> },
        { path: "draft-orders/:id", element: <DraftOrderDetailsPage /> },
        { path: "lots", element: <LotsPage /> },
        { path: "lots/create", element: <CreateLotPage /> },
        { path: "lots/:id", element: <LotPage /> },
        {
          path: "customers",
          element: <CustomersPage />,
        },
        {
          path: "customers/:id",
          element: <CustomerPage />,
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: !isLoggedIn ? <LoginPage /> : <Navigate to="/"></Navigate>,
    },
    {
      path: "/invoice",
      element: <Invoice />,
    },
  ]);
}
