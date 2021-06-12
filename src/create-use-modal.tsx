import { createModal, CreateModalFunctionParam } from './create-modal';
import { useModal } from './use-modal';
import React from 'react';

export const createUseModal = <
  Data extends unknown = void,
  Param extends unknown = void
>(
  ...param: CreateModalFunctionParam<Data, Param>
) => {
  const Modal = createModal<Data, Param>(...param);
  const modalElement = <Modal />;
  return () => useModal<typeof Modal>(modalElement);
};
