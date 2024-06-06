import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Product, ProductRequest } from "@medusajs/types";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { useAppSelector } from "src/redux/hooks";
import { useGetProduct } from "src/queries/use-get-product";
import { useAddProduct } from "src/mutations/use-add-product";
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

export default function AddProductView() {
  const { id: product_id } = useParams();
  const getProductResponse = useGetProduct(product_id ?? "");
  const [product, setProduct] = useState<Product | undefined>(undefined);
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
      collection_id: "",
      tags: [],
      type: {},
    },
    mode: "onChange",
  });
  const resetForm = () => {
    // reset();
    // setImages([]);
    // setStatus(ProductStatusEnum.DRAFT);
  };
  const { data: productData, mutate: addProductMutation } =
    useAddProduct(resetForm);
  const updateProductMutation = useUpdateProduct();
  const onSubmit: SubmitHandler<ProductRequest> = (data) => {
    if (!product) {
      addProductMutation({
        newProduct: {
          ...data,
          status,
        },
        options,
        toUpload: images,
      });
    } else {
      updateProductMutation({
        id: product.id,
        product: data,
        toUpload: images,
      });
    }
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
    if (productData) {
      setProduct(productData);
    } else if (getProductResponse) {
      setProduct(getProductResponse);
      setValue("title", getProductResponse.title);
      setValue("subtitle", getProductResponse.subtitle as string);
      setValue("handle", getProductResponse.handle as string);
      setValue("status", getProductResponse.status);
      setValue("weight", getProductResponse.weight);
      setValue("length", getProductResponse.length);
      setValue("height", getProductResponse.height);
      setValue("width", getProductResponse.width);
      setValue("hs_code", getProductResponse.hs_code as string);
      setValue("origin_country", getProductResponse.origin_country as string);
      setValue("mid_code", getProductResponse.mid_code as string);
      setValue("material", getProductResponse.material as string);
      setValue("discountable", getProductResponse.discountable as boolean);
    }
  }, [productData, getProductResponse]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", gap: 3, p: 2 }}>
        <Box sx={{ w: "60%" }}>
          <GeneralInfo control={control} />
          <Variants product={getProductResponse} options={options} />
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
