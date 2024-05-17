import { useState, ChangeEvent } from "react";
import { ProductVariant } from "@medusajs/types";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  Box,
  Stack,
  Avatar,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";

import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

interface IItemsTableRow {
  data: ProductVariant;
  handleDelete: (id: string) => void;
}

export default function ItemsTableRow({ data, handleDelete }: IItemsTableRow) {
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
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "text.secondary", fontSize: 10 }}
          >
            Max: {data.inventory_quantity}
          </Typography>
          <StockField inventory_quantity={data.inventory_quantity} />
        </Stack>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ fontSize: 14, mr: 1 }} variant="subtitle2" noWrap>
            {data.prices[0]?.amount ?? 0}
          </Typography>
          <Typography
            sx={{ fontSize: 14, color: "text.secondary" }}
            variant="subtitle2"
            noWrap
          >
            USD
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <IconButton onClick={() => handleDelete(data.id)}>
          <Iconify icon="lets-icons:trash" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function StockField({ inventory_quantity }: { inventory_quantity: number }) {
  const [stock, setStock] = useState(0);

  const handleMinus = () => {
    if (inventory_quantity === stock) return;
    setStock((prev) => prev - 1);
  };

  const handlePlus = () => {
    if (inventory_quantity === stock) return;
    setStock((prev) => prev + 1);
  };

  const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
    if (inventory_quantity === stock) return;
    setStock(Number(e.target.value));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={handleMinus}
        sx={{ width: 30, height: 30, borderRadius: "5px", mr: 1 }}
      >
        <Iconify icon="ant-design:minus-outlined" />
      </IconButton>
      <TextField
        id="quantity"
        type="number"
        value={stock}
        onChange={handleStock}
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
        {stock}
      </TextField>
      <IconButton
        onClick={handlePlus}
        sx={{ width: 30, height: 30, borderRadius: "5px", ml: 1 }}
      >
        <Iconify icon="ant-design:plus-outlined" />
      </IconButton>
    </Box>
  );
}
