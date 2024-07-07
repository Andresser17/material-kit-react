import { DraftOrder } from "@medusajs/types";

import { Box } from "@mui/material";

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
        <OrderDetails draftOrder={draftOrder} />
        <Payment draftOrder={draftOrder} />
        <Summary draftOrder={draftOrder} />
        <Shipping draftOrder={draftOrder} />
        <Customer draftOrder={draftOrder} />
        <RawOrder draftOrder={draftOrder} />
      </Box>
    </Box>
  );
}
