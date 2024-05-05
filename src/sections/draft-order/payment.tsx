import Box from "@mui/material/Box";
import { Button, Divider, Typography } from "@mui/material";

import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";

export default function Payment() {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle1">Payment</Typography>
        <Button size="small" variant="outlined" sx={{ fontWeight: "normal" }}>
          Mark as paid
        </Button>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <SummaryField
        title="Subtotal"
        value="$50.00 USD"
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Shipping"
        value="$0.00 USD"
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Tax"
        value="$0.00 USD"
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField title="Total to pay" value="$50.00" bold />
      <Typography variant="body2" sx={{ color: "#888", fontSize: 11 }}>
        Payment link: Configure payment link to store settings
      </Typography>
    </SectionBox>
  );
}
