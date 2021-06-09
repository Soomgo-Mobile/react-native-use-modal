import type { ModalResult } from './modal-result';

export interface ModalInstance<T> {
  show: () => Promise<ModalResult<T>>;
}
