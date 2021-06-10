import React, { useCallback } from 'react';
import Modal from 'react-native-modal';
import type { ModalConfirmFunction } from './modal-confirm-function';
import { useModalViewModel } from './use-modal-view-model';
import type { ModalResult } from './modal-result';
import { StyleSheet } from 'react-native';
import type { ModalProps } from 'react-native-modal';

/**
 * 모달 컴포넌트 생성 함수
 */
export const createModal = <
  T extends unknown = void // 모달 결과로 받을 값의 타입
>(
  // 모달 내용 컴포넌트
  Content: React.VoidFunctionComponent<{
    confirm: ModalConfirmFunction<T>; // 모달 종료 함수 (승인)
    cancel: () => void; // 모달 종료 함수 (취소)
  }>,
  {
    cancelOnBackButtonPress = false,
    cancelOnBackdropPress = false,
    modalProps = {},
  }: {
    cancelOnBackdropPress?: boolean; // 배경 클릭시 취소 여부
    cancelOnBackButtonPress?: boolean; // 뒤로가기 버튼 클릭시 취소 여부
    modalProps?: Partial<ModalProps>;
  } = {}
) =>
  React.forwardRef<{ show: () => Promise<ModalResult<T>> }>((_, ref) => {
    const {
      handleBackButtonPress,
      handleBackdropPress,
      cancel,
      confirm,
      desiredVisibility,
      handleModalHidden,
      handleModalShown,
    } = useModalViewModel<T>(ref, {
      cancelOnBackButtonPress,
      cancelOnBackdropPress,
    });

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isVisible,
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
        <Content confirm={confirm} cancel={cancel} />
      </Modal>
    );
  });

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
  },
});
