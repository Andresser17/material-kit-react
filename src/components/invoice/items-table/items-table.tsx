import { Table, TableBody, TableContainer } from "@mui/material";

import { LineItem } from "@medusajs/types";
import { formatCurrency } from "src/utils/format-number";
import ItemsTableHead from "./items-table-head";
import ItemsTableRow from "./items-table-row";
import ItemsTableRowTotal from "./items-table-row-total";

interface IItems {
  items: LineItem[];
}

export default function ItemsTable({ items }: IItems) {
  const totalAmount = items.reduce((prev, current) => {
    return current.unit_price + prev;
  }, 0);

  return (
    <TableContainer>
      <Table>
        <ItemsTableHead
          headLabel={[
            { id: "concepto", label: "Concepto" },
            { id: "cantidad", label: "Cantidad" },
            { id: "precio-unitario", label: "Precio Unitario" },
            { id: "subtotal", label: "Subtotal" },
          ]}
        />
        <TableBody>
          {items &&
            items.map((item) => {
              return <ItemsTableRow key={item.id} item={item} />;
            })}
          <ItemsTableRowTotal totalAmount={formatCurrency(totalAmount)} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
