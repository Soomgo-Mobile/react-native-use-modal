import {
  MutableRefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import type { ModalInstance } from './modal-instance';
import type { ModalResult } from './modal-result';
import type { ModalConfirmFunction } from './modal-confirm-function';
import { ModalResultType } from './modal-result-type';

export const useModalViewModel = <
  T extends unknown = void // 모달 결과로 받을 값의 타입
>(
  ref:
    | ((instance: ModalInstance<T> | null) => void)
    | MutableRefObject<ModalInstance<T> | null>
    | null,
  {
    cancelOnBackButtonPress = false,
    cancelOnBackdropPress = false,
  }: {
    cancelOnBackdropPress?: boolean; // 배경 클릭시 취소 여부
    cancelOnBackButtonPress?: boolean; // 뒤로가기 버튼 클릭시 취소 여부
  } = {}
) => {
  // desired 표시 상태 (이 값이 true 라고 해서 모달이 표시된 상태는 아닙니다. false 도 마찬가지)
  const [desiredVisibility, setDesiredVisibility] = useState(false);
  // AlertResult Subject
  const [result$] = useState(() => new Subject<ModalResult<T>>());
  // 보여짐/숨겨짐 상태
  const [visibility$] = useState(
    () => new BehaviorSubject<'HIDDEN' | 'SHOWN'>('HIDDEN')
  );

  useImperativeHandle(ref, () => ({
    show: () => {
      // 모달 표시 상태로 변경 시작
      setDesiredVisibility(true);
      // 모달 결과 Subject 에서
      return firstValueFrom(result$);
    },
  }));

  // 모달 종료 (승인)
  const confirm = useCallback<ModalConfirmFunction<T>>(
    // @ts-ignore
    (data) => {
      // 숨김 상태로 변경 시작
      setDesiredVisibility(false);
      // 숨김 상태로 변경되면 result 발행
      visibility$
        .pipe(
          filter((value) => value === 'HIDDEN'),
          first()
        )
        .subscribe(() => {
          result$.next({
            type: ModalResultType.CONFIRM,
            // @ts-ignore
            data,
          });
        });
    },
    [result$, visibility$]
  );

  // 모달 종료 (취소)
  const cancel = useCallback(() => {
    // 숨김 상태로 변경 시작
    setDesiredVisibility(false);
    // 숨김 상태로 변경되면 result 발행
    visibility$
      .pipe(
        filter((value) => value === 'HIDDEN'),
        first()
      )
      .subscribe(() => {
        result$.next({
          type: ModalResultType.CANCEL,
        });
      });
  }, [result$, visibility$]);

  // 배경 클릭 핸들
  const handleBackdropPress = useCallback(() => {
    cancelOnBackdropPress && cancel();
  }, [cancel, cancelOnBackdropPress]);

  // 뒤로가기 버튼 클릭 핸들
  const handleBackButtonPress = useCallback(() => {
    cancelOnBackButtonPress && cancel();
  }, [cancel, cancelOnBackButtonPress]);

  // 모달 보여짐 이벤트 핸들
  const handleModalShown = useCallback(() => {
    visibility$.next('SHOWN');
  }, [visibility$]);

  // 모달 숨겨짐 이벤트 핸들
  const handleModalHidden = useCallback(() => {
    visibility$.next('HIDDEN');
  }, [visibility$]);

  return useMemo(
    () => ({
      confirm,
      cancel,
      desiredVisibility,
      handleBackButtonPress,
      handleBackdropPress,
      handleModalShown,
      handleModalHidden,
    }),
    [
      cancel,
      confirm,
      handleBackButtonPress,
      handleBackdropPress,
      handleModalHidden,
      handleModalShown,
      desiredVisibility,
    ]
  );
};
