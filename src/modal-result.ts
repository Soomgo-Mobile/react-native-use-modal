import type { ModalResultType } from './modal-result-type';

export type ModalResult<Data = never> =
  | {
      type: ModalResultType.CONFIRM;
      data: Data;
    }
  | {
      type: ModalResultType.CANCEL;
    };
