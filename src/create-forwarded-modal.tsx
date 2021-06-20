import React, { useCallback } from 'react';
import type { ModalConfirmFunction } from './modal-confirm-function';
import type { ModalInstance } from './modal-instance';
import { useForwardedModalViewModel } from './use-forwarded-modal-view-model';

// 모달 내용 컴포넌트
type ContentComponent<
  Data extends unknown = void, // 모달 결과로 받을 값의 타입
  Param extends unknown = void
> = React.VoidFunctionComponent<{
  confirm: ModalConfirmFunction<Data>; // 모달 종료 함수 (승인)
  cancel: () => void; // 모달 종료 함수 (취소)
  param: Param | null;
  onHide: () => void;
  isVisible: boolean;
}>;

type Option = {
  handleHide?: boolean;
};

export type CreateForwardedModalFunctionParam<
  Data extends unknown = void,
  Param extends unknown = void
> = [Content: ContentComponent<Data, Param>, option?: Option];

/**
 * 모달 컴포넌트 생성 함수
 */
export const createForwardedModal = <
  Data extends unknown = void, // 모달 결과로 받을 값의 타입
  Param extends unknown = void
>(
  ...[Content, { handleHide = false } = {}]: CreateForwardedModalFunctionParam<
    Data,
    Param
  >
) =>
  (() => {
    return React.forwardRef<ModalInstance<Data, Param>>((_, ref) => {
      const { confirm, cancel, desiredVisibility, param, setHidingFinished } =
        useForwardedModalViewModel<Data, Param>(ref, { handleHide });

      const handleOnHide = useCallback(() => {
        setHidingFinished();
      }, [setHidingFinished]);

      return (
        <Content
          confirm={confirm}
          cancel={cancel}
          param={param}
          isVisible={desiredVisibility}
          onHide={handleOnHide}
        />
      );
    });
  })();
