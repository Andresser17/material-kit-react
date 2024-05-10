import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { openModal, closeModal, isModalOpen } from "src/redux/slices/modal";

export function useModal(id: string) {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => isModalOpen(state, id));

  const onOpen = useCallback(
    (meta: Record<string, unknown>) => dispatch(openModal({ id, meta })),
    [id],
  );
  const onClose = useCallback(() => dispatch(closeModal(id)), [id]);

  return {
    isOpen,
    onOpen,
    onClose,
  };
}
