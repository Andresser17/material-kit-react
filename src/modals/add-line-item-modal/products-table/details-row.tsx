import { ProductVariant } from "@medusajs/types";
import {
  Checkbox,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { LineItemRequest } from "src/mutations/use-create-line-item";
import { formatCurrency, formatCurrencyToCents } from "src/utils/format-number";

interface IDetailsRow {
  variant: ProductVariant;
  selectedRow: (product_id: string) => boolean;
  handleClick: (lineItem: LineItemRequest) => void;
}

export default function DetailsRow({
  variant,
  selectedRow,
  handleClick,
}: IDetailsRow) {
  const price = variant.prices.find((price) => price.currency_code === "usd");
  const isSelected = selectedRow(variant.id);
  const lineItem: LineItemRequest = {
    variant_id: variant.id,
    quantity: 1,
    unit_price: price?.amount,
  };

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          disableRipple
          checked={isSelected}
          onChange={() => handleClick(lineItem)}
        />
      </TableCell>

      <TableCell>
        <Stack direction="column">
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            {variant.id}
          </Typography>
          <Typography variant="subtitle2">{variant.title}</Typography>
        </Stack>
      </TableCell>

      <TableCell align="center">{variant.inventory_quantity}</TableCell>

      {price && (
        <TableCell align="center">
          <PriceField
            handleChange={(newQuantity) => {
              lineItem.unit_price = newQuantity;
            }}
            currentPrice={price.amount}
            isSelected={isSelected}
          />
        </TableCell>
      )}
    </TableRow>
  );
}

interface IPriceField {
  handleChange: (newQuantity: number) => void;
  currentPrice: number;
  isSelected: boolean;
}

function PriceField({ handleChange, currentPrice, isSelected }: IPriceField) {
  const [price, setPrice] = useState(0);

  const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = formatCurrencyToCents(e.target.value);

    handleChange(newValue);
    setPrice(newValue);
  };

  useEffect(() => {
    if (currentPrice) {
      setPrice(currentPrice);
    }
  }, [currentPrice]);

  return (
    <TextField
      id="quantity"
      value={formatCurrency(price)}
      onChange={handleStock}
      disabled={isSelected}
      sx={{
        width: "64px",
        "& .MuiInputBase-root": {
          borderRadius: "5px",
        },
        "& .MuiInputBase-input": {
          padding: 1,
          textAlign: "center",
        },
      }}
    />
  );
}
