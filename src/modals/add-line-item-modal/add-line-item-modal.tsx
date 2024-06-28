import { LineItem, Product, ProductVariant } from "@medusajs/types";
import { SetStateAction, useEffect, useState } from "react";

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

import { useCreateLineItem } from "src/mutations/use-create-line-item";
import { useDeleteLineItem } from "src/mutations/use-delete-line-item";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";
import ProductTableToolbar from "./product-table-toolbar";

export interface IAddLineItemModal {
  draft_order_id: string;
  line_items: LineItem[];
}

interface SelectedLineItem {
  variant_id: string;
  line_item_id: string;
}

export default function AddLineItemModal() {
  const {
    props: { draft_order_id, line_items },
    onClose: closeModal,
  } = useModal<IAddLineItemModal>("add-line-item-modal");

  return (
    <BaseModal
      modalId="add-line-item-modal"
      title="Add Products"
      open
      closeOnTap
      onClose={() => closeModal()}
      footer={false}
    >
      <ProductsTable draftOrderId={draft_order_id} lineItems={line_items} />
    </BaseModal>
  );
}

interface IProductsTable {
  draftOrderId: string;
  lineItems: LineItem[];
}

function ProductsTable({ draftOrderId, lineItems }: IProductsTable) {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { products, count } = useListProducts({});

  const { mutate: createLineItemMutation } = useCreateLineItem();

  const { mutateAsync: deleteLineItemMutation } = useDeleteLineItem();

  const [selected, setSelected] = useState<ProductVariant[]>([]);
  const [selectedLineItem, setSelectedLineItem] =
    useState<SelectedLineItem | null>(null);

  const handleClick = async (variant: ProductVariant) => {
    const found = selected.find((sel) => sel.id === variant.id);

    if (!found) {
      setSelectedLineItem({ variant_id: variant.id, line_item_id: "" });
      setSelected((prev) => [...prev, variant]);
    } else {
      const foundLineItem = lineItems.find(
        (lineItem) => lineItem.variant_id === variant.id,
      );
      if (foundLineItem)
        setSelectedLineItem({ variant_id: "", line_item_id: foundLineItem.id });
      setSelected((prev) => {
        return prev.filter((sel) => sel.id !== variant.id);
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
    if (selectedLineItem) {
      if (selectedLineItem?.variant_id) {
        createLineItemMutation({
          draft_order_id: draftOrderId,
          new_line_item: {
            quantity: 1,
            variant_id: selectedLineItem?.variant_id,
          },
        });
        setSelectedLineItem(null);
      } else if (selectedLineItem?.line_item_id) {
        deleteLineItemMutation({
          draft_order_id: draftOrderId,
          line_item_id: selectedLineItem?.line_item_id,
        });
        setSelectedLineItem(null);
      }
    }
  }, [selectedLineItem]);

  useEffect(() => {
    if (lineItems && products) {
      for (const product of products) {
        for (const variant of product.variants) {
          const found = lineItems.find(
            (lineItem) => lineItem.variant_id === variant.id,
          );

          if (found) setSelected((prev) => [...prev, variant]);
        }
      }
    }
  }, [products]);

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
                    "& .MuiAccordionSummary-root": {
                      userSelect: "auto",
                    },
                  }}
                >
                  {product.variants.map((variant) => {
                    return (
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
                    );
                  })}
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
            {/* #{product.id.split("").slice(8)} */}
            {product.id}
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
            {/* #{variant.id.split("").slice(8)} */}
            {variant.id}
          </Typography>
          <Typography variant="subtitle2">{variant.title}</Typography>
        </Stack>
      </TableCell>

      <TableCell align="center">{variant.inventory_quantity}</TableCell>
    </TableRow>
  );
}
