import { Breakpoint, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ----------------------------------------------------------------------

export function useResponsive(
  query: string,
  start: Breakpoint,
  end: Breakpoint,
) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === "up") {
    return mediaUp;
  }

  if (query === "down") {
    return mediaDown;
  }

  if (query === "between") {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

export function useWidth(): Breakpoint {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  const key = keys.find((key) => {
    const matches = useMediaQuery(theme.breakpoints.up(key));
    if (matches) return key;
  });

  return key ? key : "lg";

  // return (
  //   keys.reduce((prev, key, i) => {
  //     const matches = useMediaQuery(theme.breakpoints.up(key));
  //     return prev === null && matches ? key : prev;
  //   }, null)
  // );
}
