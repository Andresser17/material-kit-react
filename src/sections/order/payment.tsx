import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { PaymentStatus } from "src/enums";

import { Order } from "@medusajs/types";
import Label from "src/components/label";
import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";
import { formatCurrency } from "src/utils/format-number";
import { formatToLocalTimeEs } from "src/utils/format-time";

interface IPayment {
  order: Order;
  status: PaymentStatus;
}

export default function Payment({ order, status }: IPayment) {
  const totalAmount = order.payments.reduce((prev, current) => {
    return prev + current.amount;
  }, 0);

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

      {order.payments.map((payment) => {
        return (
          <Box key={payment.id}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {payment.id}
            </Typography>
            <SummaryField
              title={formatToLocalTimeEs(payment.created_at)}
              value={formatCurrency(payment.amount)}
              sx={{ color: "#888", fontSize: 14 }}
            />
          </Box>
        );
      })}
      <SummaryField
        title="Total paid"
        value={formatCurrency(totalAmount)}
        bold
        sx={{ mt: 2 }}
      />
    </SectionBox>
  );
}
