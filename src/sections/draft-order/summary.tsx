import { DraftOrderResponse } from "@medusajs/types";

import { Avatar, Box, Divider, Typography } from "@mui/material";

import { CartLineItem } from "@medusajs/types";
import { useEffect, useState } from "react";
import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";
import { PaymentAmounts } from "./view/draft-order-view";

interface ISummary {
  data: DraftOrderResponse;
  paymentAmounts: PaymentAmounts;
}

export default function Summary({ data, paymentAmounts }: ISummary) {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Typography variant="h4">Summary</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {data &&
        data.cart.items.map((item: CartLineItem) => (
          <CartItemSummary key={item.id} data={item} />
        ))}
      <SummaryField
        title="Subtotal"
        value={`$${paymentAmounts.subtotal} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Shipping"
        value={`$${paymentAmounts.shipping_total} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Tax"
        value={`$${paymentAmounts.tax_total} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Total to pay"
        value={`$${paymentAmounts.total} USD`}
        bold
      />
    </SectionBox>
  );
}

interface ICartItemSummary {
  data: CartLineItem;
}

function CartItemSummary({ data }: ICartItemSummary) {
  const [amounts, setAmounts] = useState<{
    [x: string]: string;
    unit_price: string;
    total: string;
  }>({ unit_price: "", total: "" });

  useEffect(() => {
    if (data) {
      setAmounts((prev) => {
        const newState = { ...prev };
        Object.keys(amounts).forEach((key) => {
          let amountArr = data[key].toString().split("");
          amountArr = amountArr.slice(0, amountArr.length - 2);
          if (amountArr.length === 0) amountArr = ["0"];
          const amount = `${amountArr}.00`;
          newState[key] = amount;
        });

        return newState;
      });
    }
  }, [data]);

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
          ${amounts.unit_price} x{data.quantity}
        </Typography>
        <Typography sx={{ fontSize: 12, mr: 0.8 }} variant="subtitle2" noWrap>
          ${amounts.total}
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
