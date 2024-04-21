import { RouterProvider } from "react-router-dom";

import { createRouter } from "src/routes/createRouter";

import { useUser } from "src/queries/use-user";


export default function AppRoutes() {
  const { user } = useUser();
  const router = createRouter(user?.access_token != null);

  return <RouterProvider router={router} />;
}
