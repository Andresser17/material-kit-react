import {
  PriceAmountRequest,
  Product,
  ProductOptionRequest,
  ProductVariant,
  ProductVariantRequest,
} from "@medusajs/types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import BaseModal from "src/modals/base-modal";

import { useUpdateProductVariant } from "src/mutations/use-update-product-variant";

import { useModal } from "../useModal";
import General from "./general";
import Metadata from "./metadata";
import Shipping from "./shipping";
import Stock from "./stock";

export interface IEditVariantModal {
  product: Product;
  variant: ProductVariant;
}

export default function EditVariantModal() {
  const {
    props: { product, variant },
    onClose: closeModal,
  } = useModal<IEditVariantModal>("edit-variant-modal");
  const [options, setOptions] = useState<ProductOptionRequest[]>([]);
  const { handleSubmit, control, setValue } = useForm<ProductVariantRequest>({
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
      origin_country: null,
      mid_code: "",
      material: "",
      metadata: {},
      prices: [],
    },
    mode: "onChange",
  });
  const { mutate: updateProductVariantMutation, isSuccess } =
    useUpdateProductVariant();
  const onSubmit: SubmitHandler<ProductVariantRequest> = (data) => {
    updateProductVariantMutation({
      product_id: product?.id ?? "",
      variant_id: variant.id,
      update_variant: {
        ...data,
        sku: data.sku ? data.sku : null,
        ean: data.ean ? data.ean : null,
        upc: data.upc ? data.upc : null,
        barcode: data.barcode ? data.barcode : null,
        hs_code: data.hs_code ? data.hs_code : null,
        mid_code: data.mid_code ? data.mid_code : null,
        material: data.material ? data.material : null,
        options:
          options.length > 0
            ? options.map((option) => {
                return { option_id: option.option_id, value: option.value };
              })
            : [],
      },
    });
  };

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  useEffect(() => {
    if (variant) {
      const prices: PriceAmountRequest[] = variant.prices.map((price) => ({
        amount: price.amount,
        region_id: price.region_id,
        currency_code: price.currency_code,
        min_quantity: price.min_quantity,
        max_quantity: price.max_quantity,
      }));
      setValue("title", variant.title);
      setValue("prices", prices);
      if (variant.inventory_quantity)
        setValue("inventory_quantity", variant.inventory_quantity);
      setValue("sku", variant.sku);
      setValue("ean", variant.ean);
      setValue("upc", variant.upc);
      setValue("barcode", variant.barcode);
      setValue("hs_code", variant.hs_code);
      setValue("mid_code", variant.mid_code);
      setValue("material", variant.material);
    }
  }, [variant]);

  // map options and values
  useEffect(() => {
    if (product.options && product.options.length > 0) {
      const newOptions = product.options.map((option) => {
        const optionValue =
          option.values &&
          option.values.find((value) => value.option?.title === option.title);

        return {
          option_id: option.id,
          title: option.title,
          value: optionValue ? optionValue.value : "",
        };
      });
      setOptions(newOptions);
    }
  }, []);

  return (
    <BaseModal
      modalId="edit-variant-modal"
      title="Edit Variant"
      open
      closeOnTap
      onClose={closeModal}
    >
      <form id="edit-variant-modal" onSubmit={handleSubmit(onSubmit)}>
        <General control={control} options={options} setOptions={setOptions} />
        <Stock control={control} />
        <Shipping control={control} />
        <Metadata />
      </form>
    </BaseModal>
  );
}
