import { ProductDTO } from "@medusajs/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";

import {
  FulfillmentStatus,
  OrderStatus,
  PaymentStatus,
  ProductStatus as ProductStatusEnum,
} from "src/enums";

import Customer from "../customer";
import Fulfillment from "../fulfillment";
import OrderDetails from "../order-details";
import Payment from "../payment";
import Summary from "../summary";
import TimelineSection from "../timeline-section";

// ----------------------------------------------------------------------

export default function OrderView() {
  // const [status, setStatus] = useState(ProductStatusEnum.DRAFT);
  // const [options, setOptions] = useState<ProductOptionDTO[]>([]);
  const location = useLocation();
  const { handleSubmit } = useForm<ProductDTO>({
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
  // const resetForm = () => {
  //   reset();
  //   setStatus(ProductStatusEnum.DRAFT);
  //   setOptions([]);
  // };
  // const upadteProductMutation = useUpdateProduct();
  // const addProductMutation = useAddProduct(resetForm);
  const onSubmit: SubmitHandler<ProductDTO> = (data) => {
    console.log({ data });
    if (location.state?.product) {
      // upadteProductMutation({
      //   id: location.state?.product.id,
      //   product: { ...data, status },
      //   // toUpload: images,
      // });
      return;
    }
    // addProductMutation({
    //   newProduct: { ...data, status, options },
    //   // toUpload: images,
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          p: 2,
        }}
      >
        <Box sx={{ width: "60%", maxWidth: "660px" }}>
          <OrderDetails status={OrderStatus.PENDING} />
          <Summary />
          <Payment status={PaymentStatus.CAPTURED} />
          <Fulfillment status={FulfillmentStatus.SHIPPED} />
          <Customer />
        </Box>
        <Box sx={{ width: "40%", maxWidth: "450px" }}>
          <TimelineSection />
        </Box>
      </Box>
    </form>
  );
}
