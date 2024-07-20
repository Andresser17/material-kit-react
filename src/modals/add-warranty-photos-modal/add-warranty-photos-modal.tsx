import { Warranty } from "@medusajs/types";
import { useEffect, useState } from "react";
import SortableContainer from "src/components/sortable-container";
import { useUpdateWarranty } from "src/mutations/use-update-warranty";
import { SortableImageType } from "src/sections/product/add-images";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface IAddWarrantyPhotosModal {
  warranty: Warranty;
}

export default function AddWarrantyPhotosModal() {
  const {
    props: { warranty },
    onClose: closeModal,
  } = useModal<IAddWarrantyPhotosModal>("add-warranty-photos-modal");
  const [images, setImages] = useState<SortableImageType[]>([]);
  const { mutate: updateWarrantyMutation } = useUpdateWarranty();
  const handleSubmit = () => {
    updateWarrantyMutation({
      warranty_id: warranty.id,
      update_warranty: {
        time: warranty.time,
        expiration_date: warranty.expiration_date,
        barcodes: [],
      },
      toUpload: images,
    });

    closeModal();
  };

  useEffect(() => {
    if (warranty.photos) {
      const photos = warranty.photos.map((photo) => ({
        id: photo.key,
        title: photo.key,
        img: null,
        url: photo.url,
        toUpload: false,
      }));
      setImages(photos);
    }
  }, [warranty]);

  return (
    <BaseModal
      modalId="add-warranty-photos-modal"
      title="Add Photos"
      open
      closeOnTap
      onSubmit={handleSubmit}
      onClose={() => closeModal()}
    >
      <SortableContainer images={images} setImages={setImages} />
    </BaseModal>
  );
}
