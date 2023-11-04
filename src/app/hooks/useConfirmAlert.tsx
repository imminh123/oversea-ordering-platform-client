import { EModalType } from 'app/context/ui/enum';
import { ConfirmModalProps } from 'app/context/ui/modal/ConfirmModal';
import { useUI } from './index';

function useConfirmAlert() {
  const { openModal } = useUI();

  const handleConfirm = (params: {
    onConfirm: (...args: any[]) => any | Promise<any>;
    options?: ConfirmModalProps;
  }) => {
    openModal(EModalType.CONFIRM_MODAL, {
      onConfirm: params.onConfirm,
      options: params.options,
    });
  };

  return {
    confirm: handleConfirm,
  };
}

export default useConfirmAlert;
