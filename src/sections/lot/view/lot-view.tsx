import { Product } from "@medusajs/types";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import Box from "@mui/material/Box";

import { useGetLot } from "src/queries/use-get-lot";
import { ProductStatus as ProductStatusEnum } from "src/enums";

import Summary from "../summary";
import LotDetails from "../lot-details";
import ProductsCard from "../products-card";

// ----------------------------------------------------------------------

export default function LotView() {
  const { id } = useParams();
  const { lot } = useGetLot({ lot_id: id ?? "" });
  const { handleSubmit } = useForm<Product>({
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
  // const resetForm = () => {
  //   reset();
  //   setStatus(ProductStatusEnum.DRAFT);
  //   setOptions([]);
  // };
  const onSubmit: SubmitHandler<Product> = (data) => {
    console.log(data);
  };

  if (!lot) return <div>Loading!!!</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          p: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "600px" }}>
          <LotDetails lot={lot} />
          <Summary lot={lot} />
          <ProductsCard lot={lot} />
        </Box>
      </Box>
    </form>
  );
}
