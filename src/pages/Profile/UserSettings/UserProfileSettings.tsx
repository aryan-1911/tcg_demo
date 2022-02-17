import React from 'react';
import '../user-profile.scss';
import { ProfileRoute } from 'const';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ChangeEmailForm } from './ChangeEmailForm';
import { RouteComponentProps } from 'react-router-dom';
import PageHeader from 'Components/PageHeader';

const UserProfileSettings = (props: RouteComponentProps) => {
  const { history } = props;

  const handleRedirect = (path?: string) => () => {
    if (path) {
      history.push(path);
    } else {
      history.goBack();
    }
  };

  return (
    <div className="user-profile-wrapper">
      <PageHeader
        title={
          <>
            Account Settings
            <div className="go-back-link" onClick={handleRedirect()}>
              <span className="go-back-link__arrow">⟶</span>
              <span>Go Back</span>
            </div>
          </>
        }
      />
      <div className="user-settings-block">
        <ChangeEmailForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default UserProfileSettings;
