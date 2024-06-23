import { ProductVariant } from "@medusajs/types";
import { useEffect, useState } from "react";

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
import { useUpdateLot } from "src/mutations/use-update-lot";
import { useUpdateProductVariant } from "src/mutations/use-update-product-variant";

// ----------------------------------------------------------------------

interface IItemsTableRowVariant {
  currentStock: { variant_id: string; quantity: number } | undefined;
  lot_id: string;
  variant: ProductVariant;
}

export default function ItemsTableRowVariant({
  currentStock,
  lot_id,
  variant,
}: IItemsTableRowVariant) {
  const { mutate: updateProductVariantMutation, data: updatedProduct } =
    useUpdateProductVariant();
  const { mutate: updateLotMutation } = useUpdateLot();
  const handleChange = (newQuantity: number, stock: number) => {
    updateProductVariantMutation({
      product_id: variant.product_id,
      variant_id: variant.id,
      variant: { inventory_quantity: newQuantity },
    });

    updateLotMutation({
      lot_id,
      lot: { stock: [{ variant_id: variant.id, quantity: stock }] },
    });
  };
  const [inventoryQuantity, setInventoryQuantity] = useState(0);

  useEffect(() => {
    if (variant) {
      setInventoryQuantity(variant.inventory_quantity);
    }
  }, []);

  useEffect(() => {
    if (updatedProduct) {
      const variant = updatedProduct.variants.find(
        (variant) => variant.id === variant.id,
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
              {variant.title}
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
            currentStock={currentStock}
            inventoryQuantity={inventoryQuantity}
            handleChange={handleChange}
          />
        </Stack>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ fontSize: 14, mr: 1 }} variant="subtitle2" noWrap>
            {variant.prices?.length > 0 ? variant?.prices[0].amount : 0}
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
  currentStock: { variant_id: string; quantity: number } | undefined;
  inventoryQuantity: number;
  handleChange: (newQuantity: number, stock: number) => void;
}

function StockField({
  currentStock,
  inventoryQuantity,
  handleChange,
}: IStockField) {
  const [stock, setStock] = useState(0);
  const [oldStock, setOldStock] = useState(0);

  const handleMinus = () => {
    setStock((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  };

  const handlePlus = () => {
    setStock((prev) => {
      return prev + 1;
    });
  };

  // const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
  //   const newStock = Number(e.target.value);
  //   if (newStock >= stock)
  //     handleChange(inventoryQuantity + (newStock - stock), newStock);
  //   else if (newStock < stock)
  //     handleChange(inventoryQuantity - (stock - newStock), newStock);

  //   setStock(newStock);
  // };

  const handleStock = (_event: any) => {
    if (stock === oldStock) return;

    if (stock >= oldStock) {
      handleChange(inventoryQuantity + (stock - oldStock), stock);
      setOldStock(stock);
    } else if (stock < oldStock) {
      handleChange(inventoryQuantity - (oldStock - stock), stock);
      setOldStock(stock);
    }
  };

  useEffect(() => {
    if (currentStock) {
      setStock(currentStock.quantity);
      setOldStock(currentStock.quantity);
    }
  }, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={handleMinus}
        onMouseLeave={handleStock}
        sx={{ width: 30, height: 30, borderRadius: "5px", mr: 1 }}
      >
        <Iconify icon="ant-design:minus-outlined" />
      </IconButton>
      <TextField
        id="quantity"
        type="number"
        value={stock}
        onChange={(e) => {
          if (stock !== oldStock) setOldStock(stock);
          setStock(Number(e.target.value));
        }}
        onBlur={handleStock}
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
        onMouseLeave={handleStock}
        sx={{ width: 30, height: 30, borderRadius: "5px", ml: 1 }}
      >
        <Iconify icon="ant-design:plus-outlined" />
      </IconButton>
    </Box>
  );
}
