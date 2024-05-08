import { BACKEND_URL } from "src/config";

import { SortableImageType } from "src/sections/add-product/add-images";

export type UploadedFile = {
  url: string;
  key: string;
};

export default async function uploadImages(
  access_token: string | undefined,
  images: SortableImageType[],
): Promise<Array<UploadedFile>> {
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
  if (!response.ok) throw new Error("Failed uploading files");

  const { uploads } = await response.json();

  return uploads;
}
