import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { SortableImageType } from "src/sections/product/add-images";
import Iconify from "../iconify";
import SortableImage from "../sortable-image";
import VisuallyHiddenInput from "../visually-hidden-input";

export interface ISortableContainer {
  images: SortableImageType[];
  setImages: Dispatch<SetStateAction<SortableImageType[]>>;
}

export default function SortableContainer({
  images,
  setImages,
}: ISortableContainer) {
  const theme = useTheme();
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active && over && active.id !== over.id) {
      setImages((prev) => {
        const oldIndex = prev.findIndex((element) => element.id === active.id);
        const newIndex = prev.findIndex((element) => element.id === over.id);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const { files } = e.target;
      const updateImages = (e: ProgressEvent<FileReader>, file: File) => {
        const newName = file.name.replaceAll("-", "_");
        setImages((prev) => {
          return [
            ...prev,
            {
              id: newName,
              img: new File([file], newName, {
                type: file.type,
              }),
              url: e.target?.result as string,
              title: file.name,
              toUpload: true,
            },
          ];
        });
      };

      for (const file of files) {
        if (file) {
          const fileReader = new FileReader();
          fileReader.onload = (e) => updateImages(e, file);
          fileReader.readAsDataURL(file);
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        pb: 2,
      }}
    >
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        sx={{
          width: 120,
          height: 100,
          borderRadius: "5px",
          mr: 2,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Iconify icon="material-symbols:upload" />
          <Typography variant="subtitle2">Select</Typography>
        </Box>

        <VisuallyHiddenInput onChange={handleUpload} type="file" multiple />
      </Button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images}
          strategy={horizontalListSortingStrategy}
        >
          {images &&
            images.map((image, i) => (
              <SortableImage
                key={image.id}
                src={image.url}
                title={image.title}
                id={image.id}
                isCover={i === 0}
                theme={theme}
                setImages={setImages}
              />
            ))}
        </SortableContext>
      </DndContext>
    </Box>
  );
}
