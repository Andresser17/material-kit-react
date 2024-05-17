import { useState, SetStateAction } from "react";
import { Product, ProductOptionRequest } from "@medusajs/types";

import {
  Box,
  Table,
  Paper,
  Divider,
  Popover,
  TableRow,
  MenuItem,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
} from "@mui/material";

import { error } from "src/theme/palette";
import { useModal } from "src/modals/useModal";
import { useDeleteProductVariant } from "src/mutations/use-delete-product-variant";

import Iconify from "src/components/iconify";

interface IVariants {
  product: Product | undefined;
  options: ProductOptionRequest[];
}

export default function Variants({ product, options }: IVariants) {
  const [open, setOpen] = useState<Element | null>(null);
  const { onOpen: openAddVariantModal } = useModal("add-variant-modal");
  const { onOpen: openEditOptionsModal } = useModal("edit-options-modal");
  // const { variants } = useListProductVariants({
  //   product_id: product?.id ?? "",
  // });
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
    handleCloseMenu();
  };

  const handleDelete = (product_id: string, variant_id: string) => {
    deleteProductVariantMutation({ product_id, variant_id });
    handleCloseMenu();
  };

  const handleEditOptions = () => {
    openEditOptionsModal();
    handleCloseMenu();
  };

  const handleAddVariant = () => {
    openAddVariantModal({ product, options });
    handleCloseMenu();
  };

  const popOverItems = () => {
    switch (open?.id) {
      case "table-row-op":
        return (
          <>
            <MenuItem onClick={handleEdit}>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem onClick={() => handleDelete()} sx={{ color: error.main }}>
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </>
        );
      case "section-op":
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 1,
        p: 3,
        mb: 3,
        opacity: !product ? 0.5 : 1,
        pointerEvents: !product ? "none" : "auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Variants (0)</Typography>
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
                const priceAmount = variant.prices[0].amount
                  .toString()
                  .split("");
                const formatedPriceAmount = priceAmount.slice(
                  0,
                  priceAmount.length - 2,
                );
                console.log(formatedPriceAmount);
                return (
                  <TableRow
                    key={variant.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {variant.title}
                    </TableCell>
                    <TableCell align="right">{variant.sku}</TableCell>
                    <TableCell align="right">${formatedPriceAmount}</TableCell>
                    <TableCell align="right">
                      {variant.inventory_quantity}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton id="table-row-op" onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
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
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {popOverItems()}
      </Popover>
    </Box>
  );
}
