import { Product, ProductVariant } from "@medusajs/types";
import { Dispatch, SetStateAction, useState } from "react";

import {
  Avatar,
  Card,
  Checkbox,
  Stack,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { useListProducts } from "src/queries/use-list-products";

import AccordionTable from "src/components/accordion-table/accordion-table";
import Scrollbar from "src/components/scrollbar";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";
import ProductTableToolbar from "./product-table-toolbar";

export interface IAddProductToDraftOrderModal {
  selectedProducts: ProductVariant[];
}

export default function AddProductToDraftOrderModal() {
  const { onClose: closeModal, onUpdate: updateProps } =
    useModal<IAddProductToDraftOrderModal>("add-product-to-draft-order-modal");
  const [selected, setSelected] = useState<ProductVariant[]>([]);

  const handleClose = () => {
    updateProps({ selectedProducts: selected });
    closeModal();
  };

  return (
    <BaseModal
      modalId="add-product-to-draft-order-modal"
      title="Add Products"
      open
      closeOnTap
      onClose={handleClose}
      footer={false}
    >
      <ProductsTable selected={selected} setSelected={setSelected} />
    </BaseModal>
  );
}

interface IProductsTable {
  selected: ProductVariant[];
  setSelected: Dispatch<SetStateAction<ProductVariant[]>>;
}

function ProductsTable({ selected, setSelected }: IProductsTable) {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { products, count } = useListProducts({});

  const handleClick = (product: ProductVariant) => {
    const found = selected.find((sel) => sel.id === product.id);

    if (!found) {
      setSelected((prev) => [...prev, product]);
    } else
      setSelected((prev) =>
        prev.filter((selected) => selected.id != product.id),
      );
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
        selectedRows={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar sx={null}>
        {products &&
          products
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => {
              return (
                <AccordionTable
                  key={product.id}
                  head={<SummaryRow product={product} />}
                  sx={{
                    pointerEvents:
                      product.variants.length === 0 ? "none" : "inherit",
                    opacity: product.variants.length === 0 ? 0.5 : 1,
                  }}
                >
                  {product.variants.map((variant) => (
                    <DetailsRow
                      key={variant.id}
                      variant={variant}
                      selectedRow={(product_id: string) => {
                        const index = selected.findIndex(
                          (selected) => selected.id === product_id,
                        );

                        return index != -1;
                      }}
                      handleClick={handleClick}
                    />
                  ))}
                </AccordionTable>
              );
            })}
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

interface ISummaryRow {
  product: Product;
}

function SummaryRow({ product }: ISummaryRow) {
  return (
    <TableRow>
      <TableCell align="center">
        <Avatar
          alt={`${product.title} thumbnail`}
          src=""
          variant="square"
          sx={{ width: 24, height: 24 }}
        />
      </TableCell>

      <TableCell>
        <Stack direction="column">
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            #{product.id.split("").slice(8)}
          </Typography>
          <Typography variant="subtitle2">{product.title}</Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

interface IDetailsRow {
  variant: ProductVariant;
  selectedRow: (product_id: string) => boolean;
  handleClick: (product: ProductVariant) => void;
}

function DetailsRow({ variant, selectedRow, handleClick }: IDetailsRow) {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          disableRipple
          checked={selectedRow(variant.id)}
          onChange={() => handleClick(variant)}
        />
      </TableCell>

      <TableCell align="center">
        <Avatar
          alt={`${variant.title} thumbnail`}
          src=""
          variant="square"
          sx={{ width: 32, height: 32 }}
        />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="column">
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            #{variant.id.split("").slice(8)}
          </Typography>
          <Typography variant="subtitle2">{variant.title}</Typography>
        </Stack>
      </TableCell>

      <TableCell align="center">{variant.inventory_quantity}</TableCell>
    </TableRow>
  );
}
