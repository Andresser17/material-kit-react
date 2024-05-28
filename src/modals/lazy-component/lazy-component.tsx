"use client";

import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ILazyComponentProps {
  id: string;
}

export default function LazyComponent({ id }: ILazyComponentProps) {
  const handleModalClose = () =>
    console.warn("Hereby I promise to close this modal!");

  const Component = lazy(() => import(`../${id}.tsx`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        {id ? <Component onClose={handleModalClose} /> : null}
      </ErrorBoundary>
    </Suspense>
  );
}
