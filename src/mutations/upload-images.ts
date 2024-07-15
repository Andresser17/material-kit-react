import HTTPError from "src/utils/http-error";

import { BACKEND_URL } from "src/config";

export interface UploadedFile {
  key: string;
  url: string;
}

export default async function uploadImages(
  access_token: string | undefined,
  images: File[],
): Promise<UploadedFile[]> {
  const body = new FormData();
  images.forEach((image) => {
    if (image) {
      body.append("files", image);
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

  return result.uploads;
}
