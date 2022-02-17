import { Icon } from '@material-ui/core';
import { Button } from 'Components/common/form';
import { showMessage } from 'helpers';
import React from 'react';
import './toast-success.scss';

interface IToastSuccess {
  title?: string;
  subtitle?: string;
  btnTitle?: string;
  onClick?(): void;
}

let toastTitle;
const ToastSuccess = (props: IToastSuccess) => {
  const { title, subtitle, btnTitle = 'OK', onClick } = props;
  toastTitle = title;
  return (
    <div className="toast-success-wrapper">
      <Icon className="icon-success_modal" />
      {title && <span className="toast-success__title">{title}</span>}
      {subtitle && <span className="toast-success__subtitle">{subtitle}</span>}
      <Button
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        {btnTitle}
      </Button>
    </div>
  );
};

export const ShowToastSuccess = (props: IToastSuccess) => {
  return showMessage.success(<ToastSuccess {...props} />, {
    autoClose: false,
    onOpen: () =>
      document.getElementsByClassName('Toastify')[0].classList.add('active'),
    onClose: () => {
      document.getElementsByClassName('Toastify')[0].classList.remove('active');
    },
  });
};
