import { Dispatch, ChangeEvent, SetStateAction } from "react";

import {
  Radio,
  FormLabel,
  RadioGroup,
  Typography,
  FormControl,
  FormControlLabel,
} from "@mui/material";

import { ProductStatus as ProductStatusEnum } from "src/queries/use-list-products";

import SectionBox from "src/components/section-box";

export default function ProductStatus({
  status,
  setStatus,
}: {
  status: ProductStatusEnum;
  setStatus: Dispatch<SetStateAction<ProductStatusEnum>>;
}) {
  const handleStatus = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.value) {
      case "published":
        setStatus(ProductStatusEnum.PUBLISHED);
        break;
      default:
        setStatus(ProductStatusEnum.DRAFT);
        break;
    }
  };

  return (
    <SectionBox>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Product status
      </Typography>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="draft"
          name="radio-buttons-group"
          value={status}
          onChange={handleStatus}
        >
          <FormControlLabel
            id="draft"
            name="draft"
            value={ProductStatusEnum.DRAFT}
            control={<Radio />}
            label="Draft"
          />
          <FormControlLabel
            id="published"
            name="published"
            value={ProductStatusEnum.PUBLISHED}
            control={<Radio />}
            label="Published"
          />
        </RadioGroup>
      </FormControl>
    </SectionBox>
  );
}
