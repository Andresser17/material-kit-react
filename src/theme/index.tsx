import { useMemo, ReactNode } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import { palette } from "./palette";
import { shadows } from "./shadows";
import { overrides } from "./overrides";
import { typography } from "./typography";
import { customShadows } from "./custom-shadows";

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const memoizedValue = useMemo(
    () =>
      ({
        palette: palette("dark"),
        typography,
        shadows: shadows(),
        customShadows: customShadows(),
        shape: { borderRadius: 8 },
      }) as ThemeOptions,
    [],
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
