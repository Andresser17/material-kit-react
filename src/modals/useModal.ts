import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
  openModal,
  closeModal,
  isModalOpen,
  getModalProps,
} from "src/redux/slices/modal";

export function useModal<T>(id: string) {
  const props = useAppSelector((state) => getModalProps(state, id)) as T;
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => isModalOpen(state, id));

  const onOpen = useCallback(
    (props?: T) => {
      dispatch(openModal({ id, props: props ? props : {} }));
    },
    [id],
  );
  const onClose = useCallback(() => dispatch(closeModal(id)), [id]);

  return {
    props,
    isOpen,
    onOpen,
    onClose,
  };
}
