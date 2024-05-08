import { useState, useEffect } from "react";
import { ProductDTO } from "@medusajs/types";
import { useLocation } from "react-router-dom";
import { ProductOptionDTO } from "@medusajs/types";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { UploadedFile } from "src/mutations/uploadImages";
import { useAddProduct } from "src/mutations/use-add-product";
import { useUpdateProduct } from "src/mutations/use-update-product";
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
  const [options, setOptions] = useState<ProductOptionDTO[]>([]);
  const location = useLocation();
  const { handleSubmit, control, reset } = useForm<ProductDTO>({
    defaultValues: location.state?.product
      ? {
          title: location.state?.product.title,
          subtitle: location.state?.product.subtitle,
          description: location.state?.product.description,
          handle: location.state?.product.handle,
          status: location.state?.product.status,
          weight: location.state?.product.weight,
          length: location.state?.product.length,
          height: location.state?.product.height,
          width: location.state?.product.width,
          hs_code: location.state?.product.hs_code,
          origin_country: location.state?.product.origin_country,
          mid_code: location.state?.product.mid_code,
          material: location.state?.product.material,
          discountable: location.state?.product.discountable,
        }
      : {
          title: "",
          subtitle: "",
          description: "",
          handle: "",
          status: ProductStatusEnum.DRAFT,
          //thumbnail: string;
          weight: 0,
          length: 0,
          height: 0,
          width: 0,
          hs_code: "",
          origin_country: "",
          mid_code: "",
          material: "",
          discountable: false,
        },
    mode: "onChange",
  });
  const resetForm = () => {
    reset();
    setImages([]);
    setStatus(ProductStatusEnum.DRAFT);
    setOptions([]);
  };
  const updateProductMutation = useUpdateProduct();
  const addProductMutation = useAddProduct(resetForm);
  const onSubmit: SubmitHandler<ProductDTO> = (data) => {
    if (location.state?.product) {
      updateProductMutation({
        id: location.state?.product.id,
        product: { ...data, status },
        toUpload: images,
      });
      return;
    }
    addProductMutation({
      newProduct: { ...data, status, options },
      toUpload: images,
    });
  };

  useEffect(() => {
    if (location.state?.product) {
      setImages(() => {
        const thumbnail = location.state.product.thumbnail
          ?.split(" ")
          .map((thumb: string) => ({
            id: thumb,
            img: null,
            src: thumb,
            title: thumb.split("/")[4],
          }));

        const images = location.state.product.images.map(
          (image: UploadedFile) => ({
            id: image.key,
            img: null,
            src: image.url,
            title: image.key,
          }),
        );
        return [...(thumbnail ? thumbnail : []), ...(images ? images : [])];
      });
      setStatus(location.state.product.status);
      setOptions(location.state.product.options);
    }
  }, []);

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
          <Variants options={options} setOptions={setOptions} />
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
