import { ProductRequest } from "@medusajs/types";
import { Control } from "react-hook-form";

import { Box, Divider, InputAdornment, Typography } from "@mui/material";

import ControlledField from "src/components/controlled-field";
import SectionBox from "src/components/section-box";

interface IAttributes {
  control: Control<ProductRequest>;
}

export default function Attributes({ control }: IAttributes) {
  // const options = [{ value: "china", label: "China" }];

  return (
    <SectionBox>
      <Typography variant="h4">Attributes</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Dimensions
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Width</Typography>
        <ControlledField<ProductRequest>
          control={control}
          type="number"
          id="width"
          label=""
          variant="outlined"
          sx={{ width: 96 }}
          InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Height</Typography>
        <ControlledField<ProductRequest>
          control={control}
          type="number"
          id="height"
          label=""
          variant="outlined"
          sx={{ width: 96 }}
          InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Length</Typography>
        <ControlledField<ProductRequest>
          control={control}
          type="number"
          id="length"
          label=""
          variant="outlined"
          sx={{ width: 96 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Weight</Typography>
        <ControlledField<ProductRequest>
          control={control}
          type="number"
          id="weight"
          label=""
          variant="outlined"
          sx={{ width: 96 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ my: 2 }}>
        Customs
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>MID Code</Typography>
        <ControlledField<ProductRequest>
          control={control}
          type="string"
          id="mid_code"
          label=""
          variant="outlined"
          sx={{ width: 250 }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>HS Code</Typography>
        <ControlledField<ProductRequest>
          control={control}
          id="hs_code"
          variant="outlined"
          sx={{ width: 250 }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Country of Origin</Typography>
        {/* <ControlledField
          control={control}
          select
          defaultValue="china"
          id="origin_country"
          label=""
          variant="outlined"
          sx={{ width: 250 }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </ControlledField> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Warranty Time</Typography>
        <ControlledField<ProductRequest>
          control={control}
          id="warranty"
          variant="outlined"
          sx={{ width: 250 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">Days</InputAdornment>,
          }}
        />
      </Box>
    </SectionBox>
  );
}
