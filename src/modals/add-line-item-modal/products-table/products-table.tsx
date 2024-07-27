import { LineItem } from "@medusajs/types";
import { Card, TablePagination } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AccordionTable from "src/components/accordion-table";
import Scrollbar from "src/components/scrollbar";
import { LineItemRequest } from "src/mutations/use-create-line-item";
import { useListProducts } from "src/queries/use-list-products";
import DetailsRow from "./details-row";
import ProductTableToolbar from "./product-table-toolbar";
import SummaryRow from "./summary-row";

interface IProductsTable {
  lineItems: LineItem[];
  selected: LineItemRequest[];
  setSelected: Dispatch<SetStateAction<LineItemRequest[]>>;
}

export default function ProductsTable({
  lineItems,
  selected,
  setSelected,
}: IProductsTable) {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { products, count } = useListProducts({});

  const handleClick = (lineItem: LineItemRequest) => {
    const found = selected.find(
      (sel) => sel.variant_id === lineItem.variant_id,
    );

    if (!found) setSelected((prev) => [...prev, lineItem]);
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

  // map selected products
  useEffect(() => {
    if (lineItems && products) {
      for (const product of products) {
        for (const variant of product.variants) {
          const found = lineItems.find(
            (lineItem) => lineItem.variant_id === variant.id,
          );

          if (found) {
            const price = variant.prices.find(
              (price) => price.currency_code === "usd",
            );
            setSelected((prev) => [
              ...prev,
              {
                unit_price: price?.amount,
                variant_id: variant.id,
                quantity: 1,
              },
            ]);
          }
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

      <Scrollbar>
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
                            (selected) => selected.variant_id === product_id,
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
