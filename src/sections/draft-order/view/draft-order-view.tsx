import { DraftOrder, PaymentAmounts } from "@medusajs/types";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import Customer from "../customer";
import OrderDetails from "../order-details";
import Payment from "../payment";
import RawOrder from "../raw-order";
import Shipping from "../shipping";
import Summary from "../summary";

// ----------------------------------------------------------------------

interface IDraftOrderView {
  draftOrder: DraftOrder;
}

export default function DraftOrderView({ draftOrder }: IDraftOrderView) {
  const [paymentAmounts, setPaymentAmounts] = useState<PaymentAmounts>({
    total: "0.00",
    subtotal: "0.00",
    shipping_total: "0.00",
    tax_total: "0.00",
  });

  useEffect(() => {
    if (draftOrder) {
      setPaymentAmounts((prev) => {
        const newState = { ...prev };
        Object.keys(paymentAmounts).forEach((key) => {
          let amountArr = draftOrder.cart[key].toString().split("");
          amountArr = amountArr.slice(0, amountArr.length - 2).join("");
          if (amountArr.length === 0) amountArr = ["0"];
          const amount = `${amountArr}.00`;
          newState[key] = amount;
        });

        return newState;
      });
    }
  }, [draftOrder]);

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          width: {
            sm: "600px",
            md: "660px",
          },
          maxWidth: {
            xs: "100%",
          },
        }}
      >
        <OrderDetails draftOrder={draftOrder} paymentAmounts={paymentAmounts} />
        <Payment draftOrder={draftOrder} paymentAmounts={paymentAmounts} />
        <Summary data={draftOrder} paymentAmounts={paymentAmounts} />
        <Shipping data={draftOrder} />
        <Customer data={draftOrder} />
        <RawOrder data={draftOrder} />
      </Box>
    </Box>
  );
}
