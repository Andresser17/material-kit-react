import { SetStateAction } from "react";
// ----------------------------------------------------------------------

import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Iconify from "src/components/iconify";

interface IProductTableToolbar {
  selectedRows: number;
  filterName: string;
  onFilterName: (event: { target: { value: SetStateAction<string> } }) => void;
}

export default function ProductTableToolbar({
  selectedRows,
  filterName,
  onFilterName,
}: IProductTableToolbar) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography component="div" variant="subtitle1">
        {selectedRows} selected
      </Typography>

      <OutlinedInput
        value={filterName}
        onChange={onFilterName}
        placeholder="Search..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
    </Toolbar>
  );
}
