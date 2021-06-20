import { useModal } from './use-modal';
import React from 'react';
import type { CreateForwardedModalFunctionParam } from './create-forwarded-modal';
import { createForwardedModal } from './create-forwarded-modal';

export const createUseForwardedModal = <
  Data extends unknown = void,
  Param extends unknown = void
>(
  ...param: CreateForwardedModalFunctionParam<Data, Param>
) => {
  const Modal = createForwardedModal<Data, Param>(...param);
  const modalElement = <Modal />;
  return () => useModal<typeof Modal>(modalElement);
};
