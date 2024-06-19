import { SetStateAction, useState } from "react";

import {
  Divider,
  IconButton,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";

export default function TimelineSection() {
  const [open, setOpen] = useState<Element | null>(null);

  const handleOpenMenu = (e: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCancelOrder = () => {};

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Timeline</Typography>
        <IconButton onClick={handleOpenMenu} sx={{ borderRadius: "5px" }}>
          <Iconify icon="bi-three-dots" />
        </IconButton>
      </Box>
      <TextField placeholder="Write a note..." />
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Note />
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Go to Customer
        </MenuItem>
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Transfer ownership
        </MenuItem>
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Edit Shipping Address
        </MenuItem>
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Edit Email Address
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}

function Note() {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
        Items Shipped
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 12, color: "#888", mb: 1 }}>
        23 days ago
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">GPU</Typography>
        <Typography variant="body2" sx={{ color: "secondary.main" }}>
          x5
        </Typography>
      </Box>
    </Box>
  );
}
