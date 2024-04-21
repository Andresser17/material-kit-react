import { useState, ChangeEvent, SetStateAction } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import { Stack, Avatar, Typography } from "@mui/material";

import { ProductStatus } from "src/queries/use-list-products";
import { useDeleteProduct } from "src/mutations/use-delete-product";

import Label from "src/components/label";
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

interface IUserTableRow {
  thumbnail: string;
  productId: string;
  title: string;
  status: ProductStatus;
  quantity: number;
  price: number;
  selectedRow: boolean;
  handleClick: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function ProductTableRow({
  thumbnail,
  productId,
  title,
  status,
  quantity,
  price,
  selectedRow,
  handleClick,
}: IUserTableRow) {
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
   
    handleCloseMenu()
  }

  const handleDelete = () => {
    deleteProductMutation({ id: productId });
    handleCloseMenu()
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
            alt={thumbnail}
            src={thumbnail}
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
              #{productId.split("").slice(5)}
            </Typography>
            <Typography variant="subtitle2">{title}</Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">{quantity}</TableCell>

        <TableCell align="center">{price}</TableCell>

        <TableCell>
          <Label
            color={(status === ProductStatus.DRAFT && "error") || "success"}
          >
            {status}
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
