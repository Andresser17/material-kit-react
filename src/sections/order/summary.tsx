import { LineItem, Order } from "@medusajs/types";

import { Avatar, Box, Divider, Typography } from "@mui/material";

import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";
import { formatCurrency } from "src/utils/format-number";

interface ISummary {
  order: Order;
}

export default function Summary({ order }: ISummary) {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Summary</Typography>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {order &&
        order.items.map((item: LineItem) => (
          <CartItemSummary key={item.id} lineItem={item} />
        ))}
      <SummaryField
        title="Subtotal"
        value={`${formatCurrency(order.subtotal)} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Shipping"
        value={`${formatCurrency(order.shipping_total)} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Tax"
        value={`${formatCurrency(order.tax_total)} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Total to pay"
        value={`${formatCurrency(order.total)} USD`}
        bold
      />
    </SectionBox>
  );
}

interface ICartItemSummary {
  lineItem: LineItem;
}

function CartItemSummary({ lineItem }: ICartItemSummary) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          alt={lineItem.title}
          src={lineItem.thumbnail as string}
          variant="square"
          sx={{ width: 24, height: 24, mr: 2 }}
        />
        <Typography
          sx={{ fontSize: 12, wordWrap: "break-word" }}
          variant="subtitle2"
          noWrap
        >
          {lineItem.title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ fontSize: 12, color: "#888", mr: 2 }}
          variant="subtitle2"
          noWrap
        >
          {formatCurrency(lineItem.unit_price)} x{lineItem.quantity}
        </Typography>
        <Typography sx={{ fontSize: 12, mr: 0.8 }} variant="subtitle2" noWrap>
          {formatCurrency(lineItem.total ?? 0)}
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
