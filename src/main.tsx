import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./app.tsx";

// ----------------------------------------------------------------------

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
