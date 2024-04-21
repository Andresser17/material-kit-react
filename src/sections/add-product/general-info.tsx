import Box from "@mui/material/Box";
import { Divider, useTheme, TextField, Typography } from "@mui/material";

export default function GeneralInfo() {
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
      <Typography variant="h4">General Information</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          required
          sx={{ width: "48%" }}
        />
        <TextField
          id="subtitle"
          label="Subtitle"
          variant="outlined"
          sx={{ width: "48%" }}
        />
        <TextField
          id="handle"
          label="Handle"
          variant="outlined"
          required
          sx={{ width: "48%" }}
        />
      </Box>
      <TextField
        id="description="
        label="Description"
        variant="outlined"
        multiline
        rows="5"
        fullWidth
        sx={{ mt: 4 }}
      />
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Organize Product
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <TextField
          id="type"
          label="Choose a Type"
          variant="outlined"
          required
        />
        <TextField
          id="collection"
          label="Choose a collection"
          variant="outlined"
        />
        <TextField
          id="tags"
          label="Tags (comma separated)"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Metadata
      </Typography>
    </Box>
  );
}
