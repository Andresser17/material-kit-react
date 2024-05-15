import { useState, useEffect } from "react";
import { ProductOptionRequest } from "@medusajs/types";

import { grey } from "@mui/material/colors";
import { Box, Button, TextField, IconButton } from "@mui/material";

import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
  getOptions,
  setOptions as setOptionsAction,
} from "src/redux/slices/product-options/product-options-slice";

import Iconify from "src/components/iconify";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export default function EditOptionsModal() {
  const { onClose: closeModal } = useModal("edit-options-modal");
  const [options, setOptions] = useState<ProductOptionRequest[]>(
    useAppSelector((state) => getOptions(state)),
  );
  const dispatch = useAppDispatch();

  const handleAddOption = () => {
    setOptions((prev) => [
      ...prev,
      {
        id: `default_${prev.length + 1}`,
        title: "",
      },
    ]);
  };

  const handleUpdateOption = (id: string, newTitle: string) => {
    setOptions((prev) =>
      prev.map((option) => {
        if (option.id === id) return { ...option, title: newTitle };
        return option;
      }),
    );
  };

  const handleDeleteOption = (id: string) => {
    setOptions((prev) => prev.filter((option) => option.id != id));
  };

  const handleSave = () => {
    dispatch(setOptionsAction(options));

    closeModal();
  };

  useEffect(() => {
    if (options && options.length === 0) handleAddOption();
  }, []);

  return (
    <BaseModal
      modalId="edit-options-modal"
      title="Edit Options"
      open
      closeOnTap
      onClose={closeModal}
      onSubmit={handleSave}
    >
      <>
        {options &&
          options.map((option) => (
            <OptionField
              key={option.id}
              title={option.title}
              id={option.id}
              handleUpdateOption={handleUpdateOption}
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
    </BaseModal>
  );
}

function OptionField({
  id,
  title,
  handleUpdateOption,
  handleDeleteOption,
}: {
  id: string;
  title: string;
  handleUpdateOption: (id: string, newTitle: string) => void;
  handleDeleteOption: () => void;
}) {
  const [text, setText] = useState("");

  const handleSaveOption = (id: string, title: string) => {
    handleUpdateOption(id, title);
  };

  useEffect(() => {
    if (text.length === 0) setText(title);
  }, []);

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
        onBlur={() => handleSaveOption(id, text)}
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
