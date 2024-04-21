import { forwardRef } from "react";

import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";

// ----------------------------------------------------------------------

export interface ISvgColor {
  src: string;
  sx: SxProps;
}

const SvgColor = forwardRef<typeof Box, ISvgColor>(
  ({ src, sx, ...props }, ref) => (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: "inline-block",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...props}
    />
  ),
);

export default SvgColor;
