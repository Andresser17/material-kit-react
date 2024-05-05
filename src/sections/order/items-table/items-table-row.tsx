import { CartLineItemDTO } from "@medusajs/types";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Box, Avatar, TextField, IconButton, Typography } from "@mui/material";

import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

interface IItemsTableRow {
  data: CartLineItemDTO;
  handleDelete: () => void;
}

export default function ItemsTableRow({ data, handleDelete }: IItemsTableRow) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={data.thumbnail as string}
            src={data.thumbnail as string}
            variant="square"
            sx={{ width: 24, height: 24, mr: 2 }}
          />
          <Box>
            <Typography sx={{ fontSize: 12 }} variant="subtitle2" noWrap>
              {data.title}
            </Typography>
            <Typography
              sx={{ fontSize: 10, color: "#888" }}
              variant="subtitle2"
              noWrap
            >
              Variant
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{ width: 30, height: 30, borderRadius: "5px", mr: 1 }}
          >
            <Iconify icon="ant-design:minus-outlined" />
          </IconButton>
          <TextField
            id="quantity"
            type="number"
            defaultValue={1}
            sx={{
              width: "36px",
              "& .MuiInputBase-root": {
                borderRadius: "5px",
              },
              "& .MuiInputBase-input": {
                padding: 1,
                textAlign: "center",
              },
            }}
          >
            {data.quantity}
          </TextField>
          <IconButton
            sx={{ width: 30, height: 30, borderRadius: "5px", ml: 1 }}
          >
            <Iconify icon="ant-design:plus-outlined" />
          </IconButton>
        </Box>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ fontSize: 10, mr: 1 }} variant="subtitle2" noWrap>
            {data.unit_price}
          </Typography>
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            USD
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <IconButton onClick={handleDelete}>
          <Iconify icon="lets-icons:trash" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
