import { Box } from "@mui/material";
import { OrdersResponse } from "src/queries/use-list-orders";
import OrdersTable from "./orders-table/orders-table";

interface IOrders {
  orders: OrdersResponse;
}

export default function Orders({ orders }: IOrders) {
  return (
    <Box>
      <OrdersTable orders={orders} />
    </Box>
  );
}
