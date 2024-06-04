import { forwardRef } from "react";
import { Icon, IconifyIcon } from "@iconify/react";

import Box from "@mui/material/Box";
import { Theme, SxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface Props {
  icon: IconifyIcon | string;
  sx?: SxProps<Theme>;
  width?: number;
  onClick?: () => void;
}

export default forwardRef<typeof Box, Props>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  ),
);
