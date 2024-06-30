import { SetStateAction, useState } from "react";

import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";

import { emptyRows } from "src/utils/table-utils";

import Scrollbar from "src/components/scrollbar";
import TableEmptyRows from "src/components/table-empty-rows";

import SectionBox from "src/components/section-box";
import { OrdersResponse } from "src/queries/use-list-orders";
import OrdersTableHead from "./orders-table-head";
import OrdersTableRow from "./orders-table-row";

interface IOrdersTable {
  orders: OrdersResponse;
}

export default function OrdersTable({ orders }: IOrdersTable) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (
    _event: unknown,
    newPage: SetStateAction<number>,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <SectionBox>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Orders {orders.count}</Typography>
        <Typography variant="subtitle2" sx={{ color: "#888" }}>
          An overview of Customers Orders
        </Typography>
      </Box>

      <Scrollbar sx={null}>
        <TableContainer sx={{ overflow: "unset" }}>
          <Table>
            <OrdersTableHead
              headLabel={[
                { id: "order", label: "Order" },
                { id: "avatar", label: "" },
                { id: "date", label: "Date", align: "center" },
                { id: "fulfillment", label: "Fulfillment" },
                { id: "status", label: "Status" },
                { id: "total", label: "Total" },
                { id: "options", label: "" },
              ]}
            />
            <TableBody>
              {orders &&
                orders.orders
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => {
                    return <OrdersTableRow key={order.id} order={order} />;
                  })}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, orders.count)}
              />

              {/* {notFound && <TableNoData query={filterName} />} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page}
        component="div"
        count={orders.count}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </SectionBox>
  );
}
