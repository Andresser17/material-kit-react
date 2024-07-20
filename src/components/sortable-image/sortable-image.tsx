import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, IconButton, Theme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { SortableImageType } from "src/sections/product/add-images";
import Iconify from "../iconify";
import Label from "../label";

export interface ISortableImage {
  src: string;
  title: string;
  id: UniqueIdentifier;
  isCover: boolean;
  theme: Theme;
  setImages: Dispatch<SetStateAction<SortableImageType[]>>;
}

export default function SortableImage({
  src,
  title,
  id,
  isCover,
  theme,
  setImages,
}: ISortableImage) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      transition: {
        duration: 150, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const handleImageDelete = () => {
    setImages((prev) => {
      return prev.filter((image) => image.id != id);
    });
  };

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: 120,
        height: 100,
        mr: 2,
        transform: CSS.Transform.toString(transform),
        transition,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <img
        {...listeners}
        {...attributes}
        style={{ objectFit: "cover", borderRadius: "5px" }}
        src={src}
        width="100%"
        height="100%"
        alt={title}
        loading="lazy"
      />
      <IconButton
        onClick={handleImageDelete}
        aria-label="delete-image"
        size="small"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          p: "3px",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 99,
        }}
      >
        <Iconify icon="material-symbols:close" sx={{ width: 15, height: 15 }} />
      </IconButton>
      {isCover && (
        <Label
          {...listeners}
          {...attributes}
          aria-label="cover-label"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            borderRadius: "0 0 5px 5px",
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          Cover
        </Label>
      )}
    </Box>
  );
}
