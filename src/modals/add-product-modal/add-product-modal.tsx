import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
      },
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
