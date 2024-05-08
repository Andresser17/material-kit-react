import { useState, Dispatch, SetStateAction } from "react";

import { Box, Modal, Button, Typography } from "@mui/material";
import {
  Card,
  Table,
  Divider,
  TableBody,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { emptyRows } from "src/utils/table-utils";

import { useListProducts } from "src/queries/use-list-products";
import { DraftOrderItem } from "src/mutations/use-create-draft-order";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import TableEmptyRows from "src/components/table-empty-rows";

import ProductTableRow from "./product-table-row";
import ProductTableToolbar from "./product-table-toolbar";

interface IAddExistingModal {
  open: boolean;
  setOpen: (value: boolean) => void;
  addItems: Dispatch<SetStateAction<DraftOrderItem[]>>;
}

export default function AddExistingModal({
  open,
  setOpen,
  addItems,
}: IAddExistingModal) {
  const [selected, setSelected] = useState<DraftOrderItem[]>([]);
  const handleClose = () => setOpen(false);

  const handleProductAdd = () => {
    addItems(selected);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: {
            xs: "90%",
            md: "660px",
          },
          maxWidth: 750,
          maxHeight: 750,
          backgroundColor: "background.default",
          p: 3,
          borderRadius: 1,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Add Variant</Typography>
          <IconButton id="section-op" onClick={handleClose}>
            <Iconify icon="eva:close-fill" width={25} />
          </IconButton>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
        <ProductsTable selected={selected} setSelected={setSelected} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            onClick={handleProductAdd}
            variant="contained"
            color="success"
            size="medium"
            sx={{ mr: 2 }}
          >
            Add
          </Button>
          <Button
            onClick={handleClose}
            variant="text"
            size="small"
            color="error"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

interface IProductsTable {
  selected: DraftOrderItem[];
  setSelected: Dispatch<SetStateAction<DraftOrderItem[]>>;
}

function ProductsTable({ selected, setSelected }: IProductsTable) {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { products, count } = useListProducts({});

  const handleClick = (item: DraftOrderItem) => {
    const selectedIndex = selected.indexOf(item);
    let newSelected: DraftOrderItem[] | ((prevState: never[]) => never[]) = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
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
    <Card sx={{ borderRadius: "10px" }}>
      <ProductTableToolbar
        selected={selected}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar sx={null}>
        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ width: "100%" }}>
            <TableBody>
              {products &&
                products
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <ProductTableRow
                      key={product.id}
                      product={product}
                      selectedRow={
                        selected.findIndex(
                          (item) => item.variant_id === product.id,
                        ) !== -1
                      }
                      handleClick={() => {
                        return handleClick({
                          quantity: 1,
                          variant_id: product.variants[0].id,
                          unit_price: product.variants[0].prices[0].amount,
                          title: product.variants[0].title,
                          metadata: {},
                        });
                      }}
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
  );
}
