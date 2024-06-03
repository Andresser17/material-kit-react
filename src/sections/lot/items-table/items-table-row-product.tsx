import { Product } from "@medusajs/types";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Box, Avatar, IconButton, Typography } from "@mui/material";

import { useAppDispatch } from "src/redux/hooks";
import { removeSelected } from "src/redux/slices/add-existing-product";

import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

interface IItemsTableRowProduct {
  data: Product;
}

export default function ItemsTableRowProduct({ data }: IItemsTableRowProduct) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(removeSelected(data.id));
  };

  return (
    <TableRow tabIndex={-1}>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt=""
            src=""
            variant="square"
            sx={{ width: 24, height: 24, mr: 2 }}
          />
          <Typography sx={{ fontSize: 12 }} variant="subtitle2" noWrap>
            {data.title}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", fontSize: 10 }}
        >
          Total Stock:{" "}
          {data.variants &&
            data.variants.reduce((prev, current) => {
              return prev + current.inventory_quantity;
            }, 0)}
        </Typography>
      </TableCell>

      <TableCell>
        <IconButton onClick={handleDelete}>
          <Iconify icon="lets-icons:trash" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
