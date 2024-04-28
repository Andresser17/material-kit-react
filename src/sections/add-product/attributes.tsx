import Box from "@mui/material/Box";
import {
  Divider,
  useTheme,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

export default function Attributes() {
  const theme = useTheme();
  const options = [{ value: "china", label: "China" }];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
        p: 3,
        mb: 3
      }}
    >
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
        <TextField
          type="number"
          id="height"
          label=""
          variant="outlined"
          required
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
        <TextField
          type="number"
          id="width"
          label=""
          variant="outlined"
          required
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
        <TextField
          type="number"
          id="length"
          label=""
          variant="outlined"
          required
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
        <TextField
          type="number"
          id="weight"
          label=""
          variant="outlined"
          required
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
        <TextField
          type="string"
          id="mid-code"
          label=""
          variant="outlined"
          required
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
        <TextField
          type="string"
          id="hs-code"
          label=""
          variant="outlined"
          required
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
        <TextField
          select
          defaultValue="china"
          id="country-of-origin"
          label=""
          variant="outlined"
          required
          sx={{ width: 250 }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}
