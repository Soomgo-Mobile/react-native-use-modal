import React, {
  RefAttributes,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ModalContext } from './modal-context';
import type { ModalInstance } from './modal-instance';
import { nanoid } from 'nanoid';
import type { ForwardedRef } from './util/forwarde-ref';
import { isNotNil } from './util/is-not-nil';

type ModalRef = RefAttributes<ModalInstance<any>>;

/**
 * 모달을 등록하는 hook
 */
export const useModal = <
  Component extends React.ForwardRefExoticComponent<ModalRef>
>(
  modal: React.ReactElement
) => {
  const context = useContext(ModalContext);
  // 모달 ID
  const modalId = useMemo(() => nanoid(), []);
  console.log('modalId', modalId);

  const [instance$] = useState(
    () => new BehaviorSubject<ModalInstance<any> | null>(null)
  );

  useEffect(() => {
    const clone = React.cloneElement<ModalRef>(modal, {
      ref: (instance) => {
        instance$.next(instance);
      },
    });
    context.set(modalId, clone);
    console.log('context', context);
    console.log('modal set', modalId, clone);

    return () => {
      context.delete(modalId);
    };
  }, [context, instance$, modal, modalId]);

  const show = useCallback<ForwardedRef<Component>['show']>(
    async () => (await firstValueFrom(instance$.pipe(filter(isNotNil)))).show(),
    [instance$]
  );

  return useMemo<ForwardedRef<Component>>(() => {
    return {
      show,
    } as ForwardedRef<Component>;
  }, [show]);
};
