import React, { ReactElement } from 'react';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { ErrorModal } from '../ErrorModal/ErrorModal';

interface IConfirmDeleteModalProps {
  title: string;
  modalType: ModalTypes;
  isPrompt: boolean;
  text?: string | ReactElement;
  okTitle?: string;
  onOk(): void;
  closeEditor?(): void;
}

export const InfoModal = (props: IConfirmDeleteModalProps) => {
  const {
    isPrompt,
    closeEditor,
    title,
    onOk,
    modalType,
    text,
    okTitle,
  } = props;

  const handleClose = () => {
    if (closeEditor) {
      closeEditor();
    }
  };

  const handleOk = () => {
    onOk();
    handleClose();
  };

  const renderModal = () => {
    switch (modalType) {
      case 'success':
        return <SuccessModal closeEditor={handleClose} title={title} />;
      case 'confirm':
      case 'delete':
      case 'info':
        return (
          <ConfirmModal
            closeEditor={handleClose}
            handleOk={handleOk}
            title={title}
            text={text}
            modalType={modalType}
            okTitle={okTitle}
          />
        );
      case 'error':
        return <ErrorModal closeEditor={handleClose} title={title} />;
      default:
        return null;
    }
  };

  return (
    <UniversalModal
      visible={isPrompt}
      onCancel={closeEditor}
      type="info"
      className={`modal-${modalType}`}
    >
      {renderModal()}
    </UniversalModal>
  );
};
