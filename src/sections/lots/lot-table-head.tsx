import { SetStateAction } from "react";

import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell, { TableCellProps } from "@mui/material/TableCell";

import { visuallyHidden } from "src/utils/table-utils";

// ----------------------------------------------------------------------

export enum TableOrder {
  // eslint-disable-next-line no-unused-vars
  ASC = "asc",
  // eslint-disable-next-line no-unused-vars
  DESC = "desc",
}

interface ILotTableHead {
  order: TableOrder;
  orderBy: string;
  headLabel: Array<{
    id: string;
    label: string;
    align?: TableCellProps["align"];
    width?: number;
    minWidth?: number;
  }>;
  onRequestSort: (event: unknown, id: SetStateAction<string>) => void;
}

export default function OrderTableHead({
  order,
  orderBy,
  headLabel,
  onRequestSort,
}: ILotTableHead) {
  const onSort = (id: SetStateAction<string>) => (event: unknown) => {
    onRequestSort(event, id);
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((cell) => (
          <TableCell
            key={cell.id}
            align={cell.align || "left"}
            sortDirection={orderBy === cell.id ? order : false}
            sx={{ width: cell.width, minWidth: cell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : TableOrder.ASC}
              onClick={onSort(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === TableOrder.DESC
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
