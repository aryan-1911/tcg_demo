import React from 'react';
import { Route, Switch } from 'react-router';
import NotFoundPage from 'pages/NotFound/NotFoundPage';
import UserProfile from 'pages/Profile/UserProfile';
import EditUserProfile from 'pages/Profile/UserEditProfile/EditUserProfile';
import UserProfileSettings from 'pages/Profile/UserSettings/UserProfileSettings';
import { ProfileRoute } from 'const';

const ProfileRouter = () => {
  return (
    <Switch>
      <Route exact path={ProfileRoute.ROOT} component={UserProfile} />

      <Route
        exact
        path={ProfileRoute.EDIT_USER_PROFILE}
        component={EditUserProfile}
      />
      <Route
        exact
        path={ProfileRoute.USER_PROFILE_SETTINGS}
        component={UserProfileSettings}
      />
      <Route exact path={ProfileRoute.SPECIFIC} component={UserProfile} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default ProfileRouter;
