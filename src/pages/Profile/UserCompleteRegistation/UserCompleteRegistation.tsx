import React from 'react';
import { Icon } from '@material-ui/core';
import { ProfileRoute } from 'const';
import { birthDayDateFormat } from 'helpers';
import { IUserProfileResp } from 'interfaces';

interface IUserCompleteRegistation {
  handleRedirect: (path: string) => () => any;
  userData: IUserProfileResp;
}

export const UserCompleteRegistation = (props: IUserCompleteRegistation) => {
  const { handleRedirect, userData } = props;

  return (
    <div className="user-profile-user-general">
      <div className="user-complete-registration-wrapper">
        <div className="user-complete-registration-content">
          <div
            className="user-profile-user__edit"
            onClick={handleRedirect(ProfileRoute.EDIT_USER_PROFILE)}
          >
            <Icon className={`icon-ic_edit`} />
            <span>Edit profile</span>
          </div>
          <span className="block username">{userData?.username}</span>
          {userData?.fullname && (
            <span className="block fullname">{userData?.fullname}</span>
          )}
          <span className="block email">{userData?.email}</span>
          <span className="block birthdate">
            <span className="icon-calendar" />
            {birthDayDateFormat(userData?.birthdate) || ''}
          </span>
          <div className="alert-info">
            <Icon className="icon-ic_alert" />
            <span className="block">
              Complete your profile to be able to create matches
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
