import React from 'react';
import Modal from 'react-native-modal';
import type { ModalConfirmFunction } from './modal-confirm-function';
import { useModalViewModel } from './use-modal-view-model';
import type { ModalResult } from './modal-result';
import { StyleSheet } from 'react-native';

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
  }: {
    cancelOnBackdropPress?: boolean; // 배경 클릭시 취소 여부
    cancelOnBackButtonPress?: boolean; // 뒤로가기 버튼 클릭시 취소 여부
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

    return (
      <Modal
        isVisible={desiredVisibility}
        backdropTransitionOutTiming={0}
        onBackdropPress={handleBackdropPress}
        onBackButtonPress={handleBackButtonPress}
        onModalHide={handleModalHidden}
        onModalWillShow={handleModalShown}
        style={styles.modal}
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
