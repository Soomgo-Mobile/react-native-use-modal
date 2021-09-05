import React, { useCallback } from 'react';
import type { ModalProps } from 'react-native-modal';
import Modal from 'react-native-modal';
import type { ModalConfirmFunction } from './modal-confirm-function';
import { useModalViewModel } from './use-modal-view-model';
import { StyleSheet } from 'react-native';
import type { ModalInstance } from './modal-instance';

export type CreateModalOption = {
  cancelOnBackdropPress?: boolean; // 배경 클릭시 취소 여부
  cancelOnBackButtonPress?: boolean; // 뒤로가기 버튼 클릭시 취소 여부
  modalProps?: Omit<Partial<ModalProps>, 'isVisible'>;
};

export type CreateModalFunctionParam<
  Data extends unknown = void, // 모달 결과로 받을 값의 타입
  Param extends unknown = void
> = [
  // 모달 내용 컴포넌트
  Content: React.VoidFunctionComponent<{
    confirm: ModalConfirmFunction<Data>; // 모달 종료 함수 (승인)
    cancel: () => void; // 모달 종료 함수 (취소)
    param: Param;
  }>,
  option?: CreateModalOption
];

/**
 * 모달 컴포넌트 생성 함수
 */
export const createModal = <
  Data extends unknown = void, // 모달 결과로 받을 값의 타입
  Param extends unknown = void
>(
  ...[
    Content,
    {
      cancelOnBackButtonPress = false,
      cancelOnBackdropPress = false,
      modalProps = {},
    } = {},
  ]: CreateModalFunctionParam<Data, Param>
) =>
  React.forwardRef<ModalInstance<Data, Param>>((_, ref) => {
    const {
      handleBackButtonPress,
      handleBackdropPress,
      cancel,
      confirm,
      desiredVisibility,
      handleModalHidden,
      handleModalShown,
      param,
      visibility,
    } = useModalViewModel(ref, {
      cancelOnBackButtonPress,
      cancelOnBackdropPress,
    });

    const {
      backdropTransitionOutTiming,
      onBackdropPress,
      onBackButtonPress,
      onModalHide,
      onModalWillShow,
      style,
      ...restModalProps
    } = modalProps;

    const _handleBackdropPress = useCallback<
      ModalProps['onBackdropPress']
    >(() => {
      handleBackdropPress();
      onBackdropPress?.();
    }, [handleBackdropPress, onBackdropPress]);

    const _handleBackButtonPress = useCallback<
      ModalProps['onBackButtonPress']
    >(() => {
      handleBackButtonPress();
      onBackButtonPress?.();
    }, [handleBackButtonPress, onBackButtonPress]);

    const _handleModalHide = useCallback<ModalProps['onModalHide']>(() => {
      handleModalHidden();
      onModalHide?.();
    }, [handleModalHidden, onModalHide]);

    const _handleModalWillShow = useCallback<
      ModalProps['onModalWillShow']
    >(() => {
      handleModalShown();
      onModalWillShow?.();
    }, [handleModalShown, onModalWillShow]);

    return (
      <Modal
        isVisible={desiredVisibility}
        backdropTransitionOutTiming={backdropTransitionOutTiming ?? 0}
        onBackdropPress={_handleBackdropPress}
        onBackButtonPress={_handleBackButtonPress}
        onModalHide={_handleModalHide}
        onModalWillShow={_handleModalWillShow}
        style={[styles.modal, style]}
        {...restModalProps}
      >
        {visibility === 'SHOWN' && (
          <Content confirm={confirm} cancel={cancel} param={param!} />
        )}
      </Modal>
    );
  });

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
  },
});
