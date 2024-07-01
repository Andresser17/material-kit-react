import { Box, Typography } from "@mui/material";
import SectionBox from "src/components/section-box";
import { OrdersResponse } from "src/queries/use-list-orders";
import OrdersTable from "./orders-table/orders-table";

interface IOrders {
  orders: OrdersResponse;
}

export default function Orders({ orders }: IOrders) {
  return (
    <SectionBox>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Orders {orders.count}</Typography>
        <Typography variant="subtitle2" sx={{ color: "#888" }}>
          An overview of Customers Orders
        </Typography>
      </Box>
      <OrdersTable orders={orders} />
    </SectionBox>
  );
}
