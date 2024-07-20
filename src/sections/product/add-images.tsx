import { UniqueIdentifier } from "@dnd-kit/core";
import { Dispatch, SetStateAction } from "react";

import { Typography } from "@mui/material";

import SectionBox from "src/components/section-box";
import SortableContainer from "src/components/sortable-container/sortable-container";

// ----------------------------------------------------------------------

export type SortableImageType = {
  id: UniqueIdentifier;
  img: File | null;
  url: string;
  title: string;
  toUpload: boolean;
};

interface IAddImages {
  images: SortableImageType[];
  setImages: Dispatch<SetStateAction<SortableImageType[]>>;
}

export default function AddImages({ images, setImages }: IAddImages) {
  return (
    <SectionBox
      sx={{
        width: "100%",
        mb: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Images
      </Typography>
      <SortableContainer images={images} setImages={setImages} />
    </SectionBox>
  );
}
