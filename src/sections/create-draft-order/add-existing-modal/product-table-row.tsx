import { ChangeEvent } from "react";
import { ProductDTO } from "@medusajs/types";

import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import { Stack, Avatar, Typography } from "@mui/material";

import { ProductStatus } from "src/queries/use-list-products";

import Label from "src/components/label";

// ----------------------------------------------------------------------

interface IProductTableRow {
  product: ProductDTO;
  selectedRow: boolean;
  handleClick: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function ProductTableRow({
  product,
  selectedRow,
  handleClick,
}: IProductTableRow) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selectedRow}>
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
        <Avatar
          alt={product.thumbnail as string}
          src={product.thumbnail as string}
          variant="square"
          sx={{ width: 64, height: 64 }}
        />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="column">
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            #{product.id.split("").slice(5)}
          </Typography>
          <Typography variant="subtitle2">{product.title}</Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Label
          color={
            (product.status === ProductStatus.DRAFT && "error") || "success"
          }
        >
          {product.status}
        </Label>
      </TableCell>

      <TableCell align="center">{0}</TableCell>
    </TableRow>
  );
}
