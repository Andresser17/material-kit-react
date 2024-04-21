import { ReactNode } from "react";

import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import { NAV, HEADER } from "./config-layout";

// ----------------------------------------------------------------------

const SPACING = 8;

interface IMain {
  children: ReactNode;
  sx?: SxProps;
}

export default function Main({ children, sx, ...props }: IMain) {
  const lgUp = useResponsive("up", "lg", "lg");

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
