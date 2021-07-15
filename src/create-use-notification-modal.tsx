import { preConfigCreateUseModal } from './pre-config-create-use-modal';

/**
 * Modal hook creation function with default set to BottomSheet style
 */
export const createUseNotificationModal = preConfigCreateUseModal({
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
