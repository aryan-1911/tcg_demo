import React from 'react';
import { UniversalExpandModal } from 'Components/common/UniversalExpandModal';
import { IMatchSecondaryModalProps } from '..';

export const WaitOpponentModal = (props: IMatchSecondaryModalProps) => {
  const { handleClose, handleExpand, secondModal } = props;

  const { isCollapse, type } = secondModal;
  const isVisible = Boolean(type);

  return (
    <UniversalExpandModal
      visible={isVisible}
      isCollapse={isCollapse}
      title="Good Game!"
      secondTitle="Wait your opponent"
      onCancel={handleClose}
      onExpand={handleExpand}
      className="secondary-modal"
    >
      <p>Waiting for opponent’s results…</p>
    </UniversalExpandModal>
  );
};
