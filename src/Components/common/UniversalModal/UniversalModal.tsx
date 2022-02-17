import { Icon, Modal } from '@material-ui/core';
import { Button } from 'Components/common/form';
import React, { ReactElement } from 'react';
import './universal-modal.scss';


type ModalType = 'form' | 'info';

export interface IUniversalModalProps {
  children?: React.ReactNode;
  visible: boolean;
  type?: ModalType;
  onOk?(): void;
  onCancel?(): void;
  title?: string;
  className?: string;
  promptText?: string;
  promptOkBtn?: ReactElement | string;
  isLoading?: boolean;
  disableBackdropClick?:boolean;

}

export const UniversalModal = (props: IUniversalModalProps) => {
  const {
    visible,
    type = 'form',
    title,
    className = '',
    onOk,
    onCancel,
    promptText,
    promptOkBtn = 'ok',
    children,
    isLoading = false,
    disableBackdropClick,
  } = props;

  const renderFooter = () => {
    if (onOk) {
      return (
        <div className="universal-modal__footer">
          {onOk && <Button onClick={onOk} isLoading={isLoading}>{promptOkBtn}</Button>}
        </div>
      );
    }
    return null;
  };

  switch (type) {
    case 'form':
    case 'info':
      return (
        <Modal
          open={visible}
          // title={title || 'Confirmation'}
          onClose={onCancel}
          className={`universal-modal universal-modal--${type} ${className}`}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          disableBackdropClick
        >
          <div className="universal-modal__box">
            <div className="universal-modal__header">
              <span className="universal-modal__title">{title}</span>
              <Button
                className="universal-modal__header-close"
                onClick={() => onCancel && onCancel()}
              >
                <Icon className="icon-RedX" />
              </Button>
            </div>
            <div className="universal-modal__content" title={title || 'Confirmation'}  >
              {(promptText && <>{promptText}</>) ||
                (children && <>{children}</>)}
            </div>
            {renderFooter()}
          </div>
        </Modal>
      );

    default:
      return null;
  }
};
