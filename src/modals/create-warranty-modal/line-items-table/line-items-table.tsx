import { Table, TableBody, TableContainer } from "@mui/material";

import Scrollbar from "src/components/scrollbar";

import { LineItem } from "@medusajs/types";
import { Dispatch, SetStateAction } from "react";
import WarrantiesTableHead from "./line-items-table-head";
import LineItemsTableRow from "./line-items-table-row";

interface ILineItemsTable {
  lineItems: LineItem[];
  selected: LineItem[];
  setSelected: Dispatch<SetStateAction<LineItem[]>>;
}

export default function LineItemsTable({
  lineItems,
  selected,
  setSelected,
}: ILineItemsTable) {
  const handleClick = (item: LineItem) => {
    setSelected((prev) => {
      const found = prev.find((sel) => sel.id === item.id);

      if (found) return prev.filter((sel) => sel.id !== item.id);

      return [...prev, item];
    });
  };

  return (
    <Scrollbar>
      <TableContainer sx={{ overflow: "unset" }}>
        <Table>
          <WarrantiesTableHead
            headLabel={[
              { id: "select", label: "" },
              { id: "title", label: "Title" },
              { id: "avatar", label: "" },
              {
                id: "unit_price",
                label: "Unit Price",
                align: "center",
              },
            ]}
          />
          <TableBody>
            {lineItems &&
              lineItems.map((lineItem) => {
                return (
                  <LineItemsTableRow
                    key={lineItem.id}
                    lineItem={lineItem}
                    selectedRow={selected.indexOf(lineItem) !== -1}
                    handleClick={() => handleClick(lineItem)}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
