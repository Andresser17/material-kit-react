import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "src/global.css";
import AppRoutes from "src/routes";

import { store } from "./redux/store";
import ThemeProvider from "./theme/index";
import ModalProvider from "./modals/modal-provider/modal-provider";

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function App() {
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
