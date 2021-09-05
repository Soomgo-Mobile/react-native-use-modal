import { createCreateUseModal } from './create-create-use-modal';

/**
 * Modal hook creation function with default set to BottomSheet style
 */
export const createUseNotificationModal = createCreateUseModal({
  modalProps: {
    style: {
      margin: 0,
      padding: 0,
      justifyContent: 'flex-start',
    },
    animationIn: 'slideOutDown',
    animationOut: 'slideInUp',
  },
});
