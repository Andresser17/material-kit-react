import { forwardRef, memo } from "react";

import Box from "@mui/material/Box";

import { SxProps } from "@mui/material";
import { StyledRootScrollbar, StyledScrollbar } from "./styles";
// ----------------------------------------------------------------------

interface ScrollbarProps {
  children: React.ReactNode;
  sx?: SxProps;
}

const Scrollbar = forwardRef<typeof StyledRootScrollbar, ScrollbarProps>(
  ({ children, sx, ...other }, ref) => {
    const userAgent =
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );

    if (mobile) {
      return (
        <Box ref={ref} sx={{ overflow: "auto", ...sx }} {...other}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar
          scrollableNodeProps={{
            ref,
          }}
          clickOnTrack={false}
          sx={sx}
          {...other}
        >
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  },
);

export default memo(Scrollbar);
