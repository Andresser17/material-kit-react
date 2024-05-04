import { useNavigate } from "react-router-dom";
import { useState, SetStateAction } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { useListDraftOrders } from "src/queries/use-list-draft-orders";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import TableEmptyRows from "src/components/table-empty-rows";

import { emptyRows } from "../utils";
import DraftOrdersTableRow from "../draft-orders-table-row";
import ProductTableToolbar from "../draft-orders-table-toolbar";
import DraftOrdersTableHead, { TableOrder } from "../draft-orders-table-head";

// ----------------------------------------------------------------------

export default function DraftOrdersView() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<TableOrder>(TableOrder.ASC);

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { draft_orders, count } = useListDraftOrders({});

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
        <Typography variant="h4">Draft Orders</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => navigate("/draft-orders/add")}
        >
          Create draft order
        </Button>
      </Stack>

      <Card>
        <ProductTableToolbar
          selected={selected}
          setSelected={setSelected}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar sx={null}>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <DraftOrdersTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: "draft", label: "Draft" },
                  { id: "order", label: "Order" },
                  { id: "date-added", label: "Date added", align: "center" },
                  { id: "customer", label: "Customer", align: "center" },
                  { id: "status", label: "Status" },
                ]}
              />
              <TableBody>
                {draft_orders &&
                  draft_orders
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((draft_order) => (
                      <DraftOrdersTableRow
                        key={draft_order.id}
                        data={draft_order}
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
