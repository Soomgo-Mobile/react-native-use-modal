import type { ModalResult } from './modal-result';

export interface ModalInstance<Data = void, Param = void> {
  show: Param extends void
    ? () => Promise<ModalResult<Data>>
    : (param: Param) => Promise<ModalResult<Data>>;
}
