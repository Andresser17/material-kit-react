import { useEffect } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import { alpha } from "@mui/material/styles";
import { Divider, Typography } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";

import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { useResponsive } from "src/hooks/use-responsive";

import Logo from "src/components/logo";
import Scrollbar from "src/components/scrollbar";

import { NAV } from "./config-layout";
import { navSections, NavSectionLinkType } from "./config-navigation";

// ----------------------------------------------------------------------

export default function Nav({
  openNav,
  onCloseNav,
}: {
  openNav: boolean;
  onCloseNav: () => void;
}) {
  const pathname = usePathname();

  const upLg = useResponsive("up", "lg", "xl");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const sectionsAndLinks = navSections.map((section) => {
    if (section?.children) {
      return (
        <Box key={section.title} sx={{ px: 0 }}>
          <Typography variant="subtitle2" sx={{ px: 2 }}>
            {section.title}
          </Typography>
          <Stack
            component="ul"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={0.5}
            sx={{ px: 0 }}
          >
            {section.children.map((navLink) => (
              <NavItem
                key={navLink.title}
                title={navLink.title}
                path={navLink.path}
                icon={navLink.icon}
              />
            ))}
          </Stack>
        </Box>
      );
    }

    return (
      <Stack key={section.title} component="nav" spacing={0.5} sx={{ px: 0 }}>
        <NavItem
          key={section.title}
          title={section.title}
          path={section.path ?? ""}
          icon={section.icon}
        />
      </Stack>
    );
  });

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 4 }} />

      {sectionsAndLinks}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ title, path, icon }: NavSectionLinkType) {
  const pathname = usePathname();

  const active = path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={path}
      sx={{
        minHeight: 24,
        borderRadius: 0.25,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        px: 3.25,
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 18, height: 18, mr: 2 }}>
        {icon}
      </Box>

      <Box component="span">{title} </Box>
    </ListItemButton>
  );
}
