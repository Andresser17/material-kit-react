import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { Product } from "src/queries/use-list-products";
import { useAddProduct } from "src/mutations/use-add-product";
import { ProductStatus as ProductStatusEnum } from "src/queries/use-list-products";

import Variants from "../variants";
import Attributes from "../attributes";
import RawProduct from "../raw-product";
import GeneralInfo from "../general-info";
import ProductStatus from "../product-status";
import AddImages, { SortableImageType } from "../add-images";

// ----------------------------------------------------------------------

export default function AddProductView() {
  const [images, setImages] = useState<SortableImageType[]>([]);
  const [status, setStatus] = useState(ProductStatusEnum.DRAFT);
  const { handleSubmit, control } = useForm<Product>({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      handle: "",
      status: ProductStatusEnum.DRAFT,
      //thumbnail: string;
      weight: "",
      length: "",
      height: "",
      width: "",
      hs_code: "",
      origin_country: "",
      mid_code: "",
      material: "",
      collection_id: "",
      type_id: "",
      discountable: false,
    },
    mode: "onChange",
  });
  const addProductMutation = useAddProduct();
  const onSubmit: SubmitHandler<Product> = (data) => {
    addProductMutation({ newProduct: { ...data, status }, toUpload: images });
  };

  const floatingButtons = (
    <Box sx={{ position: "fixed", bottom: 10, right: 5, zIndex: 99 }}>
      <Button
        type="submit"
        variant="contained"
        color="success"
        size="large"
        sx={{ mr: 2 }}
      >
        Save
      </Button>
      <Button variant="text" color="error">
        Cancel
      </Button>
    </Box>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", gap: 3, p: 2 }}>
        <Box sx={{ w: "60%" }}>
          <GeneralInfo control={control} />
          <Variants />
          <Attributes control={control} />
          <RawProduct />
        </Box>
        <Box sx={{ width: "40%" }}>
          <AddImages images={images} setImages={setImages} />
          <ProductStatus status={status} setStatus={setStatus} />
        </Box>
        {floatingButtons}
      </Box>
    </form>
  );
}
