import { CartLineItemDTO, DraftOrderResponse } from "@medusajs/types";

import { Box, Avatar, Divider, Typography } from "@mui/material";

import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";

interface ISummary {
  data: DraftOrderResponse | null;
}

export default function Summary({ data }: ISummary) {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Typography variant="h4">Summary</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {data &&
        data.cart.items.map((item: CartLineItemDTO) => (
          <CartItemSummary key={item.id} data={item} />
        ))}
      <SummaryField
        title="Subtotal"
        value={`$${data?.cart.subtotal} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Shipping"
        value={`$${data?.cart.shipping_total} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Tax"
        value={`$${data?.cart.tax_total} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Total to pay"
        value={`$${data?.cart.total} USD`}
        bold
      />
    </SectionBox>
  );
}

interface ICartItemSummary {
  data: CartLineItemDTO;
}

function CartItemSummary({ data }: ICartItemSummary) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar
          alt={data.title}
          src={data.thumbnail as string}
          variant="square"
          sx={{ width: 24, height: 24, mr: 2 }}
        />
        <Typography sx={{ fontSize: 12 }} variant="subtitle2" noWrap>
          {data.title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ fontSize: 12, color: "#888", mr: 2 }}
          variant="subtitle2"
          noWrap
        >
          ${data.unit_price} x{data.quantity}
        </Typography>
        <Typography sx={{ fontSize: 12, mr: 0.8 }} variant="subtitle2" noWrap>
          ${data.total}
        </Typography>
        <Typography
          sx={{ fontSize: 12, color: "#888" }}
          variant="subtitle2"
          noWrap
        >
          USD
        </Typography>
      </Box>
    </Box>
  );
}
