import { AuthRoute, RegistrationRoute } from 'const';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';


const LoginForm = React.lazy(
  () => import('pages/Auth/screens/Login/LoginForm'),
);
const ForgotPasswordPassword = React.lazy(
  () => import('pages/Auth/screens/Login/ForgotPasswordForm'),
);
const RessetPasswordForm = React.lazy(
  () => import('pages/Auth/screens/Login/RessetPasswordForm'),
);
const RegistrationForm = React.lazy(
  () => import('pages/Auth/screens/Registration/RegistrationForm'),
);
const UserProfileInfoForm = React.lazy(
  () => import('pages/Auth/screens/Registration/UserProfileInfoForm'),
);
const EmailConfirmation = React.lazy(
  () => import('pages/Auth/screens/Registration/EmailConfirmation'),
);

const AuthRouter = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
    {/* <Suspense fallback={<CircularProgress className="site-loader" color="primary" /> }> */}
      <Switch>
        <Route exact path={AuthRoute.ROOT} component={LoginForm} />
        <Route
          exact
          path={AuthRoute.FORGOT_PASSWORD}
          component={ForgotPasswordPassword}
        />
        <Route
          exact
          path={RegistrationRoute.ROOT}
          component={RegistrationForm}
        />
        <Route
          exact
          path={RegistrationRoute.USER_PROFILE_INFO}
          component={UserProfileInfoForm}
        />
        <Route
          path={RegistrationRoute.EMAIL_CONFIRMATION}
          component={EmailConfirmation}
        />
        <Route
          path={RegistrationRoute.RESET_PASSWORD}
          component={RessetPasswordForm}
        />
      </Switch>
    </Suspense>
  );
};

export default AuthRouter;
