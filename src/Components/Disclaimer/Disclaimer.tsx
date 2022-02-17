import React from 'react';
import { Icon } from '@material-ui/core';

import './disclaimer.scss';
import { Button } from 'Components/common/form';
import { useDispatch } from 'react-redux';
import { resendEmailAction } from 'actions';
import { useLoading } from 'hooks';

interface IDisclaimerProps {
  isVisible: boolean;
  onClose(): void;
}

function Disclaimer(props: IDisclaimerProps) {
  const dispatch = useDispatch();
  const { isVisible, onClose } = props;
  const isLoading = useLoading('authReducer');

  const resendEmail = () => {
    dispatch(resendEmailAction(null));
  };

  return (
    <div className={`disclaimer ${isVisible ? 'disclaimer--visible' : ''}`}>
      <Icon className="icon-warning-alert disclaimer__info" />
      <span className="disclaimer__text">
        Hey again! Please, confirm your email to be able to withdraw funds.{' '}
        <Button
          onClick={resendEmail}
          className="disclaimer__resend"
          btnStyle="white-fill"
          isLoading={isLoading}
        >
          Resend email
        </Button>
      </span>
      <Button onClick={onClose} className="disclaimer__close">
        <Icon className="icon-RedX" />
      </Button>
    </div>
  );
}

export default React.memo(Disclaimer);
