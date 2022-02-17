import { MatchSecondaryModal } from 'Components/Modals/MatchSecondaryModal';
import React from 'react';
import {
  withCreateMatchModal,
  WithCreateMatchModal,
} from './withCreateMatchModal';
import { withDetailMatchModal } from './withDetailMatchModal';

export interface IwithModals extends WithCreateMatchModal {}

export const withModals = (ChildComponent: any) => {
  const Wrapper: React.FC<any> = (props) => {
    return (
      <>
        <ChildComponent {...props} />
        <MatchSecondaryModal />
      </>
    );
  };

  return withCreateMatchModal(withDetailMatchModal(Wrapper));
};
