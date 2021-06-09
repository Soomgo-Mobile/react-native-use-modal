export type ModalConfirmFunction<T extends unknown> = T extends void
  ? () => void
  : (data: T) => void;
