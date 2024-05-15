import { Control, useForm, SubmitHandler } from "react-hook-form";
import { Dispatch, useState, useEffect, SetStateAction } from "react";
import {
  ProductDTO,
  ProductOptionRequest,
  ProductOptionValueDTO,
  ProductVariantRequest,
} from "@medusajs/types";

import {
  Switch,
  MenuItem,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import {
  Box,
  Accordion,
  TextField,
  Typography,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import { grey } from "src/theme/palette";
import BaseModal from "src/modals/base-modal";
import { useAddProductVariant } from "src/mutations/use-add-product-variant";

import Iconify from "src/components/iconify";
import ControlledField from "src/components/controlled-field";

import { useModal } from "../useModal";

export interface IAddVariantModal {
  product: ProductDTO | undefined;
  options: ProductOptionRequest[];
}

export default function AddVariantModal() {
  const {
    props: { product, options },
    onClose: closeModal,
  } = useModal<IAddVariantModal>("add-variant-modal");
  const [optionValues, setOptionValues] = useState<ProductOptionValueDTO[]>([]);
  const { handleSubmit, control } = useForm<ProductVariantRequest>({
    defaultValues: {
      title: "",
      sku: "",
      ean: "",
      upc: "",
      barcode: "",
      hs_code: "",
      inventory_quantity: 0,
      allow_backorder: false,
      manage_inventory: true,
      weight: 0,
      length: 0,
      height: 0,
      width: 0,
      origin_country: "",
      mid_code: "",
      material: "",
      metadata: {},
      prices: [],
      options: [],
    },
    mode: "onChange",
  });
  const addProductVariantMutation = useAddProductVariant();
  const onSubmit: SubmitHandler<ProductVariantRequest> = (data) => {
    // console.log(data);
    // console.log({ optionValues });
    addProductVariantMutation({
      product_id: product?.id ?? "",
      newProductVariant: data,
    });
  };

  console.log({ product, options });

  return (
    <BaseModal
      modalId="add-variant-modal"
      title="Add Variant"
      open
      closeOnTap
      onClose={closeModal}
    >
      <form id="add-variant-modal" onSubmit={handleSubmit(onSubmit)}>
        <VariantAccordion
          control={control}
          options={options}
          optionValues={optionValues}
          setOptionValues={setOptionValues}
        />
      </form>
    </BaseModal>
  );
}

function VariantAccordion({
  control,
  options,
  optionValues,
  setOptionValues,
}: {
  control: Control<ProductVariantRequest>;
  options: ProductOptionRequest[];
  optionValues: ProductOptionValueDTO[];
  setOptionValues: Dispatch<SetStateAction<ProductOptionValueDTO[]>>;
}) {
  const countries = [{ value: "china", label: "China" }];

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<Iconify icon="eva:minus-fill" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          General *
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <ControlledField
              control={control}
              id="title"
              label="Custom title"
              variant="outlined"
              sx={{ width: "48%" }}
            />
          </Box>
          <Typography variant="subtitle2" sx={{ my: 2 }}>
            Options
          </Typography>
          {options &&
            options.map((option) => {
              const optionValue = optionValues.find(
                (optionValue) => optionValue.option_id === option.id,
              );

              return (
                <TitleValueOption
                  key={option.id}
                  option={option}
                  optionValue={optionValue}
                  setOptionValues={setOptionValues}
                />
              );
            })}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<Iconify icon="eva:minus-fill" />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Stock & Inventory
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <ControlledField
              control={control}
              id="sku"
              label="Stock keeping unit (SKU)"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <ControlledField
              control={control}
              id="stock"
              type="number"
              label="Stock"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <ControlledField
              control={control}
              id="ean"
              label="EAN (Barcode)"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <ControlledField
              control={control}
              id="upc"
              label="UPC (Barcode)"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <ControlledField
              control={control}
              id="barcode"
              label="Barcode"
              variant="outlined"
              sx={{ width: "48%" }}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1">Manage inventory</Typography>
            <FormControlLabel
              control={
                <Switch
                  id="manage-inventory"
                  aria-label="Manage inventory"
                  defaultChecked
                />
              }
              label="When checked Medusa will regulate the inventory when orders and returns are made"
              labelPlacement="start"
              slotProps={{
                typography: {
                  fontSize: 12,
                },
              }}
              sx={{ display: "flex", justifyContent: "space-between", m: 0 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1">Allow backorders</Typography>
            <FormControlLabel
              control={
                <Switch id="allow-backorders" aria-label="Allow backorders" />
              }
              label="When checked the product will be available for purchase despite being sold out"
              labelPlacement="start"
              slotProps={{
                typography: {
                  fontSize: 12,
                },
              }}
              sx={{ display: "flex", justifyContent: "space-between", m: 0 }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<Iconify icon="eva:minus-fill" />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <div>
            <Typography variant="subtitle1">Shipping</Typography>
            <Typography
              variant="subtitle2"
              sx={{ mt: 1, fontSize: 12, color: grey[600] }}
            >
              Shipping information can be required depending on your shipping
              provider, and whether or not you are shipping internationally
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">Dimensions</Typography>
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, mb: 2, fontSize: 12, color: grey[600] }}
          >
            Configure to calculate the most accurate shipping rates.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <ControlledField
              control={control}
              id="width"
              type="number"
              label="Width"
              variant="outlined"
              sx={{ width: "23%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
            />
            <ControlledField
              control={control}
              id="length"
              type="number"
              label="Length"
              variant="outlined"
              sx={{ width: "23%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
            />
            <ControlledField
              control={control}
              id="height"
              type="number"
              label="Height"
              variant="outlined"
              sx={{ width: "23%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
            />
            <ControlledField
              control={control}
              id="weight"
              type="number"
              label="Weight"
              variant="outlined"
              sx={{ width: "23%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              }}
            />
          </Box>
          <Typography variant="subtitle2">Customs</Typography>
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, mb: 2, fontSize: 12, color: grey[600] }}
          >
            Configure if you are shipping internationally.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <ControlledField
              control={control}
              id="mid-code"
              label="MID Code"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <ControlledField
              control={control}
              id="hs-code"
              label="HS Code"
              variant="outlined"
              sx={{ width: "48%" }}
            />
            <ControlledField
              control={control}
              select
              defaultValue="china"
              id="country-of-origin"
              label="Country of origin"
              variant="outlined"
              required
              sx={{ width: "48%", mt: 1 }}
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </ControlledField>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<Iconify icon="eva:minus-fill" />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          Metadata
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </Box>
  );
}

interface ITitleValueOption {
  option: ProductOptionRequest;
  optionValue: ProductOptionValueDTO | undefined;
  setOptionValues: Dispatch<SetStateAction<ProductOptionValueDTO[]>>;
}

function TitleValueOption({
  option,
  optionValue,
  setOptionValues,
}: ITitleValueOption) {
  const [text, setText] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setOptionValues((prev: ProductOptionValueDTO[]) => {
      return prev.map((optionValue: ProductOptionValueDTO) => {
        if (optionValue.option_id === option.id) {
          return { ...optionValue, value: text };
        }

        return optionValue;
      });
    });
  };

  useEffect(() => {
    setText(optionValue ? optionValue.value : "");
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
