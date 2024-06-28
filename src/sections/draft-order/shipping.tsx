import { DraftOrderResponse } from "@medusajs/types";

import { Box, Card, Divider, IconButton, Typography } from "@mui/material";

import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";

interface IShipping {
  data: DraftOrderResponse;
}

export default function Shipping({ data }: IShipping) {
  const itemsLength = data?.cart.items.length;

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Typography variant="h4">Shipping</Typography>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Typography variant="body2" sx={{ color: "#888" }}>
        Shipping Method
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {data?.cart.shipping_methods[0]?.shipping_option?.name ?? "N/A"}
      </Typography>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="subtitle2">Data</Typography>
        <Typography variant="subtitle2" sx={{ ml: 0.5, color: "#888" }}>
          ({itemsLength} {itemsLength > 1 ? "items" : "item"})
        </Typography>
      </Box>
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
              (4 items)
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
