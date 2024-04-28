import { CSS } from "@dnd-kit/utilities";
import { useState, Dispatch, ChangeEvent, SetStateAction } from "react";
import { DndContext, closestCenter, UniqueIdentifier } from "@dnd-kit/core";
import {
  arrayMove,
  useSortable,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import Box from "@mui/material/Box";
import {
  Theme,
  Button,
  styled,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";

import Label from "src/components/label";
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

type SortableImageType = {
  id: UniqueIdentifier;
  img: File;
  src: string;
  title: string;
};

export default function AddImages() {
  const theme = useTheme();
  const [images, setImages] = useState<SortableImageType[]>([]);
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const { files } = e.target;
      const updateImages = (e: ProgressEvent<FileReader>, file: File) => {
        setImages((prev) => {
          return [
            ...prev,
            {
              id: file.name,
              img: file,
              src: e.target?.result as string,
              title: file.name,
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
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
        p: 3,
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
            {images.map((image, i) => (
              <SortableImage
                key={image.title}
                src={image.src}
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
    </Box>
  );
}

function SortableImage({
  src,
  title,
  id,
  isCover,
  theme,
  setImages,
}: {
  src: string;
  title: string;
  id: UniqueIdentifier;
  isCover: boolean;
  theme: Theme;
  setImages: Dispatch<SetStateAction<SortableImageType[]>>;
}) {
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
