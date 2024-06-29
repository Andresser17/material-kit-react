import { Order, PaymentAmounts } from "@medusajs/types";

import Box from "@mui/material/Box";

import { FulfillmentStatus, OrderStatus, PaymentStatus } from "src/enums";

import { useEffect, useState } from "react";
import Customer from "../customer";
import Fulfillment from "../fulfillment";
import OrderDetails from "../order-details";
import Payment from "../payment";
import Summary from "../summary";
import TimelineSection from "../timeline-section";

// ----------------------------------------------------------------------

export default function OrderView({ order }: { order: Order }) {
  const [paymentAmounts, setPaymentAmounts] = useState<PaymentAmounts>({
    total: "0.00",
    subtotal: "0.00",
    shipping_total: "0.00",
    tax_total: "0.00",
  });

  useEffect(() => {
    if (order) {
      setPaymentAmounts((prev) => {
        const newState = { ...prev };
        Object.keys(paymentAmounts).forEach((key) => {
          let amountArr = order[key].toString().split("");
          amountArr = amountArr.slice(0, amountArr.length - 2).join("");
          if (amountArr.length === 0) amountArr = ["0"];
          const amount = `${amountArr}.00`;
          newState[key] = amount;
        });

        return newState;
      });
    }
  }, [order]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        p: 2,
      }}
    >
      <Box sx={{ width: "60%", maxWidth: "660px" }}>
        <OrderDetails order={order} status={OrderStatus.PENDING} />
        <Summary order={order} paymentAmounts={paymentAmounts} />
        <Payment status={PaymentStatus.CAPTURED} />
        <Fulfillment status={FulfillmentStatus.SHIPPED} />
        <Customer />
      </Box>
      <Box sx={{ width: "40%", maxWidth: "450px" }}>
        <TimelineSection />
      </Box>
    </Box>
  );
}
