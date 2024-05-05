import { Stack, Typography } from "@mui/material";

export interface ITitleValueField {
  title: string;
  value: string;
}

export default function TitleValueField({ title, value }: ITitleValueField) {
  return (
    <Stack
      sx={{
        px: 2.5,
        borderRight: "1px solid #888",
        "&:first-of-type": {
          pl: 0,
        },
        "&:last-child": {
          borderRight: "none",
        },
      }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#888" }}>
        {title}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
        {value}
      </Typography>
    </Stack>
  );
}
