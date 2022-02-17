import React from 'react';
import { Icon } from '@material-ui/core';
import { Button } from 'Components/common/form';
import './error-modal.scss';

interface IErrorModal {
  title: string;
  closeEditor: () => void;
}

export const ErrorModal = (props: IErrorModal) => {
  const { title, closeEditor } = props;

  return (
    <div className="error-modal-wrapper">
      <div className="error-modal">
        <Icon className="error-modal__ico icon-warning-alert" />
        <div className="error-modal__cont">
          <span className="error-modal__title">{title}</span>
        </div>
      </div>
      <div className="error-modal__buttons">
        <Button onClick={closeEditor}>OK</Button>
      </div>
    </div>
  );
};
