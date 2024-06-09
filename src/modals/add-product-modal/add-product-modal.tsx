import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ProductStatus } from "src/enums";
import { useAddProduct } from "src/mutations/use-add-product";

import ControlledField from "src/components/controlled-field";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";

interface AddProductData {
  product_title: string;
}

export interface IAddProductModal {
  redirect_url: string;
}

export default function AddProductModal() {
  const { onClose: closeModal, onUpdate: updateModal } =
    useModal<IAddProductModal>("add-product-modal");
  const { handleSubmit, control } = useForm<AddProductData>({
    defaultValues: {
      product_title: "",
    },
    mode: "onChange",
  });
  const {
    data: product,
    mutate: addProductMutation,
    isSuccess,
  } = useAddProduct(() => {});
  const onSubmit = (data: AddProductData) => {
    addProductMutation({
      newProduct: {
        title: data.product_title,
        subtitle: "",
        description: "",
        is_giftcard: false,
        discountable: false,
        images: [],
        thumbnail: "",
        handle: "",
        status: ProductStatus.DRAFT,
        type: null,
        collection: null,
        collection_id: null,
        tags: [],
        sales_channels: [],
        categories: [],
        options: [],
        variants: [],
        weight: 0,
        length: 0,
        height: 0,
        width: 0,
        hs_code: "",
        origin_country: "",
        mid_code: "",
        material: "",
        metadata: {},
      },
      options: [],
      toUpload: [],
    });
  };

  useEffect(() => {
    if (isSuccess && product) {
      updateModal({ redirect_url: product.id });
      closeModal(false);
    }
  }, [isSuccess, product]);

  return (
    <BaseModal
      modalId="add-product-modal"
      title="Add Product"
      open
      closeOnTap
      onSubmit={() => {}}
      onClose={() => closeModal()}
    >
      <form id="add-product-modal" onSubmit={handleSubmit(onSubmit)}>
        <ControlledField
          id="product_title"
          label="Set product title"
          control={control}
          fullWidth
        />
      </form>
    </BaseModal>
  );
}
