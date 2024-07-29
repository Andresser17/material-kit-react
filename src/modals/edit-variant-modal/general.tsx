import {
  PriceAmountRequest,
  ProductOptionRequest,
  ProductVariantRequest,
} from "@medusajs/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import Iconify from "src/components/iconify";
import TitleValueOption from "src/components/title-value-option";
import { formatCurrency, formatCurrencyToCents } from "src/utils/format-number";

interface IVariantAccordion {
  control: Control<ProductVariantRequest>;
  options: ProductOptionRequest[];
  setOptions: Dispatch<SetStateAction<ProductOptionRequest[]>>;
}

export default function General({
  control,
  options,
  setOptions,
}: IVariantAccordion) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<Iconify icon="eva:minus-fill" />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        General *
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <ControlledField
            control={control}
            id="title"
            label="Custom title"
            variant="outlined"
            sx={{ width: "48%" }}
          />

          <ControlledField
            control={control}
            id="prices"
            label="Price (USD)"
            variant="outlined"
            mapControlToValue={(prices: PriceAmountRequest[]) => {
              const price = prices.find(
                (price) => price.currency_code === "usd",
              );
              return price ? formatCurrency(price.amount) : "0.00";
            }}
            mapValueToControl={(
              prices: PriceAmountRequest[],
              newValue: string,
            ) => {
              return prices.map((price) => {
                if (price.currency_code === "usd")
                  return {
                    ...price,
                    amount: formatCurrencyToCents(newValue),
                  };
                return price;
              });
            }}
            sx={{ width: "48%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Box>
        <Typography variant="subtitle2" sx={{ my: 2 }}>
          Options
        </Typography>
        {options &&
          options.map((option) => {
            return (
              <TitleValueOption
                key={option.option_id}
                option={option}
                setValue={(newValue) => {
                  setOptions((prev) => {
                    return prev.map((op) => {
                      if (op.option_id === option.option_id)
                        return { ...op, value: newValue };
                      return op;
                    });
                  });
                }}
              />
            );
          })}
      </AccordionDetails>
    </Accordion>
  );
}
