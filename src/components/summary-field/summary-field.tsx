import { Box, SxProps, Typography } from "@mui/material";

export interface ISummaryField {
  title: string;
  value: string;
  bold?: boolean;
  sx?: SxProps;
}

export default function SummaryField({
  title,
  value,
  bold,
  sx,
}: ISummaryField) {
  return (
    <Box
      sx={{
        display: "flex",

        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: bold ? "bold" : "normal", ...sx }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: bold ? "bold" : "normal", ...sx }}
      >
        {value}
      </Typography>
    </Box>
  );
}
