import { useLocation } from "react-router-dom";
import { useState, Dispatch, useEffect, SetStateAction } from "react";
import { ProductOptionDTO, ProductOptionRequest } from "@medusajs/types";

import { grey } from "@mui/material/colors";
import {
  Box,
  Modal,
  Button,
  Divider,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";

import { useAddProductOption } from "src/mutations/use-add-product-option";
import { useDeleteProductOption } from "src/mutations/use-delete-product-option";
import { useUpdateProductOption } from "src/mutations/use-update-product-option";

import Iconify from "src/components/iconify";

export const EDIT_OPTIONS = "edit_options";

export default function EditOptionsModal({
  open,
  setOpen,
  productId,
  options,
  setOptions,
}: {
  open: string | null;
  setOpen: (value: string | null) => void;
  productId: string;
  options: ProductOptionRequest[];
  setOptions: Dispatch<SetStateAction<ProductOptionRequest[]>>;
}) {
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
          backgroundColor: "background.default",
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
        <ProductOptions
          productId={productId}
          options={options}
          setOptions={setOptions}
        />
      </Box>
    </Modal>
  );
}

function ProductOptions({
  productId,
  options,
  setOptions,
}: {
  productId: string;
  options: ProductOptionRequest[];
  setOptions: Dispatch<SetStateAction<ProductOptionRequest[]>>;
}) {
  const deleteProductOptionMutation = useDeleteProductOption();

  const handleAddOption = () => {
    setOptions((prev) => [
      ...prev,
      {
        id: `default_${prev.length + 1}`,
        title: "",
      } as ProductOptionRequest,
    ]);
  };

  const updateOption = (id: string, newTitle: string) => {
    setOptions((prev) => {
      return prev.map((option) => {
        if (option.id === id) option.title = newTitle;
        return option;
      });
    });
  };

  const handleDeleteOption = (id: string) => {
    setOptions((prev) => {
      return prev.filter((option) => option.id != id);
    });

    if (id.split("_")[0] != "default")
      deleteProductOptionMutation({ product_id: productId, option_id: id });
  };

  useEffect(() => {
    if (options.length === 0)
      setOptions([
        {
          id: "default_1",
          title: "",
        } as ProductOptionDTO,
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
  const location = useLocation();
  const addProductOptionMutation = useAddProductOption();
  const updateProductOptionMutation = useUpdateProductOption();

  const handleSaveOption = (id: string, title: string) => {
    // save new option (call mutation)
    if (location.state?.product.id) {
      if (id.split("_")[0] === "default") {
        addProductOptionMutation({
          product_id: location.state.product.id,
          newProductOption: { id, title: text },
        });
      } else {
        updateProductOptionMutation({
          product_id: location.state.product.id,
          option: { id, title: text } as ProductOptionDTO,
        });
      }
    }
    updateOption(id, title);
  };

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
