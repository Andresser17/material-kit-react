import {
  Product,
  ProductOptionRequest,
  ProductVariantRequest,
} from "@medusajs/types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import BaseModal from "src/modals/base-modal";
import { useAddProductVariant } from "src/mutations/use-add-product-variant";

import { useModal } from "../useModal";
import General from "./general";
import Metadata from "./metadata";
import Shipping from "./shipping";
import Stock from "./stock";

export interface ProductVariantForm extends ProductVariantRequest {
  price: number;
}

export interface IAddVariantModal {
  product: Product;
}

export default function AddVariantModal() {
  const {
    props: { product },
    onClose: closeModal,
  } = useModal<IAddVariantModal>("add-variant-modal");
  const [options, setOptions] = useState<ProductOptionRequest[]>([]);
  const { handleSubmit, control } = useForm<ProductVariantForm>({
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
      price: 0,
    },
    mode: "onChange",
  });
  const { mutate: addProductVariantMutation, isSuccess } =
    useAddProductVariant();
  const onSubmit: SubmitHandler<ProductVariantForm> = (data) => {
    const { price, ...properties } = data;
    addProductVariantMutation({
      product_id: product?.id ?? "",
      newProductVariant: {
        ...properties,
        sku: data.sku ? data.sku : null,
        ean: data.ean ? data.ean : null,
        upc: data.upc ? data.upc : null,
        barcode: data.barcode ? data.barcode : null,
        hs_code: data.hs_code ? data.hs_code : null,
        mid_code: data.mid_code ? data.mid_code : null,
        material: data.material ? data.material : null,
        prices: [
          {
            amount: Number(price.toString() + "00"),
            currency_code: "USD",
            min_quantity: 1,
            max_quantity: 1,
          },
        ],
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
    if (product.options && product.options.length > 0) {
      const newOptions = product.options.map((option) => ({
        option_id: option.id,
        title: option.title,
        value: "",
      }));
      setOptions(newOptions);
    }
  }, []);

  return (
    <BaseModal
      modalId="add-variant-modal"
      title="Add Variant"
      open
      closeOnTap
      onClose={closeModal}
    >
      <form id="add-variant-modal" onSubmit={handleSubmit(onSubmit)}>
        <General control={control} options={options} setOptions={setOptions} />
        <Stock control={control} />
        <Shipping control={control} />
        <Metadata />
      </form>
    </BaseModal>
  );
}
