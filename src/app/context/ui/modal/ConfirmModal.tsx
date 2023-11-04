import * as React from 'react';

import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { LanguageTranslate } from 'app/languages';
import { useUI } from 'app/hooks';

import { EModalType } from '../enum';
import ModalWrapper from './ModalWrapper';

export interface ConfirmModalProps {
  title?: string;
  confirmationText?: string;
  cancellationText?: string;
  description?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const { t } = useTranslation();
  const { closeModal, modal } = useUI();
  const [loading, setLoading] = React.useState(false);

  const { title, confirmationText, cancellationText, description } = React.useMemo(() => {
    let result: Required<ConfirmModalProps> = {
      title: LanguageTranslate.modal.confirm_title,
      confirmationText: LanguageTranslate.common.text_confirm,
      cancellationText: LanguageTranslate.common.text_cancel,
      description: LanguageTranslate.modal.confirm_action_cannot_undone,
    };
    if (modal && modal.props && modal.props && modal.props.options) {
      const options = modal.props.options;

      result.title = options.title || LanguageTranslate.modal.confirm_title;
      result.confirmationText = options.confirmationText || LanguageTranslate.common.text_confirm;
      result.cancellationText = options.cancellationText || LanguageTranslate.common.text_cancel;
      result.description = options.description || LanguageTranslate.modal.confirm_action_cannot_undone;
    }

    return result;
  }, [modal]);

  const handleConfirm = async () => {
    if (modal && modal.props && modal.props.onConfirm) {
      try {
        setLoading(true);
        await modal.props.onConfirm();
        closeModal();
      } catch (err) {
        console.log({ err });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ModalWrapper
      loading={loading}
      modalType={EModalType.CONFIRM_MODAL}
      title={t(title)}
      closeable={true}
      actions={
        <>
          <Button autoFocus onClick={() => closeModal()}>
            {t(cancellationText)}
          </Button>
          <Button onClick={handleConfirm}>{t(confirmationText)}</Button>
        </>
      }
    >
      {t(description)}
    </ModalWrapper>
  );
};

export default ConfirmModal;
