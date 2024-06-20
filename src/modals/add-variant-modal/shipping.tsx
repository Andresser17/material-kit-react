import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Control } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import Iconify from "src/components/iconify";
import { ProductVariantForm } from "./add-variant-modal";

interface IShipping {
  control: Control<ProductVariantForm>;
}

export default function Shipping({ control }: IShipping) {
  const countries = [{ value: "china", label: "China" }];

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<Iconify icon="eva:minus-fill" />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        <div>
          <Typography variant="subtitle1">Shipping</Typography>
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, fontSize: 12, color: grey[600] }}
          >
            Shipping information can be required depending on your shipping
            provider, and whether or not you are shipping internationally
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle2">Dimensions</Typography>
        <Typography
          variant="subtitle2"
          sx={{ mt: 1, mb: 2, fontSize: 12, color: grey[600] }}
        >
          Configure to calculate the most accurate shipping rates.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <ControlledField
            control={control}
            id="width"
            type="number"
            label="Width"
            variant="outlined"
            sx={{ width: "23%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
          <ControlledField
            control={control}
            id="length"
            type="number"
            label="Length"
            variant="outlined"
            sx={{ width: "23%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
          <ControlledField
            control={control}
            id="height"
            type="number"
            label="Height"
            variant="outlined"
            sx={{ width: "23%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
          />
          <ControlledField
            control={control}
            id="weight"
            type="number"
            label="Weight"
            variant="outlined"
            sx={{ width: "23%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />
        </Box>
        <Typography variant="subtitle2">Customs</Typography>
        <Typography
          variant="subtitle2"
          sx={{ mt: 1, mb: 2, fontSize: 12, color: grey[600] }}
        >
          Configure if you are shipping internationally.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <ControlledField
            control={control}
            id="mid_code"
            label="MID Code"
            variant="outlined"
            sx={{ width: "48%" }}
          />
          <ControlledField
            control={control}
            id="hs_code"
            label="HS Code"
            variant="outlined"
            sx={{ width: "48%" }}
          />
          <ControlledField
            control={control}
            select
            defaultValue="china"
            id="country-of-origin"
            label="Country of origin"
            variant="outlined"
            required
            sx={{ width: "48%", mt: 1 }}
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </ControlledField>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
