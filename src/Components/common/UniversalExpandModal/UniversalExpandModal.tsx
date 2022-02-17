import { Icon, Modal } from '@material-ui/core';
import { Button } from 'Components/common/form';
import React from 'react';
import './universal-expand-modal.scss';


export interface IUniversalExpandModalProps {
  children?: React.ReactNode;
  visible: boolean;
  isCollapse: boolean;
  onCancel(): void;
  onExpand(): void;
  title: string;
  secondTitle: string;
  className?: string;
}

export const UniversalExpandModal = (props: IUniversalExpandModalProps) => {
  const {
    visible,
    title,
    secondTitle,
    className = '',
    onCancel,
    onExpand,
    children,
    isCollapse,
  } = props;

  const renderCollapceModal = () => {
    return (
      <div
        className={`universal-modal universal-expand-modal ${
          isCollapse ? 'universal-expand-modal--collapse' : ''
        } ${className}`} title={title}
      >
        <div className="universal-modal__box">
          <div className="universal-modal__header" onClick={onExpand}>
            {/* <span className="universal-modal__title">{secondTitle}</span> */}
            <Icon className={`icon-matches`} />
            {/* <Button
              className="universal-modal__header-close"
              onClick={() => {}}
            >
              <Icon className="icon-expand" />
            </Button> */}
          </div>
        </div>
      </div>
    );
  };

  if (visible && isCollapse) {
    return renderCollapceModal();
  }

  return (
    <Modal
      disableScrollLock
      open={visible}
      // title={title}
      className={`universal-modal universal-expand-modal ${
        isCollapse ? 'universal-expand-modal--collapse' : ''
      } ${className}`}
    >
      <div className="universal-modal__box">
        <div className="universal-modal__header">
          <span className="universal-modal__title">{title}</span>
          <Button className="universal-modal__header-close" onClick={onCancel}>
            <Icon className="icon-collapse" />
          </Button>
        </div>
        <div className="universal-modal__content" title={title}>{children}</div>
      </div>
    </Modal>
  );
};
