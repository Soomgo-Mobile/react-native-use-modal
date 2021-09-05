import { createCreateUseModal } from './create-create-use-modal';

/**
 * Modal hook creation function with default set to BottomSheet style
 */
export const createUseBottomSheetModal = createCreateUseModal({
  modalProps: {
    style: {
      margin: 0,
      padding: 0,
      justifyContent: 'flex-end',
    },
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
  },
  cancelOnBackButtonPress: true,
  cancelOnBackdropPress: true,
});
