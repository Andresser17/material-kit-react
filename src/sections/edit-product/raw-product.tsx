import Box from "@mui/material/Box";
import { Divider, useTheme, Typography } from "@mui/material";

export default function Variants() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
        p: 3,
        mb: 3,
      }}
    >
      <Typography variant="h4">Raw Product</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Typography>{"{}"}</Typography>
      </Box>
    </Box>
  );
}
