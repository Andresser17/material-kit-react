import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { PaymentStatus } from "src/enums";

import { Order } from "@medusajs/types";
import Label from "src/components/label";
import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";

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
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {payment.id}
            </Typography>
            <SummaryField
              title={payment.created_at}
              value="$50.00 USD"
              sx={{ color: "#888", fontSize: 14 }}
            />
          </Box>
        );
      })}
      <SummaryField
        title="Total paid"
        value={convertToCurrency(totalAmount)}
        bold
        sx={{ mt: 2 }}
      />
    </SectionBox>
  );
}

function convertToCurrency(amount: number) {
  let newAmount = "";
  let amountArr = amount.toString().split("");
  amountArr = amountArr.slice(0, amountArr.length - 2);
  if (amountArr.length === 0) amountArr.push("0");
  newAmount = `${amountArr.join("")}.00`;

  return newAmount;
}

// function convertToCurrency(amounts: Record<string, number>) {
//   const keys = Object.keys(amounts);

//   const newAmounts: Record<string, string> = {};
//   for (const key of keys) {
//     let amountArr = amounts[key].toString().split("");
//     amountArr = amountArr.slice(0, amountArr.length - 2);
//     if (amountArr.length === 0) amountArr.push("0");
//     const amount = `${amountArr.join("")}.00`;
//     newAmounts[key] = amount;
//   }

//   return newAmounts;
// }
