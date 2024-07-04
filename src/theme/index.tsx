import { ReactNode, useMemo } from "react";

import {
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
  createTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { customShadows } from "./custom-shadows";
import { overrides } from "./overrides";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";

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
