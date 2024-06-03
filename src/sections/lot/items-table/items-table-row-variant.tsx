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

interface IItemsTableRowVariant {
  data: ProductVariant;
}

export default function ItemsTableRowVariant({ data }: IItemsTableRowVariant) {
  const handleChange = (newQuantity: number) => {
    console.log({ newQuantity });
    // setLineItems((prev) => {
    //   return prev.map((lineItem) => {
    //     if (lineItem.variant_id === data.id) {
    //       return { ...lineItem, quantity: newQuantity };
    //     }
    //     return lineItem;
    //   });
    // });
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
            Stock: {data.inventory_quantity}
          </Typography>
          <StockField handleChange={handleChange} />
        </Stack>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ fontSize: 14, mr: 1 }} variant="subtitle2" noWrap>
            {data.prices?.length > 0 ? data?.prices[0].amount : 0}
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
    </TableRow>
  );
}

function StockField({
  handleChange,
}: {
  handleChange: (newQuantity: number) => void;
}) {
  const [stock, setStock] = useState(1);

  const handleMinus = () => {
    setStock((prev) => {
      handleChange(prev - 1);
      return prev - 1;
    });
  };

  const handlePlus = () => {
    setStock((prev) => {
      handleChange(prev + 1);
      return prev + 1;
    });
  };

  const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(Number(e.target.value));
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
