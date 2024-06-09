import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
  openModal,
  closeModal,
  isModalOpen,
  updateProps,
  getModalProps,
} from "src/redux/slices/modal";

export function useModal<T>(id: string) {
  const props = useAppSelector((state) => getModalProps(state, id)) as T;
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector((state) => isModalOpen(state, id));

  const onOpen = useCallback(
    (newProps?: T) => {
      dispatch(openModal({ id, props: { ...props, ...newProps } }));
    },
    [id],
  );
  const onClose = useCallback(
    (resetState?: boolean) => dispatch(closeModal({ id, resetState })),
    [id],
  );

  const onUpdate = useCallback(
    (newProps?: T) => {
      dispatch(updateProps({ id, props: { ...props, ...newProps } }));
    },
    [id],
  );

  return {
    props,
    isOpen,
    onOpen,
    onClose,
    onUpdate,
  };
}
