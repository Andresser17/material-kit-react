import HTTPError from "src/utils/http-error";

import { BACKEND_URL } from "src/config";

import { SortableImageType } from "src/sections/product/add-images";

interface UploadedFile {
  key: string;
  url: string;
}

export default async function uploadImages(
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
  if (!response.ok) throw new HTTPError("Failed uploading files", response);

  const { uploads } = await response.json();

  const result = images.map((image) => {
    const found = uploads.find((upload: UploadedFile) => {
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

  return result;
}
