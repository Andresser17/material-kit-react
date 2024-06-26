import { Lot } from "@medusajs/types";
import { SetStateAction, useState } from "react";

import { Box, Button, TablePagination } from "@mui/material";

import { IAddProductToLotModal } from "src/modals/add-product-to-lot-modal/add-product-to-lot-modal";
import { useModal } from "src/modals/useModal";

import AccordionTable from "src/components/accordion-table";
import Iconify from "src/components/iconify";

import ItemsTableRowProduct from "./items-table-row-product";
import ItemsTableRowVariant from "./items-table-row-variant";

interface IItemsTable {
  lot: Lot;
}

export default function ItemsTable({ lot }: IItemsTable) {
  const [page, setPage] = useState(0);
  const { onOpen: openModal } = useModal<IAddProductToLotModal>(
    "add-product-to-lot-modal",
  );

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

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ borderRadius: "5px" }}
          onClick={() => openModal({ lot })}
        >
          Add Existing
        </Button>
      </Box>
      {lot.products &&
        lot.products
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((product) => {
            return (
              <AccordionTable
                key={product.id}
                head={
                  <ItemsTableRowProduct lot_id={lot?.id ?? ""} data={product} />
                }
              >
                {product.variants.map((variant) => (
                  <ItemsTableRowVariant
                    key={variant.id}
                    currentStock={lot.stock?.find(
                      (stock) => stock.variant_id === variant.id,
                    )}
                    lot_id={lot?.id ?? ""}
                    variant={variant}
                  />
                ))}
              </AccordionTable>
            );
          })}

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
