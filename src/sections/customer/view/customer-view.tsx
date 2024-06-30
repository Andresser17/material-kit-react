import { CustomerDTO } from "@medusajs/types";

import Box from "@mui/material/Box";

import { OrdersResponse } from "src/queries/use-list-orders";
import Details from "../details";
import Orders from "../orders";

// ----------------------------------------------------------------------

interface ICustomerView {
  customer: CustomerDTO;
  orders: OrdersResponse;
}

export default function CustomerView({ customer, orders }: ICustomerView) {
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
        <Details customer={customer} />
        <Orders orders={orders} />
      </Box>
    </Box>
  );
}
