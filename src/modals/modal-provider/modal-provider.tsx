import { useAppSelector } from "src/redux/hooks";
import { getModalsList } from "src/redux/slices/modal/modal-slice";

import LazyComponent from "../lazy-component";

interface IModalProviderProps {
  children: React.ReactNode;
}

export type Modal<T> = {
  id: string;
  open: boolean;
  props?: T;
};

export default function ModalProvider(props: IModalProviderProps) {
  const modals = useAppSelector(getModalsList);

  return (
    <>
      {modals
        .filter((modal) => modal.open)
        .map((modal) => (
          <LazyComponent key={modal.id} id={modal.id} />
        ))}
      {props.children}
    </>
  );
}
