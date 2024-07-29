import { ProductVariantRequest } from "@medusajs/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { Control } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import Iconify from "src/components/iconify";

interface IStock {
  control: Control<ProductVariantRequest>;
}

export default function Stock({ control }: IStock) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<Iconify icon="eva:minus-fill" />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        Stock & Inventory
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <ControlledField
            control={control}
            id="sku"
            label="Stock keeping unit (SKU)"
            variant="outlined"
            sx={{ width: "48%" }}
          />
          <ControlledField
            control={control}
            id="inventory_quantity"
            type="number"
            label="Inventory Quantity"
            variant="outlined"
            sx={{ width: "48%" }}
          />
          <ControlledField
            control={control}
            id="ean"
            label="EAN (Barcode)"
            variant="outlined"
            sx={{ width: "48%" }}
          />
          <ControlledField
            control={control}
            id="upc"
            label="UPC (Barcode)"
            variant="outlined"
            sx={{ width: "48%" }}
          />
          <ControlledField
            control={control}
            id="barcode"
            label="Barcode"
            variant="outlined"
            sx={{ width: "48%" }}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1">Manage inventory</Typography>
          <FormControlLabel
            control={
              <Switch
                id="manage-inventory"
                aria-label="Manage inventory"
                defaultChecked
              />
            }
            label="When checked Medusa will regulate the inventory when orders and returns are made"
            labelPlacement="start"
            slotProps={{
              typography: {
                fontSize: 12,
              },
            }}
            sx={{ display: "flex", justifyContent: "space-between", m: 0 }}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1">Allow backorders</Typography>
          <FormControlLabel
            control={
              <Switch id="allow-backorders" aria-label="Allow backorders" />
            }
            label="When checked the product will be available for purchase despite being sold out"
            labelPlacement="start"
            slotProps={{
              typography: {
                fontSize: 12,
              },
            }}
            sx={{ display: "flex", justifyContent: "space-between", m: 0 }}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
