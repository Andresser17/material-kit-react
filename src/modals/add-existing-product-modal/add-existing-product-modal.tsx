import toast from "react-hot-toast";
import { Product, ProductVariant } from "@medusajs/types";
import { useState, Dispatch, SetStateAction } from "react";

import {
  Card,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { emptyRows } from "src/utils/table-utils";

import { useAppDispatch } from "src/redux/hooks";
import { useListProducts } from "src/queries/use-list-products";
import { setSelection } from "src/redux/slices/add-existing-product/add-existing-product-slice";

import Scrollbar from "src/components/scrollbar";
import TableEmptyRows from "src/components/table-empty-rows";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";
import ProductTableRow from "./product-table-row";
import ProductTableToolbar from "./product-table-toolbar";

export default function AddExistingProductModal() {
  const { onClose: closeModal } = useModal<null>("add-existing-product-modal");
  const [selected, setSelected] = useState<ProductVariant[]>([]);
  const { products, count } = useListProducts({});
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(setSelection(selected));
    closeModal();
    toast.success("Products added successfully");
  };

  return (
    <BaseModal
      modalId="add-existing-product-modal"
      title="Add Products"
      open
      closeOnTap
      onSubmit={handleSave}
      onClose={closeModal}
    >
      <ProductsTable
        products={products ?? []}
        count={count}
        selected={selected}
        setSelected={setSelected}
      />
    </BaseModal>
  );
}

interface IProductsTable {
  products: Product[];
  count: number;
  selected: ProductVariant[];
  setSelected: Dispatch<SetStateAction<ProductVariant[]>>;
}

function ProductsTable({
  products,
  count,
  selected,
  setSelected,
}: IProductsTable) {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClick = (item: ProductVariant) => {
    const selectedIndex = selected.indexOf(item);
    let newSelected: ProductVariant[] | ((prevState: never[]) => never[]) = [];

    switch (selectedIndex) {
      case -1:
        newSelected = newSelected.concat(selected, item);
        break;
      case 0:
        newSelected = newSelected.concat(selected.slice(1));
        break;
      case selected.length - 1:
        newSelected = newSelected.concat(selected.slice(0, -1));
        break;
      default:
        // more than zero
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
        break;
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

  const variants = products
    ? products.reduce((prev, current) => {
        if (current.variants.length > 0) {
          return [...prev, ...current.variants];
        }
        return prev;
      }, [] as ProductVariant[])
    : [];

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
              {variants &&
                variants
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((variant) => {
                    return (
                      <ProductTableRow
                        key={variant.id}
                        product={variant}
                        selectedRow={
                          selected.findIndex(
                            (item) => item.id === variant.id,
                          ) !== -1
                        }
                        handleClick={() => {
                          return handleClick(variant);
                        }}
                      />
                    );
                  })}

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
