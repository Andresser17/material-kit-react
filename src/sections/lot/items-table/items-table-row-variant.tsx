import { ProductVariant } from "@medusajs/types";
import { ChangeEvent, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Iconify from "src/components/iconify";
import { useUpdateProductVariant } from "src/mutations/use-update-product-variant";

// ----------------------------------------------------------------------

interface IItemsTableRowVariant {
  data: ProductVariant;
}

export default function ItemsTableRowVariant({ data }: IItemsTableRowVariant) {
  const { mutate: updateProductVariantMutation, data: updatedProduct } =
    useUpdateProductVariant();
  const handleChange = (newQuantity: number) => {
    updateProductVariantMutation({
      product_id: data.product_id,
      variant_id: data.id,
      variant: { inventory_quantity: newQuantity },
    });
  };
  const [inventoryQuantity, setInventoryQuantity] = useState(0);

  useEffect(() => {
    if (data) {
      setInventoryQuantity(data.inventory_quantity);
    }
  }, []);

  useEffect(() => {
    if (updatedProduct) {
      const variant = updatedProduct.variants.find(
        (variant) => variant.id === data.id,
      );
      if (variant) setInventoryQuantity(variant.inventory_quantity);
    }
  }, [updatedProduct]);

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
            Stock: {inventoryQuantity}
          </Typography>
          <StockField
            inventoryQuantity={inventoryQuantity}
            handleChange={handleChange}
          />
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

interface IStockField {
  inventoryQuantity: number;
  handleChange: (newQuantity: number) => void;
}

function StockField({ inventoryQuantity, handleChange }: IStockField) {
  const [stock, setStock] = useState(0);

  const handleMinus = () => {
    setStock((prev) => {
      if (prev === 0) return prev;

      handleChange(inventoryQuantity - 1);
      return prev - 1;
    });
  };

  const handlePlus = () => {
    setStock((prev) => {
      handleChange(inventoryQuantity + 1);
      return prev + 1;
    });
  };

  const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
    const newStock = Number(e.target.value);
    if (newStock >= stock) handleChange(inventoryQuantity + (newStock - stock));
    else if (newStock < stock)
      handleChange(inventoryQuantity - (stock - newStock));

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
