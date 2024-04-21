import { useState } from "react";

import { grey } from "@mui/material/colors";
import {
  Box,
  Modal,
  Button,
  Divider,
  useTheme,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";

import Iconify from "src/components/iconify";

export default function EditOptions({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const theme = useTheme();
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          maxWidth: 750,
          backgroundColor: theme.palette.background.default,
          p: 3,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Add Variant</Typography>
          <IconButton id="section-op" onClick={handleClose}>
            <Iconify icon="eva:close-fill" width={25} />
          </IconButton>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
        <ProductOptions />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            color="success"
            size="medium"
            sx={{ mr: 2 }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            variant="text"
            size="small"
            color="error"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

function ProductOptions() {
  const options = ["Color", "Size", "Shape"];
  const [productOptions, setProductOptions] = useState<Element[]>();

  const handleAddOption = () => {};

  const handleDeleteOption = (id: string) => {};

  return (
    <>
      {options.map((option) => (
        <OptionField key={option} title={option} handleDeleteOption={handleDeleteOption} />
      ))}
      <Button sx={{ width: "100%", mt: 4, border: `1px solid ${grey[700]}` }}>
        <Iconify icon="eva:plus-square-fill" sx={{ mr: 1 }} /> Add an option
      </Button>
    </>
  );
}

function OptionField({
  title,
  handleDeleteOption,
}: {
  title: string;
  handleDeleteOption: (optionId: string) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextField
        id={title.toLowerCase()}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mr: 2 }}
        value={title}
      />
      <IconButton
        onClick={() => handleDeleteOption("")}
        aria-label="Delete option"
        size="small"
        sx={{ borderRadius: 1, border: `1px solid ${grey[700]}` }}
      >
        <Iconify icon="eva:trash-2-outline" width={28} sx={{ p: "3px" }} />
      </IconButton>
    </Box>
  );
}
