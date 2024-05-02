import { ProductOptionDTO } from "@medusajs/types";
import { useState, Dispatch, useEffect, SetStateAction } from "react";

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

export const EDIT_OPTIONS = "edit_options";

export default function EditOptionsModal({
  open,
  setOpen,
  options,
  setOptions,
}: {
  open: string | null;
  setOpen: (value: string | null) => void;
  options: ProductOptionDTO[];
  setOptions: Dispatch<SetStateAction<ProductOptionDTO[]>>;
}) {
  const theme = useTheme();
  const handleClose = () => setOpen(null);

  return (
    <Modal
      open={open == EDIT_OPTIONS}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: 600,
          maxHeight: 750,
          backgroundColor: theme.palette.background.default,
          p: 3,
          borderRadius: 1,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Edit Options</Typography>
          <IconButton id="section-op" onClick={handleClose}>
            <Iconify icon="eva:close-fill" width={25} />
          </IconButton>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
        <ProductOptions options={options} setOptions={setOptions} />
      </Box>
    </Modal>
  );
}

function ProductOptions({
  options,
  setOptions,
}: {
  options: ProductOptionDTO[];
  setOptions: Dispatch<SetStateAction<ProductOptionDTO[]>>;
}) {
  const handleAddOption = () => {
    setOptions(
      (prev: ProductOptionDTO[]) =>
        [
          ...prev,
          {
            id: `default-${options.length + 1}`,
            title: "",
            values: [],
            created_at: "",
            updated_at: "",
          },
        ] as ProductOptionDTO[],
    );

    // save new option (call mutation)
  };

  const updateOption = (id: string, newTitle: string) => {
    setOptions((prev) => {
      return prev.map((option) => {
        if (option.id === id) option.title = newTitle;
        return option;
      });
    });

    // save new option (call mutation)
  };

  const handleDeleteOption = (id: string) => {
    if (id.split("-")[0] === "default") {
      setOptions((prev) => {
        return prev.filter((option) => option.id != id);
      });
    }

    // call mutation
  };

  useEffect(() => {
    if (options.length === 0)
      setOptions([
        {
          id: `default-${options.length + 1}`,
          title: "",
          values: [],
          created_at: "",
          updated_at: "",
        },
      ]);
    else setOptions(options);
  }, []);

  return (
    <>
      {options &&
        options.map((option) => (
          <OptionField
            key={option.id}
            title={option.title}
            id={option.id}
            updateOption={updateOption}
            handleDeleteOption={() => {
              handleDeleteOption(option.id);
            }}
          />
        ))}
      <Button
        onClick={handleAddOption}
        sx={{ width: "100%", mt: 4, border: `1px solid ${grey[700]}` }}
      >
        <Iconify icon="eva:plus-square-fill" sx={{ mr: 1 }} /> Add an option
      </Button>
    </>
  );
}

function OptionField({
  id,
  title,
  updateOption,
  handleDeleteOption,
}: {
  id: string;
  title: string;
  updateOption: (id: string, newTitle: string) => void;
  handleDeleteOption: () => void;
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (text.length === 0) setText(title);
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <TextField
        id={id}
        variant="outlined"
        size="small"
        placeholder="Add a new option"
        fullWidth
        sx={{ mr: 2 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => updateOption(id, text)}
      />
      <IconButton
        onClick={handleDeleteOption}
        aria-label="Delete option"
        size="small"
        sx={{ borderRadius: 1, border: `1px solid ${grey[700]}` }}
      >
        <Iconify icon="eva:trash-2-outline" width={28} sx={{ p: "3px" }} />
      </IconButton>
    </Box>
  );
}
