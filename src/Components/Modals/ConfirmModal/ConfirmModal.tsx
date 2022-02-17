import React, { ReactElement } from 'react';
import './confirm-modal.scss';
import { Icon } from '@material-ui/core';
import { Button } from 'Components/common/form';

interface IConfirmModal {
  title: string;
  text?: string | ReactElement;
  okTitle?: string;
  modalType: ModalTypes;
  closeEditor: () => void;
  handleOk: () => void;
}

export const ConfirmModal = (props: IConfirmModal) => {
  const {
    title,
    closeEditor,
    handleOk,
    modalType,
    text,
    okTitle = 'Ok',
  } = props;

  if (modalType === 'info') {
    return (
      <>
        <div className="confirm-delete-modal__box">
          <div className="confirm-delete-modal__cont">
            <span className="confirm-delete-modal__title">{title}</span>
            <div className="confirm-delete-modal__text">{text}</div>
          </div>
        </div>
        <div className="confirm-delete-modal__buttons">
          <Button onClick={handleOk}>{okTitle}</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="confirm-delete-modal__box">
        <Icon className="confirm-delete-modal__ico icon-warning-alert" />
        <div className="confirm-delete-modal__cont">
          <span className="confirm-delete-modal__title">{title}</span>
          {text && <div className="confirm-delete-modal__text">{text}</div>}
          {modalType === 'delete' && (
            <span className="confirm-delete-modal__text">Cannot be undone</span>
          )}
        </div>
      </div>
      <div className="confirm-delete-modal__buttons">
        <Button onClick={closeEditor} btnStyle="white">
          cancel
        </Button>
        <Button onClick={handleOk}>
          {modalType === 'delete' ? 'Delete' : okTitle}
        </Button>
      </div>
    </>
  );
};
