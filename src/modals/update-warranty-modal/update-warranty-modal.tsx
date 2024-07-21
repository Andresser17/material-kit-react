import { Warranty } from "@medusajs/types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import ControlledSelect from "src/components/controlled-select";
import Iconify from "src/components/iconify";
import SortableContainer from "src/components/sortable-container";
import { BarcodeType } from "src/enums";
import { WarrantyRequest } from "src/mutations/use-create-warranty";
import { useUpdateWarranty } from "src/mutations/use-update-warranty";
import { SortableImageType } from "src/sections/product/add-images";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface IUpdateWarrantyModal {
  warranty: Warranty;
}

export default function UpdateWarrantyModal() {
  const {
    props: { warranty },
    onClose: closeModal,
  } = useModal<IUpdateWarrantyModal>("update-warranty-modal");
  const [images, setImages] = useState<SortableImageType[]>([]);
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);
  const { mutate: updateWarrantyMutation } = useUpdateWarranty();
  const { handleSubmit, control, setValue } = useForm<WarrantyRequest>({
    defaultValues: {
      time: 0,
      expiration_date: new Date(),
    },
    mode: "onChange",
  });
  const onSubmit = () => {
    updateWarrantyMutation({
      warranty_id: warranty.id,
      update_warranty: {
        time: warranty.time,
        expiration_date: warranty.expiration_date,
        barcodes,
      },
      toUpload: images,
    });

    closeModal();
  };

  const handleAddOption = () => {
    setBarcodes((prev) => [
      ...prev,
      {
        id: `default_${prev.length + 1}`,
        type: BarcodeType.SERIAL_NUMBER,
        description: "",
        value: "",
      },
    ]);
  };

  const handleUpdateOption = (newBarcode: Barcode) => {
    setBarcodes((prev) =>
      prev.map((barcode) => {
        if (newBarcode.id) return newBarcode;
        return barcode;
      }),
    );
  };

  const handleDeleteOption = (id: string) => {
    setBarcodes((prev) => prev.filter((option) => option.id != id));
  };

  useEffect(() => {
    if (warranty) {
      setValue("time", warranty.time);
      setValue("expiration_date", warranty.expiration_date);
    }
  }, [warranty]);

  useEffect(() => {
    if (warranty.photos) {
      const photos = warranty.photos.map((photo) => ({
        id: photo.key,
        title: photo.key,
        img: null,
        url: photo.url,
        toUpload: false,
      }));
      setImages(photos);
    }
  }, [warranty]);

  useEffect(() => {
    if (barcodes && barcodes.length === 0) handleAddOption();
    else {
      setBarcodes(
        warranty.barcodes.map((barcode) => ({
          id: `default_${warranty.barcodes.length + 1}`,
          type: barcode.type,
          description: barcode.description,
          value: barcode.value,
        })),
      );
    }
  }, []);

  console.log({ barcodes });

  return (
    <BaseModal
      modalId="update-warranty-modal"
      title="Add Photos"
      open
      closeOnTap
      onSubmit={handleSubmit(onSubmit)}
      onClose={() => closeModal()}
    >
      <form id="edit-customer-modal" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          <ControlledField
            id="time"
            label="Warranty Time"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="expiration_date"
            label="Expiration Date"
            control={control}
            type="date"
            sx={{ width: "48%" }}
          />
        </Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Barcodes
        </Typography>
        <Box
          sx={{
            // display: "flex",
            // flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          {barcodes &&
            barcodes.map((barcode) => (
              <BarcodeField
                key={barcode.id}
                barcode={barcode}
                handleUpdateOption={handleUpdateOption}
                handleDeleteOption={() => {
                  handleDeleteOption(barcode.id);
                }}
              />
            ))}
        </Box>
        <Button
          onClick={handleAddOption}
          sx={{ width: "100%", my: 2, border: `1px solid ${grey[700]}` }}
        >
          <Iconify icon="eva:plus-square-fill" sx={{ mr: 1 }} /> Add an option
        </Button>
        <SortableContainer images={images} setImages={setImages} />
      </form>
    </BaseModal>
  );
}

type Barcode = {
  id: string;
  type: string;
  description: string;
  value: string;
};

interface IBarcodeField {
  barcode: Barcode;
  handleUpdateOption: (newBarcode: Barcode) => void;
  handleDeleteOption: () => void;
}

function BarcodeField({
  barcode,
  handleUpdateOption,
  handleDeleteOption,
}: IBarcodeField) {
  const types = [
    { inputValue: "", id: BarcodeType.QR_CODE, label: "QR Code" },
    { inputValue: "", id: BarcodeType.SERIAL_NUMBER, label: "Serial Number" },
    { inputValue: "", id: BarcodeType.PART_NUMBER, label: "Part Number" },
    { inputValue: "", id: BarcodeType.UNI_CODE, label: "Universal Code" },
    { inputValue: "", id: BarcodeType.OTHER, label: "Other" },
  ];
  const { control, getValues, setValue } = useForm<Barcode>({
    defaultValues: {
      type: BarcodeType.SERIAL_NUMBER,
      description: "",
      value: "",
    },
    mode: "onChange",
  });

  const handleSaveOption = () => {
    const type = getValues("type");
    const description = getValues("description");
    const value = getValues("value");
    handleUpdateOption({ id: barcode.id, type, description, value });
  };

  useEffect(() => {
    if (barcode) {
      setValue("type", barcode.type);
      setValue("description", barcode.description);
      setValue("value", barcode.value);
    }
  }, [barcode]);

  return (
    <Box
      sx={{
        // display: "flex",
        // justifyContent: "space-between",
        // alignItems: "center",
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <ControlledSelect<Barcode>
          control={control}
          id="type"
          label="Choose a Type"
          options={types}
          mapControlValueToOption={(id: string) => {
            const found = types.find((type) => type.id === id);
            if (found)
              return { inputValue: "", id: found.id, label: found.label };

            return { inputValue: "", id: id, label: id };
          }}
          handleSelectOption={(
            option,
          ): { inputValue: string; id: string; label: string } => {
            return option.id;
          }}
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="value"
          variant="outlined"
          size="medium"
          placeholder="Value"
          sx={{ width: "48%" }}
          onBlur={() => handleSaveOption()}
        />
      </Box>
      <ControlledField
        control={control}
        id="description"
        variant="outlined"
        size="small"
        placeholder="Description"
        fullWidth
        multiline
        rows="5"
        sx={{ mb: 2 }}
        onBlur={() => handleSaveOption()}
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
