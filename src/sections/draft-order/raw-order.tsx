import { Box, Card, Divider, IconButton, Typography } from "@mui/material";

import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";

export default function RawOrder() {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Typography variant="h4">Raw Draft Order</Typography>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Card
        sx={{
          backgroundColor: "background.neutral",
          p: 2,
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="body2" sx={{ color: "#888" }}>
              {`{...}`}
            </Typography>
            <Typography variant="body2" sx={{ ml: 1, color: "#888" }}>
              (12 items)
            </Typography>
          </Box>

          <IconButton sx={{ borderRadius: "5px" }}>
            <Iconify icon="ep:arrow-down-bold" sx={{ width: 16, height: 16 }} />
          </IconButton>
        </Box>
      </Card>
    </SectionBox>
  );
}
