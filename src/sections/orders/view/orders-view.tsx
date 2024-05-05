import { useState, SetStateAction } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { useListOrders } from "src/queries/use-list-orders";

import Scrollbar from "src/components/scrollbar";
import TableEmptyRows from "src/components/table-empty-rows";

import { emptyRows } from "../utils";
import OrderTableRow from "../order-table-row";
import OrderTableToolbar from "../order-table-toolbar";
import OrderTableHead, { TableOrder } from "../order-table-head";

// ----------------------------------------------------------------------

export default function OrdersView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<TableOrder>(TableOrder.ASC);

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { orders, count } = useListOrders({});

  const handleSort = (_event: unknown, id: SetStateAction<string>) => {
    const isAsc = orderBy === id && order === TableOrder.ASC;
    if (id !== "") {
      setOrder(isAsc ? TableOrder.DESC : TableOrder.ASC);
      setOrderBy(id);
    }
  };

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

  const handleFilterByName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Orders</Typography>
      </Stack>

      <Card>
        <OrderTableToolbar
          selected={selected}
          setSelected={setSelected}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar sx={null}>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <OrderTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: "order-id", label: "Order" },
                  { id: "date-added", label: "Date added" },
                  { id: "customer", label: "Customer" },
                  { id: "fulfillment", label: "Fulfillment" },
                  { id: "payment-status", label: "Payment status" },
                  { id: "sales-channel", label: "Sales channel" },
                  { id: "total", label: "Total" },
                ]}
              />
              <TableBody>
                {orders &&
                  orders
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((product) => (
                      <OrderTableRow
                        key={product.id}
                        order={product}
                        selectedRow={selected.indexOf(product.id) !== -1}
                      />
                    ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, count)}
                />

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
