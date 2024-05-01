import { ReactNode, forwardRef } from "react";

import Box from "@mui/material/Box";
import { SxProps, useTheme } from "@mui/material";

// ----------------------------------------------------------------------

export interface ISectionBox {
  children: ReactNode;
  sx?: SxProps;
}

const SectionBox = forwardRef<typeof Box, ISectionBox>(
  ({ children, sx, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Box
        className="section-box"
        ref={ref}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 1,
          p: 3,
          mb: 3,
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

export default SectionBox;
