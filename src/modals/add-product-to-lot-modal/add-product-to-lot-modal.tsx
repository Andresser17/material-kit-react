import { useState, useEffect, SetStateAction } from "react";
import { Lot, Product, ProductVariant } from "@medusajs/types";

import {
  Card,
  Stack,
  Avatar,
  TableRow,
  Checkbox,
  TableCell,
  Typography,
  TablePagination,
} from "@mui/material";

import { useListProducts } from "src/queries/use-list-products";
import { useAddLotProduct } from "src/mutations/use-add-lot-product";
import { useRemoveLotProduct } from "src/mutations/use-remove-lot-product";

import Scrollbar from "src/components/scrollbar";
import AccordionTable from "src/components/accordion-table/accordion-table";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";
import ProductTableToolbar from "./product-table-toolbar";

export interface IAddProductToLotModal {
  lot: Lot | undefined;
}

export default function AddProductToLotModal() {
  const {
    props: { lot },
    onClose: closeModal,
  } = useModal<IAddProductToLotModal>("add-product-to-lot-modal");
  const { products, count } = useListProducts({});

  return (
    <BaseModal
      modalId="add-existing-product-modal"
      title="Add Products"
      open
      closeOnTap
      onClose={closeModal}
    >
      <ProductsTable lot={lot} products={products ?? []} count={count} />
    </BaseModal>
  );
}

interface IProductsTable {
  lot: Lot | undefined;
  products: Product[];
  count: number;
}

function ProductsTable({ lot, products, count }: IProductsTable) {
  const [selected, setSelected] = useState<string[]>([]);

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [addLotProductMutation] = useAddLotProduct();
  const [removeLotProductMutation] = useRemoveLotProduct();

  const handleClick = (product_id: string) => {
    const found = selected.find((selected_id) => selected_id === product_id);
    if (!found) {
      addLotProductMutation({
        lot_id: lot?.id ?? "",
        product_id: product_id ?? "",
        onSuccess() {
          setSelected((prev) => [...prev, product_id]);
        },
      });
    } else {
      removeLotProductMutation({
        lot_id: lot?.id ?? "",
        product_id: product_id ?? "",
        onSuccess() {
          setSelected((prev) => {
            return prev.filter((selected) => selected != product_id);
          });
        },
      });
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

  useEffect(() => {
    if (selected.length === 0 && lot?.products)
      setSelected(lot.products.map((product) => product.id));
  }, []);

  return (
    <Card sx={{ borderRadius: "10px" }}>
      <ProductTableToolbar
        selected={selected}
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
                  head={
                    <SummaryRow
                      product={product}
                      selectedRow={(product_id: string) => {
                        const index = selected.findIndex(
                          (selected_id) => selected_id === product_id,
                        );

                        return index != -1;
                      }}
                      handleClick={(product_id: string) => {
                        return handleClick(product_id);
                      }}
                    />
                  }
                >
                  {product.variants.map((variant) => (
                    <DetailsRow key={variant.id} variant={variant} />
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
  selectedRow: (product_id: string) => boolean;
  handleClick: (product_id: string) => void;
}

function SummaryRow({ product, selectedRow, handleClick }: ISummaryRow) {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          disableRipple
          checked={selectedRow(product.id)}
          onChange={() => handleClick(product.id)}
        />
      </TableCell>

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
}

function DetailsRow({ variant }: IDetailsRow) {
  return (
    <TableRow>
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
