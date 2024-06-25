import { DraftOrderLineItem, ProductVariant } from "@medusajs/types";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

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
import { IAddProductToDraftOrderModal } from "src/modals/add-product-to-draft-order-modal";
import { useModal } from "src/modals/useModal";

// ----------------------------------------------------------------------

interface IItemsTableRow {
  variant: ProductVariant;
  setLineItems: Dispatch<SetStateAction<DraftOrderLineItem[]>>;
}

export default function ItemsTableRow({
  variant,
  setLineItems,
}: IItemsTableRow) {
  const {
    props: { selectedProducts },
    onUpdate: updateSelectedProducts,
  } = useModal<IAddProductToDraftOrderModal>(
    "add-product-to-draft-order-modal",
  );

  const handleChange = (newQuantity: number) => {
    setLineItems((prev) => {
      return prev.map((lineItem) => {
        if (lineItem.variant_id === variant.id) {
          return { ...lineItem, quantity: newQuantity };
        }

        return lineItem;
      });
    });
  };

  const handleDelete = () => {
    updateSelectedProducts({
      selectedProducts: selectedProducts.filter(
        (product) => product.id !== variant.id,
      ),
    });
    setLineItems((prev) => {
      const result = prev.filter(
        (lineItem) => lineItem.variant_id != variant.id,
      );
      return result;
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
            Max: {variant.inventory_quantity}
          </Typography>
          <StockField
            handleChange={handleChange}
            maxQuantity={variant.inventory_quantity}
          />
        </Stack>
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ fontSize: 14, mr: 1 }} variant="subtitle2" noWrap>
            {variant.inventory_quantity ?? 0}
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

interface IStockField {
  handleChange: (newQuantity: number) => void;
  maxQuantity: number;
}

function StockField({ handleChange, maxQuantity }: IStockField) {
  const [stock, setStock] = useState(1);

  const handleMinus = () => {
    if (stock === 1) return;
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
    const newValue = Number(e.target.value);

    if (newValue > maxQuantity) return;
    handleChange(newValue);
    setStock(newValue);
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
