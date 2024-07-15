import { Order } from "@medusajs/types";

import Box from "@mui/material/Box";

import { FulfillmentStatus, PaymentStatus } from "src/enums";

import Customer from "../customer";
import Fulfillment from "../fulfillment";
import OrderDetails from "../order-details";
import Payment from "../payment";
import Summary from "../summary";
import TimelineSection from "../timeline-section";
import Warranties from "../warranties";

// ----------------------------------------------------------------------

export default function OrderView({ order }: { order: Order }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        p: 2,
      }}
    >
      <Box sx={{ width: "60%", maxWidth: "660px" }}>
        <OrderDetails order={order} />
        <Summary order={order} />
        <Payment order={order} status={PaymentStatus.CAPTURED} />
        <Fulfillment order={order} status={FulfillmentStatus.SHIPPED} />
        <Customer order={order} />
      </Box>
      <Box sx={{ width: "40%", maxWidth: "450px" }}>
        <TimelineSection />
        <Warranties order={order} />
      </Box>
    </Box>
  );
}
