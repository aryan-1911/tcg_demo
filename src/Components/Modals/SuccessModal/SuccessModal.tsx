import React from 'react';
import './success-modal.scss';
import { Icon } from '@material-ui/core';
import { Button } from 'Components/common/form';

interface ISuccessModal {
  title: string;
  closeEditor: () => void;
}

export const SuccessModal = (props: ISuccessModal) => {
  const { title, closeEditor } = props;

  return (
    <div className="success-modal-wrapper">
      <div className="success-modal">
        <Icon className="success-modal__ico icon-success_modal" />
        <div className="success-modal__cont">
          <span className="success-modal__title">{title}</span>
        </div>
      </div>
      <div className="success-modal__buttons">
        <Button onClick={closeEditor}>OK</Button>
      </div>
    </div>
  );
};
