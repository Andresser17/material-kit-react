import HTTPError from "src/utils/http-error";

import { BACKEND_URL } from "src/config";

import { SortableImageType } from "src/sections/product/add-images";
import { UploadedFile } from "./upload-images";

export default async function uploadSortableImages(
  access_token: string | undefined,
  images: SortableImageType[],
): Promise<SortableImageType[]> {
  const body = new FormData();
  images.forEach((image) => {
    if (image.img) {
      body.append("files", image.img);
    }
  });

  const url = new URL("/admin/uploads", BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body,
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  const photos = images.map((image) => {
    const found = result.uploads.find((upload: UploadedFile) => {
      const key = upload.key.split("-")[1];
      if (image.id === key) return upload;
    });

    if (found) {
      return {
        id: found.key,
        img: null,
        url: found.url,
        title: found.key,
        toUpload: true,
      };
    }

    return image;
  });

  return photos;
}
