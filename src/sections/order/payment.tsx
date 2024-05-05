import Box from "@mui/material/Box";
import { Button, Divider, Typography } from "@mui/material";

import { PaymentStatus } from "src/enums";

import Label from "src/components/label";
import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";

interface IPayment {
  status: PaymentStatus;
}

export default function Payment({ status }: IPayment) {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Payment</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Label
            color={status === PaymentStatus.CAPTURED ? "success" : "info"}
            sx={{ mr: 1 }}
          >
            {status}
          </Label>
          <Button size="small" variant="outlined" sx={{ fontWeight: "normal" }}>
            Refund
          </Button>
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Typography variant="subtitle2">pay_id</Typography>
      <SummaryField
        title="12 Apr 2024 05:05"
        value="$50.00 USD"
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField title="Total paid" value="$50.00" bold />
    </SectionBox>
  );
}
