import type { ModalResultType } from './modal-result-type';

export type ModalResult<T = never> =
  | {
      type: ModalResultType.CONFIRM;
      data: T;
    }
  | {
      type: ModalResultType.CANCEL;
    };
