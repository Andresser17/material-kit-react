import { ProductOptionRequest } from "@medusajs/types";
import { Box, TextField, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";

interface ITitleValueOption {
  option: ProductOptionRequest;
  setValue: (newValue: string) => void;
}

export default function TitleValueOption({
  option,
  setValue,
}: ITitleValueOption) {
  const [text, setText] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setValue(text);
  };

  useEffect(() => {
    if (option) setText(option.value);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontSize: 14, color: "#888", mr: 2 }}
      >
        {option.title}
      </Typography>
      <TextField
        onBlur={handleBlur}
        onChange={handleChange}
        value={text}
        size="small"
      />
    </Box>
  );
}
