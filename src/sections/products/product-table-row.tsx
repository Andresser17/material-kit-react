import { Product } from "@medusajs/types";
import { ChangeEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { ProductStatus } from "src/enums";
import { useDeleteProduct } from "src/mutations/use-delete-product";

import Iconify from "src/components/iconify";
import Label from "src/components/label";

// ----------------------------------------------------------------------

interface IProductTableRow {
  product: Product;
  selectedRow: boolean;
  handleClick: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function ProductTableRow({
  product,
  selectedRow,
  handleClick,
}: IProductTableRow) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<Element | null>(null);
  const deleteProductMutation = useDeleteProduct();

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
    navigate(`/products/${product.id}`, {
      state: {
        product,
      },
    });
  };

  const handleDelete = () => {
    deleteProductMutation({ id: product.id });
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selectedRow}>
        <TableCell padding="checkbox">
          <Checkbox
            disableRipple
            checked={selectedRow}
            onChange={handleClick}
          />
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
            sx={{ width: 96, height: 96 }}
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

        <TableCell align="center">{product.variants.length}</TableCell>

        <TableCell>
          <Label
            color={
              (product.status === ProductStatus.DRAFT && "error") || "success"
            }
          >
            {product.status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
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
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
