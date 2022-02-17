import { Icon } from '@material-ui/core';
import { Button } from 'Components/common/form';
import { showMessage } from 'helpers';
import React from 'react';
import './toast-error.scss';

interface IToastError {
  title?: string | string[];
  subtitle?: string;
  btnTitle?: string;
  onClick?(): void;
}

const handleClose = () => {
  document.getElementsByClassName('Toastify')[0].classList.remove('active');
};

const ToastError = (props: IToastError) => {
  const { title, onClick, subtitle, btnTitle = 'OK' } = props;
  const renderTitle = () => {
    if (typeof title === 'string') {
      return <span className="toast-error__title">{title}</span>;
    }
    if (Array.isArray(title)) {
      return title.map((item, index) => {
        const text = item.endsWith('.') ? item : `${item}.`;
        return (
          <>
            <span key={index} className="toast-error__title">
              {text}
            </span>
            {subtitle&&subtitle.includes('in-game name')?<span key={`in-game ${index}`} className="toast-error__subtitle in-game-err-subtitle">
              {subtitle}
            </span>:null}  
          </>
        );
      });
    }
  };

  return (
    <div className="toast-error-wrapper">
      <Icon className="icon-warning-alert" />
      {title && renderTitle()}
      {subtitle&&subtitle.includes('in-game name')?<span className="toast-error__subtitle in-game-err-subtitle-hide">{subtitle}</span>:<span className="toast-error__subtitle">{subtitle}</span>}
      <Button
        onClick={() => {
          if (onClick) {
            onClick();
            handleClose();
          }
        }}
      >
        {btnTitle}
      </Button>
    </div>
  );
};

export const ShowToastError = (props: IToastError) => {
  return showMessage.error(<ToastError {...props}/>, {
    onOpen: () =>
      document.getElementsByClassName('Toastify')[0].classList.add('active'),
    onClose: () => {
      handleClose();
      // document.getElementsByClassName('Toastify')[0].classList.add('closing'); 
      // setTimeout(() => {
      //   document.getElementsByClassName('Toastify')[0].classList.remove('closing');
      // }, 250);
    },
  });
};
