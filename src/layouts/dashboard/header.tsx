import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import Iconify from "src/components/iconify";

import AccountPopover from "./common/account-popover";
import NotificationsPopover from "./common/notifications-popover";
import Searchbar from "./common/searchbar";
import { HEADER, NAV } from "./config-layout";

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }: { onOpenNav: () => void }) {
  const theme = useTheme();

  const lgUp = useResponsive("up", "lg", "lg");

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        // ...bgBlur({
        //   color: theme.palette.background.default,
        //   blur: 0,
        //   opacity: 0,
        // }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
