import { Product } from "@medusajs/types";
import { Avatar, Stack, TableCell, TableRow, Typography } from "@mui/material";

interface ISummaryRow {
  product: Product;
}

export default function SummaryRow({ product }: ISummaryRow) {
  return (
    <TableRow>
      <TableCell align="center">
        <Avatar
          alt={`${product.title} thumbnail`}
          src={product.thumbnail}
          variant="square"
          sx={{ width: 48, height: 48 }}
        />
      </TableCell>

      <TableCell>
        <Stack direction="column">
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            {product.id}
          </Typography>
          <Typography variant="subtitle2">{product.title}</Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
