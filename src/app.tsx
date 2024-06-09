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
import ThemeProvider from "./theme/index";
import ModalProvider from "./modals/modal-provider";
import { removeUser } from "./utils/user-local-storage";

// ----------------------------------------------------------------------

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30000, // 30 seconds
            retry: (failureCount, error) => {
              // Don't retry for certain error responses
              if (error?.status === 400 || error?.status === 401) {
                return false;
              }

              // Retry others just once
              return failureCount <= 1;
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (error?.status === 400 || error?.status === 401) {
              removeUser();
              window.location.href = "/login";
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
