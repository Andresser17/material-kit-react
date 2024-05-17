import { ChangeEvent } from "react";
import { ProductVariant } from "@medusajs/types";

import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import { Stack, Avatar, Typography } from "@mui/material";

// ----------------------------------------------------------------------

interface IProductTableRow {
  product: ProductVariant;
  selectedRow: boolean;
  handleClick: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function ProductTableRow({
  product,
  selectedRow,
  handleClick,
}: IProductTableRow) {
  return (
    <TableRow
      hover
      tabIndex={-1}
      role="checkbox"
      selected={selectedRow}
      sx={{
        opacity: product.inventory_quantity === 0 ? 0.4 : 1,
        pointerEvents: product.inventory_quantity === 0 ? "none" : "auto",
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selectedRow} onChange={handleClick} />
      </TableCell>

      <TableCell
        align="center"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar alt="" src="" variant="square" sx={{ width: 64, height: 64 }} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
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

      {/* <TableCell>
        <Label
          color={
            (product.status === ProductStatus.DRAFT && "error") || "success"
          }
        >
          {product.status}
        </Label>
      </TableCell> */}

      <TableCell align="center">{product.inventory_quantity}</TableCell>
    </TableRow>
  );
}
