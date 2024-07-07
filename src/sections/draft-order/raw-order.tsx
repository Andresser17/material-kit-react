import { DraftOrder } from "@medusajs/types";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";

import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";

interface IRawOrder {
  draftOrder: DraftOrder;
}

export default function RawOrder({ draftOrder }: IRawOrder) {
  const rawDataLength = Object.keys(draftOrder ?? {}).length;

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Typography variant="h4">Raw Draft Order</Typography>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Accordion
        sx={{
          backgroundColor: "background.neutral",
          p: 1,
          borderRadius: "1px",
        }}
      >
        <AccordionSummary
          expandIcon={
            <Iconify icon="ep:arrow-down-bold" sx={{ width: 16, height: 16 }} />
          }
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="body2" sx={{ color: "#888" }}>
              {`{...}`}
            </Typography>
            <Typography variant="body2" sx={{ ml: 1, color: "#888" }}>
              ({rawDataLength} items)
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </SectionBox>
  );
}
