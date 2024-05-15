import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProductRequest, ProductOptionDTO } from "@medusajs/types";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

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
  const [options, setOptions] = useState<ProductOptionDTO[]>([]);
  const { handleSubmit, control, reset } = useForm<ProductRequest>({
    defaultValues: {
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
  const addProductMutation = useAddProduct(resetForm);
  const onSubmit: SubmitHandler<ProductRequest> = (data) => {
    addProductMutation({
      newProduct: {
        ...data,
        status,
      },
      options,
      toUpload: images,
    });
  };

  // useEffect(() => {
  //   if (location.state?.product) {
  //     setImages(() => {
  //       const thumbnail = location.state.product.thumbnail
  //         ?.split(" ")
  //         .map((thumb: string) => ({
  //           id: thumb,
  //           img: null,
  //           src: thumb,
  //           title: thumb.split("/")[4],
  //         }));

  //       const images = location.state.product.images.map(
  //         (image: UploadedFile) => ({
  //           id: image.key,
  //           img: null,
  //           src: image.url,
  //           title: image.key,
  //         }),
  //       );
  //       return [...(thumbnail ? thumbnail : []), ...(images ? images : [])];
  //     });
  //     setStatus(location.state.product.status);
  //     setOptions(location.state.product.options);
  //   }
  // }, []);

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
          <Variants
            product={location.state?.product}
            options={options}
            setOptions={setOptions}
          />
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
