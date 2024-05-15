import { Control } from "react-hook-form";
import { ProductRequest } from "@medusajs/types";

import Box from "@mui/material/Box";
import { Divider, MenuItem, Typography, InputAdornment } from "@mui/material";

import SectionBox from "src/components/section-box";
import ControlledField from "src/components/controlled-field";

export default function Attributes({
  control,
}: {
  control: Control<ProductRequest>;
}) {
  const options = [{ value: "china", label: "China" }];

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
        <Typography>Height</Typography>
        <ControlledField
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
        <Typography>Width</Typography>
        <ControlledField
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
        <Typography>Length</Typography>
        <ControlledField
          control={control}
          type="number"
          id="length"
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
        <Typography>Weight</Typography>
        <ControlledField
          control={control}
          type="number"
          id="weight"
          label=""
          variant="outlined"
          sx={{ width: 96 }}
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
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
        <ControlledField
          control={control}
          type="string"
          id="mid-code"
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
        <ControlledField
          control={control}
          type="string"
          id="hs-code"
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
        <Typography>Country of Origin</Typography>
        <ControlledField
          control={control}
          select
          defaultValue="china"
          id="country-of-origin"
          label=""
          variant="outlined"
          sx={{ width: 250 }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </ControlledField>
      </Box>
    </SectionBox>
  );
}
