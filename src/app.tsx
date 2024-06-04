import { useState } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "src/global.css";
import AppRoutes from "src/routes";

import { store } from "./redux/store";
import { BACKEND_URL } from "./config";
import ThemeProvider from "./theme/index";
import { getUser } from "./utils/user-local-storage";
import ModalProvider from "./modals/modal-provider/modal-provider";

// ----------------------------------------------------------------------

export default function App() {
  const user = getUser();
  const [refreshingToken, setRefreshingToken] = useState(false);

  const refreshAuthToken = async () => {
    if (!refreshingToken && user?.access_token) {
      try {
        setRefreshingToken(true);
        const url = new URL(`/admin/auth`, BACKEND_URL);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.access_token}}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Unauthorized");
      } catch {
        // If refreshing token fails, redirect back to the home page
        window.location.href = "/login";
      } finally {
        setRefreshingToken(false);
      }
    }
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30000, // 30 seconds
            retry: (failureCount, error) => {
              // Don't retry for certain error responses
              if (
                error?.response?.status === 400 ||
                error?.response?.status === 401
              ) {
                return false;
              }

              // Retry others just once
              return failureCount <= 1;
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            console.log({ error });
            if (
              error?.response?.status === 400 ||
              error?.response?.status === 401
            ) {
              refreshAuthToken();
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <ModalProvider>
            <AppRoutes />
            <Toaster />
          </ModalProvider>
        </ThemeProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </Provider>
    </QueryClientProvider>
  );
}
