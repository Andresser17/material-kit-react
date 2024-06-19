import { ProductOptionRequest } from "@medusajs/types";
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
import { ProductVariantForm } from "./add-variant-modal";
import TitleValueOption from "./title-value-option";

interface IVariantAccordion {
  control: Control<ProductVariantForm>;
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
            id="price"
            label="Price (USD)"
            variant="outlined"
            type="number"
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
