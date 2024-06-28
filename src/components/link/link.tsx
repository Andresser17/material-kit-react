import { SxProps, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { Link as LinkRouter } from "react-router-dom";
import styles from "./link.module.css";

interface ILink {
  to: string;
  children: ReactNode;
  sx?: SxProps;
}

export default function Link({ to, children, sx }: ILink) {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        color: theme.palette.primary.main,
        fontSize: "15px",
        fontWeight: "bold",
        textDecoration: "none",
        "&:hover": {
          color: theme.palette.primary.dark,
          textDecoration: "underline",
        },
        ...sx,
      }}
    >
      <LinkRouter to={to} className={styles.link}>
        {children}
      </LinkRouter>
    </Typography>
  );
}
