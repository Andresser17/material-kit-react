import { useState, SetStateAction } from "react";

import {
  Box,
  Table,
  Button,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { emptyRows } from "src/utils/table-utils";

import { useModal } from "src/modals/useModal";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
  removeSelected,
  getSelectedProducts,
} from "src/redux/slices/add-existing-product/add-existing-product-slice";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import TableEmptyRows from "src/components/table-empty-rows";

import ItemsTableRow from "./items-table-row";
import ItemsTableHead from "./items-table-head";

export default function ItemsTable() {
  const selectedProducts = useAppSelector((state) =>
    getSelectedProducts(state),
  );
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const { onOpen: openModal } = useModal("add-existing-product-modal");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count] = useState(0);

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

  const handleDelete = (id: string) => {
    dispatch(removeSelected(id));
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
          onClick={() => openModal()}
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
              {selectedProducts &&
                selectedProducts
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <ItemsTableRow
                      key={item.id}
                      data={item}
                      handleDelete={handleDelete}
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
