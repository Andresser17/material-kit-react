import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductRequest } from "@medusajs/types";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { useAppSelector } from "src/redux/hooks";
import { useGetProduct } from "src/queries/use-get-product";
import { ProductStatus as ProductStatusEnum } from "src/enums";
import { useUpdateProduct } from "src/mutations/use-update-product";
import { getOptions } from "src/redux/slices/product-options/product-options-slice";

import Variants from "../variants";
import Attributes from "../attributes";
import RawProduct from "../raw-product";
import GeneralInfo from "../general-info";
import ProductStatus from "../product-status";
import AddImages, { SortableImageType } from "../add-images";

// ----------------------------------------------------------------------

export default function ProductView() {
  const { id: product_id } = useParams();
  const [images, setImages] = useState<SortableImageType[]>([]);
  const [status, setStatus] = useState(ProductStatusEnum.DRAFT);
  const options = useAppSelector((state) => getOptions(state));
  const { handleSubmit, control, setValue } = useForm<ProductRequest>({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      handle: "",
      status: ProductStatusEnum.DRAFT,
      weight: 0,
      length: 0,
      height: 0,
      width: 0,
      hs_code: "",
      origin_country: "china",
      mid_code: "",
      material: "",
      discountable: false,
      collection_id: "",
      tags: [],
      type: null,
    },
    mode: "onChange",
  });
  const product = useGetProduct(product_id ?? "");
  const updateProductMutation = useUpdateProduct();
  const onSubmit: SubmitHandler<ProductRequest> = (data) => {
    console.log({ data });
    updateProductMutation({
      id: product_id ?? "",
      product: {
        ...data,
        status,
      },
      toUpload: images.map((image) => {
        if (image.img) {
          return {
            ...image,
            img: new File([image.img], image.img.name.replaceAll("-", "_"), {
              type: image.img.type,
            }),
          };
        }
        return image;
      }),
    });
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

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("subtitle", product.subtitle ?? "");
      setValue("description", product.description ?? "");
      setValue("handle", product.handle);
      setValue("status", product.status);
      setValue("weight", product.weight);
      setValue("length", product.length);
      setValue("height", product.height);
      setValue("width", product.width);
      setValue("hs_code", product.hs_code ?? "");
      setValue("origin_country", product.origin_country ?? "");
      setValue("mid_code", product.mid_code ?? "");
      setValue("material", product.material ?? "");
      setValue("discountable", product.discountable);
      if (product.collection_id)
        setValue("collection_id", product.collection_id);
      if (product.tags)
        setValue(
          "tags",
          product.tags.map((tag) => ({
            inputValue: "",
            id: tag.id,
            label: tag.value,
          })),
        );
      // if (product.type_id) setValue("type_id", product.type_id);
      if (product.type) setValue("type", product.type);
      setStatus(product.status);
    }
  }, [product]);

  useEffect(() => {
    if (product?.thumbnail && product.images) {
      const thumbnail = {
        id: "thumbnail",
        title: "thumbnail",
        img: null,
        url: product.thumbnail,
        toUpload: false,
      };
      const images = product.images
        .filter((image) => image.url != thumbnail.url)
        .map((image) => ({
          id: image.id,
          title: image.id,
          img: null,
          url: image.url,
          toUpload: false,
        }));
      setImages([thumbnail, ...images]);
    }
  }, [product]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", gap: 3, p: 2 }}>
        <Box sx={{ w: "60%" }}>
          <GeneralInfo control={control} />
          <Variants product={product} options={options} />
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
