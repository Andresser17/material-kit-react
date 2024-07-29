import { Product, ProductVariant } from "@medusajs/types";
import { SetStateAction, useState } from "react";

import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useModal } from "src/modals/useModal";

import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import { IEditVariantModal } from "src/modals/edit-variant-modal";
import { useDeleteProductVariant } from "src/mutations/use-delete-product-variant";
import { formatCurrency } from "src/utils/format-number";

interface IVariants {
  product: Product;
}

export default function Variants({ product }: IVariants) {
  const [open, setOpen] = useState<Element | null>(null);
  const { onOpen: openAddVariantModal } = useModal("add-variant-modal");
  const { onOpen: openEditOptionsModal } = useModal("edit-options-modal");

  const handleOpenMenu = (event: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditOptions = () => {
    openEditOptionsModal({ product });
    handleCloseMenu();
  };

  const handleAddVariant = () => {
    openAddVariantModal({ product });
    handleCloseMenu();
  };

  return (
    <SectionBox
      sx={{
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">
          Variants ({product.variants.length})
        </Typography>
        <IconButton id="section-op" onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <TableContainer component={Paper}>
        <Table aria-label="variants table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">SKU</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Inventory</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product &&
              product.variants.map((variant) => {
                return (
                  <VariantTableRow
                    key={variant.id}
                    product={product}
                    variant={variant}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleAddVariant}>
          <Iconify icon="eva:cube-outline" sx={{ mr: 1 }} />
          Add Variant
        </MenuItem>

        {/* TODO */}
        <MenuItem>
          <Iconify icon="mingcute:receive-money-line" sx={{ mr: 1 }} />
          Edit Prices
        </MenuItem>

        <MenuItem onClick={handleEditOptions}>
          <Iconify icon="eva:archive-outline" sx={{ mr: 1 }} />
          Edit Options
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}

interface IVariantTableRow {
  product: Product;
  variant: ProductVariant;
}

function VariantTableRow({ product, variant }: IVariantTableRow) {
  const [open, setOpen] = useState<Element | null>(null);
  const price = variant.prices.find((price) => price.currency_code === "usd");
  const { onOpen: openModal } =
    useModal<IEditVariantModal>("edit-variant-modal");
  const deleteProductVariantMutation = useDeleteProductVariant();

  const handleOpenMenu = (event: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    openModal({ product, variant });
    handleCloseMenu();
  };

  const handleDelete = () => {
    if (variant)
      deleteProductVariantMutation({
        product_id: variant.product_id,
        variant_id: variant.id,
      });
    handleCloseMenu();
  };

  return (
    <>
      <TableRow
        key={variant.title}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {variant.title}
        </TableCell>
        <TableCell align="right">{variant.sku}</TableCell>
        <TableCell align="right">
          {price ? formatCurrency(price.amount) : "$0.00"}
        </TableCell>
        <TableCell align="right">{variant.inventory_quantity}</TableCell>
        <TableCell align="right">
          <IconButton id="table-row-op" onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => handleDelete()} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
