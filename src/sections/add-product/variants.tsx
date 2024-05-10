import { useState, Dispatch, SetStateAction } from "react";
import { ProductDTO, ProductOptionDTO } from "@medusajs/types";

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

import Iconify from "src/components/iconify";

import EditOptionsModal, { EDIT_OPTIONS } from "./edit-options-modal";

export default function Variants({
  product,
  options,
  setOptions,
}: {
  product: ProductDTO;
  options: ProductOptionDTO[];
  setOptions: Dispatch<SetStateAction<ProductOptionDTO[]>>;
}) {
  const { onOpen: openAddVariantModal } = useModal("add-variant-modal");
  const rows = [{ title: "512 GB", sku: "", price: "$25", inventory: 5 }];
  const [open, setOpen] = useState<Element | null>(null);
  const [openModal, setOpenModal] = useState<string | null>(null);

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

  const handleDelete = () => {
    handleCloseMenu();
  };

  const handleEditOptions = () => {
    setOpenModal(EDIT_OPTIONS);
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

            <MenuItem onClick={handleDelete} sx={{ color: error.main }}>
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </>
        );
      case "section-op":
        return (
          <>
            <MenuItem onClick={() => openAddVariantModal({ options })}>
              <Iconify icon="eva:cube-outline" sx={{ mr: 1 }} />
              Add Variant
            </MenuItem>

            {/* TODO */}
            <MenuItem onClick={handleDelete}>
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
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.sku}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.inventory}</TableCell>
                <TableCell align="right">
                  <IconButton id="table-row-op" onClick={handleOpenMenu}>
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
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
      {/* <AddVariantModal
        open={openModal}
        setOpen={setOpenModal}
        options={options}
      /> */}
      <EditOptionsModal
        open={openModal}
        setOpen={setOpenModal}
        productId={product?.id}
        options={options}
        setOptions={setOptions}
      />
    </Box>
  );
}
