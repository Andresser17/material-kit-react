import { Barcode, Warranty } from "@medusajs/types";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import ControlledSelect from "src/components/controlled-select";
import Iconify from "src/components/iconify";
import SortableContainer from "src/components/sortable-container";
import { BarcodeType } from "src/enums";
import { useCreateBarcode } from "src/mutations/use-create-barcode";
import { WarrantyRequest } from "src/mutations/use-create-warranty";
import { useDeleteBarcode } from "src/mutations/use-delete-barcode";
import { useUpdateBarcode } from "src/mutations/use-update-barcode";
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
  const { mutate: updateWarrantyMutation, isSuccess } = useUpdateWarranty();
  const {
    data: newBarcode,
    mutate: createBarcodeMutation,
    isSuccess: isSuccessCreateBarcode,
  } = useCreateBarcode();

  const { handleSubmit, control, setValue } = useForm<WarrantyRequest>({
    defaultValues: {
      time: 0,
      expiration_date: new Date(),
    },
    mode: "onChange",
  });
  const onSubmit = (data: WarrantyRequest) => {
    updateWarrantyMutation({
      warranty_id: warranty.id,
      update_warranty: {
        time: data.time,
        expiration_date: data.expiration_date,
      },
      toUpload: images,
    });
  };

  useEffect(() => {
    if (warranty) {
      setValue("time", warranty.time);
      setValue("expiration_date", warranty.expiration_date);
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
    }
  }, [warranty]);

  // map existing barcodes
  useEffect(() => {
    if (warranty.barcodes && warranty.barcodes.length > 0) {
      setBarcodes(
        warranty.barcodes.map((barcode) => ({
          id: barcode.id,
          type: barcode.type,
          description: barcode.description,
          value: barcode.value,
        })),
      );
    }
  }, []);

  // update barcodes after creating a new one
  useEffect(() => {
    if (isSuccessCreateBarcode && newBarcode) {
      setBarcodes((prev) => {
        const newPrev = [
          ...prev,
          {
            id: newBarcode.id,
            type: BarcodeType.SERIAL_NUMBER,
            description: "",
            value: "",
          },
        ];

        return newPrev;
      });
    }
  }, [isSuccessCreateBarcode, newBarcode]);

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  return (
    <BaseModal
      modalId="update-warranty-modal"
      title="Update Warranty"
      open
      closeOnTap
      onClose={() => closeModal()}
    >
      <form id="update-warranty-modal" onSubmit={handleSubmit(onSubmit)}>
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
                setBarcodes={setBarcodes}
              />
            ))}
        </Box>
        <Button
          onClick={() => {
            createBarcodeMutation({
              warranty_id: warranty.id,
              new_barcode: {
                type: BarcodeType.PART_NUMBER,
                description: "",
                value: "",
              },
            });
          }}
          sx={{ width: "100%", mb: 2, border: `1px solid ${grey[700]}` }}
        >
          <Iconify icon="eva:plus-square-fill" sx={{ mr: 1 }} /> Add New Barcode
        </Button>
        <SortableContainer images={images} setImages={setImages} />
      </form>
    </BaseModal>
  );
}

interface IBarcodeField {
  barcode: Barcode;
  setBarcodes: Dispatch<SetStateAction<Barcode[]>>;
}

function BarcodeField({ barcode, setBarcodes }: IBarcodeField) {
  const theme = useTheme();
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
  const { mutate: deleteBarcodeMutation, isSuccess: isSuccessDeleteBarcode } =
    useDeleteBarcode();
  const { mutate: updateBarcodeMutation, isSuccess: isSuccessUpdateBarcode } =
    useUpdateBarcode();

  const handleUpdateBarcode = () => {
    const type = getValues("type");
    const description = getValues("description");
    const value = getValues("value");

    if (
      type !== barcode.type ||
      description !== barcode.description ||
      value !== barcode.value
    ) {
      updateBarcodeMutation({
        barcode_id: barcode.id,
        update_barcode: { type: type as BarcodeType, description, value },
      });
    }
  };

  // update barcodes after delete;
  useEffect(() => {
    if (isSuccessDeleteBarcode)
      setBarcodes((prev) => prev.filter((bar) => bar.id != barcode.id));
  }, [isSuccessDeleteBarcode]);

  // update barcodes after update;
  useEffect(() => {
    if (isSuccessUpdateBarcode) {
      const type = getValues("type");
      const description = getValues("description");
      const value = getValues("value");
      setBarcodes((prev) =>
        prev.map((bar) => ({
          ...bar,
          type,
          description,
          value,
        })),
      );
    }
  }, [isSuccessUpdateBarcode]);

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
          onBlur={() => handleUpdateBarcode()}
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
        onBlur={() => handleUpdateBarcode()}
      />
      <IconButton
        onClick={() => {
          deleteBarcodeMutation({ barcode_id: barcode.id });
        }}
        aria-label="Delete option"
        size="small"
        sx={{
          width: "100%",
          color: theme.palette.error.main,
          borderRadius: 1,
          border: `1px solid ${theme.palette.error.dark}`,
          mb: 2,
        }}
      >
        <Iconify icon="eva:trash-2-outline" width={28} sx={{ p: "3px" }} />
      </IconButton>
    </Box>
  );
}
