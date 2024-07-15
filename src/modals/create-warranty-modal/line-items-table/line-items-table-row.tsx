import { LineItem } from "@medusajs/types";

import { Avatar, Checkbox, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ChangeEvent } from "react";
import { formatCurrency } from "src/utils/format-number";

// ----------------------------------------------------------------------

interface ILineItemsTableRow {
  lineItem: LineItem;
  selectedRow: boolean;
  handleClick: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function LineItemsTableRow({
  lineItem,
  selectedRow,
  handleClick,
}: ILineItemsTableRow) {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selectedRow} onChange={handleClick} />
      </TableCell>

      <TableCell>
        <Typography
          sx={{ fontSize: 10, color: "#888" }}
          variant="subtitle2"
          noWrap
        >
          {lineItem.title}
        </Typography>
      </TableCell>

      <TableCell
        align="center"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar
          alt={lineItem.thumbnail as string}
          src={lineItem.thumbnail as string}
          variant="square"
          sx={{ width: 64, height: 64 }}
        />
      </TableCell>

      <TableCell align="center">
        {formatCurrency(lineItem.unit_price)}
      </TableCell>
    </TableRow>
  );
}
