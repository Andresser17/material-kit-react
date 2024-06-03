import { Product, ProductVariant } from "@medusajs/types";

import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import {
  Stack,
  Table,
  Avatar,
  Accordion,
  TableHead,
  TableBody,
  Typography,
  TableContainer,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

interface IProductTableRow {
  product: Product;
  selectedRow: (product_id: string) => boolean;
  handleClick: (product_id: string) => void;
}

export default function ProductTableRow({
  product,
  selectedRow,
  handleClick,
}: IProductTableRow) {
  return (
    <Accordion
      sx={{
        opacity: product.variants.length === 0 ? 0.4 : 1,
        pointerEvents: product.variants.length === 0 ? "none" : "inherit",
      }}
    >
      <AccordionSummary
        expandIcon={<Iconify icon="ep:arrow-down-bold" />}
        aria-controls={`${product.id}-content`}
        id={`${product.id}-header`}
      >
        <TableContainer sx={{ overflow: "unset" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    disableRipple
                    checked={selectedRow(product.id)}
                    onChange={() => handleClick(product.id)}
                  />
                </TableCell>

                <TableCell align="center">
                  <Avatar
                    alt={`${product.title} thumbnail`}
                    src=""
                    variant="square"
                    sx={{ width: 24, height: 24 }}
                  />
                </TableCell>

                <TableCell>
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
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer sx={{ overflow: "unset" }}>
          <Table>
            <TableBody>
              {product &&
                product.variants.map((variant) => (
                  <DetailsRow key={variant.id} variant={variant} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}

interface IDetailsRow {
  variant: ProductVariant;
}

function DetailsRow({ variant }: IDetailsRow) {
  return (
    <TableRow>
      <TableCell align="center">
        <Avatar
          alt={`${variant.title} thumbnail`}
          src=""
          variant="square"
          sx={{ width: 32, height: 32 }}
        />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="column">
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            #{variant.id.split("").slice(8)}
          </Typography>
          <Typography variant="subtitle2">{variant.title}</Typography>
        </Stack>
      </TableCell>

      <TableCell align="center">{variant.inventory_quantity}</TableCell>
    </TableRow>
  );
}
