import { useState, SetStateAction } from "react";
import { CartLineItemDTO } from "@medusajs/types";

import {
  Box,
  Table,
  Button,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { emptyRows } from "src/utils/table-utils";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import TableEmptyRows from "src/components/table-empty-rows";

import ItemsTableRow from "./items-table-row";
import ItemsTableHead from "./items-table-head";

export default function ItemsTable() {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [items, setItems] = useState<CartLineItemDTO[]>([
    {
      id: "1",
      title: "generic",
      quantity: 2,
      unit_price: 2500,
    },
  ]);
  const [count, setCount] = useState(0);

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
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ borderRadius: "5px" }}
        >
          Add Existing
        </Button>
      </Box>

      <Scrollbar sx={null}>
        <TableContainer sx={{ overflow: "unset" }}>
          <Table>
            <ItemsTableHead
              headLabel={[
                { id: "details", label: "Details" },
                { id: "quantity", label: "Quantity", align: "right" },
                { id: "price", label: "Price (excl. Taxes)", align: "right" },
                { id: "delete", label: "" },
              ]}
            />
            <TableBody>
              {items &&
                items
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <ItemsTableRow
                      key={item.id}
                      data={item}
                      handleDelete={() => {}}
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
    </Box>
  );
}
