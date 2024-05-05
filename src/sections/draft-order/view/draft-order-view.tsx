import { useState } from "react";
import { ProductDTO } from "@medusajs/types";
import { useLocation } from "react-router-dom";
import { ProductOptionDTO } from "@medusajs/types";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";

import { DraftOrderStatus } from "src/enums";
import { useAddProduct } from "src/mutations/use-add-product";
import { useUpdateProduct } from "src/mutations/use-update-product";
import { ProductStatus as ProductStatusEnum } from "src/queries/use-list-products";

import Payment from "../payment";
import Summary from "../summary";
import Shipping from "../shipping";
import Customer from "../customer";
import RawOrder from "../raw-order";
import OrderDetails from "../order-details";

// ----------------------------------------------------------------------

export default function DraftOrderView() {
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
    setStatus(ProductStatusEnum.DRAFT);
    setOptions([]);
  };
  const upadteProductMutation = useUpdateProduct();
  const addProductMutation = useAddProduct(resetForm);
  const onSubmit: SubmitHandler<ProductDTO> = (data) => {
    if (location.state?.product) {
      upadteProductMutation({
        id: location.state?.product.id,
        product: { ...data, status },
        // toUpload: images,
      });
      return;
    }
    addProductMutation({
      newProduct: { ...data, status, options },
      // toUpload: images,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            width: {
              sm: "600px",
              md: "660px",
            },
            maxWidth: {
              xs: "100%",
            },
          }}
        >
          <OrderDetails status={DraftOrderStatus.OPEN} />
          <Payment />
          <Summary />
          <Shipping />
          <Customer />
          <RawOrder />
        </Box>
      </Box>
    </form>
  );
}
