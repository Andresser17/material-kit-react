import { CSS } from "@dnd-kit/utilities";
import { Dispatch, ChangeEvent, SetStateAction } from "react";
import { DndContext, closestCenter, UniqueIdentifier } from "@dnd-kit/core";
import {
  arrayMove,
  useSortable,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import Box from "@mui/material/Box";
import { Theme, Button, useTheme, Typography, IconButton } from "@mui/material";

import Label from "src/components/label";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import VisuallyHiddenInput from "src/components/visually-hidden-input";

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
  const theme = useTheme();
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

  const handleDragEnd = (e: {
    active: SortableImageType;
    over: SortableImageType;
  }) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      setImages((prev) => {
        const oldIndex = prev.findIndex((element) => element.id === active.id);
        const newIndex = prev.findIndex((element) => element.id === over.id);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

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
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
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
    </SectionBox>
  );
}

interface ISortableImage {
  src: string;
  title: string;
  id: UniqueIdentifier;
  isCover: boolean;
  theme: Theme;
  setImages: Dispatch<SetStateAction<SortableImageType[]>>;
}

function SortableImage({
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
