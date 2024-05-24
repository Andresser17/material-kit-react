import { ProductVariant, DraftOrderLineItem } from "@medusajs/types";
import { useState, Dispatch, ChangeEvent, SetStateAction } from "react";

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

import { useAppDispatch } from "src/redux/hooks";
import { removeSelected } from "src/redux/slices/add-existing-product";

import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

interface IItemsTableRow {
  data: ProductVariant;
  setLineItems: Dispatch<SetStateAction<DraftOrderLineItem[]>>;
}

export default function ItemsTableRow({ data, setLineItems }: IItemsTableRow) {
  const dispatch = useAppDispatch();

  const handleChange = (newQuantity: number) => {
    setLineItems((prev) => {
      return prev.map((lineItem) => {
        if (lineItem.variant_id === data.id) {
          return { ...lineItem, quantity: newQuantity };
        }

        return lineItem;
      });
    });
  };

  const handleDelete = () => {
    dispatch(removeSelected(data.id));
    setLineItems((prev) => {
      return prev.filter((lineItem) => lineItem.variant_id != data.id);
    });
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
            Max: {data.inventory_quantity}
          </Typography>
          <StockField
            handleChange={handleChange}
            maxQuantity={data.inventory_quantity}
          />
        </Stack>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ fontSize: 14, mr: 1 }} variant="subtitle2" noWrap>
            {data.inventory_quantity ?? 0}
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
        <IconButton onClick={handleDelete}>
          <Iconify icon="lets-icons:trash" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function StockField({
  handleChange,
  maxQuantity,
}: {
  handleChange: (newQuantity: number) => void;
  maxQuantity: number;
}) {
  const [stock, setStock] = useState(1);

  const handleMinus = () => {
    if (maxQuantity === stock) return;
    setStock((prev) => {
      handleChange(prev - 1);
      return prev - 1;
    });
  };

  const handlePlus = () => {
    if (maxQuantity === stock) return;
    setStock((prev) => {
      handleChange(prev + 1);
      return prev + 1;
    });
  };

  const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxQuantity === stock) return;
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
