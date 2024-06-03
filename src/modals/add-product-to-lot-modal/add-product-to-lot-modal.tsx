import { Lot, Product } from "@medusajs/types";
import { useState, useEffect, SetStateAction } from "react";

import { Card, TablePagination } from "@mui/material";

import { useListProducts } from "src/queries/use-list-products";
import { useAddLotProduct } from "src/mutations/use-add-lot-product";

import Scrollbar from "src/components/scrollbar";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";
import ProductTableRow from "./product-table-row";
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

  const [addLotProductsMutation, isSuccess] = useAddLotProduct();

  const handleClick = (product_id: string) => {
    const found = selected.find((selected_id) => selected_id === product_id);
    if (!found) {
      addLotProductsMutation({
        lot_id: lot?.id ?? "",
        product_id: product_id ?? "",
      });
      if (isSuccess) setSelected((prev) => [...prev, product_id]);
    } else {
      // remove product mutation
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
                <ProductTableRow
                  key={product.id}
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
