import { Table, TableBody, TableContainer } from "@mui/material";

import ItemsTableHead from "./items-table-head";
import ItemsTableRow from "./items-table-row";
import ItemsTableRowTotal from "./items-table-row-total";

export default function ItemsTable() {
  const items = [
    {
      id: "item-1",
      concepto:
        "Memoria Ram Ddr3 8gb (4 Gb X 2) Kit 1333mhz Pc3-10600 1.5v KTH9600B/4G 9905471-021.A00LF",
      cantidad: 1,
      precioUnitario: "$11.99",
      subtotal: "$11.99",
    },
    {
      id: "item-2",
      concepto:
        "Memoria Ram Ddr3 8gb (4 Gb X 2) Kit 1333mhz Pc3-10600 1.5v KTH9600B/4G 9905471-021.A00LF",
      cantidad: 1,
      precioUnitario: "$11.99",
      subtotal: "$11.99",
    },
  ];

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
          <ItemsTableRowTotal totalAmount="$24" />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
