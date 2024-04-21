import { ReactNode, forwardRef } from "react";

import Box from "@mui/material/Box";
import { SxProps, useTheme } from "@mui/material/styles";

import { StyledLabel } from "./styles";

// ----------------------------------------------------------------------

export type Variant = "filled" | "outlined" | "ghost" | "soft";

export type Color =
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

interface ILabel {
  children: ReactNode;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  sx?: SxProps;
  variant?: Variant;
  color?: Color;
}

const Label = forwardRef<typeof StyledLabel, ILabel>(
  (
    {
      children,
      color = "default",
      variant = "soft",
      startIcon,
      endIcon,
      sx,
      ...other
    },
    ref,
  ) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      "& svg, img": { width: 1, height: 1, objectFit: "cover" },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
      </StyledLabel>
    );
  },
);

export default Label;
