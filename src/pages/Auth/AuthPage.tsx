import BackgroundImage from 'assets/images/showdown_picture.jpg';
import Logo from 'assets/images/TCG_logo.svg';
import { Button } from 'Components/common/form';
import {
  authPageSubTitles, authPageTitles, AuthRoute, RegistrationRoute, showSignInButton
} from 'const';
import { COLORS } from 'const/colors';
import { session } from 'helpers';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './auth-page.scss';

export const AuthPageWrapper = (FormComponent: any) => (
  routeProps: RouteComponentProps,
) => {
  const { history } = routeProps;

  const handleRedirectLogin = () => history.push(AuthRoute.ROOT);
  const loginFormRoutes = {
    [AuthRoute.ROOT]: [AuthRoute.ROOT],
    [AuthRoute.FORGOT_PASSWORD]: [AuthRoute.FORGOT_PASSWORD],
  };
  const registerFormRoutes = {
    [RegistrationRoute.ROOT]: [RegistrationRoute.ROOT],
    [RegistrationRoute.USER_PROFILE_INFO]: [
      RegistrationRoute.USER_PROFILE_INFO,
    ],
    [RegistrationRoute.RESET_PASSWORD]: [RegistrationRoute.RESET_PASSWORD],
  };

  const isSignIn = loginFormRoutes[history.location.pathname];
  const isRegistration = registerFormRoutes[history.location.pathname];
  const authPageWrapperStyles = isSignIn
    ? {
        background: `url(${BackgroundImage}) 100% 0% no-repeat`,
        backgroundSize: 'cover',
      }
    : { background: COLORS.BLACK };

  const renderLogo = () => {
    const hasToken = Boolean(session.getToken());

    if (hasToken) {
      return (
        <Link to="/">
          <img src={Logo} alt="Page Logo" />
        </Link>
      );
    } else {
      return (
        <a href="https://tcgshowdown.com">
          <img src={Logo} alt="Page Logo" />
        </a>
      );
    }
  };

  const renderAuthPage = () => {
    return (
      <div className="login-page">
        <div className="login-page-content">
          <div className="login-page__title">
            <span className="title">
              {authPageTitles[history.location.pathname]}
            </span>
            <span className="sub-title">
              {authPageSubTitles[history.location.pathname]}
            </span>
          </div>
          <div className="login-page-form">
            <FormComponent history={history} />
          </div>
        </div>
      </div>
    );
  };

  const showSignInBtn = () => {
    if (showSignInButton.includes(history.location.pathname)) {
      return (
        <div className="auth-page-header__btn">
          <span className="additional_text">Already have an account?</span>
          <Button onClick={handleRedirectLogin} btnStyle="white">
            Sign In
          </Button>
        </div>
      );
    }
  };

  return (
    <div
      className={`auth-page ${isRegistration ? 'auth-page--registration' : ''}`}
      style={authPageWrapperStyles}
    >
      <div
        className={`auth-page-header ${
          !isSignIn ? 'auth-page-header--registration' : ''
        }`}
      >
        <div className="container">
          <div className="auth-page-header__box">
            <div className="auth-page-header__logo">{renderLogo()}</div>
            {showSignInBtn()}
          </div>
        </div>
      </div>
      <div className="container auth-wrapper">{renderAuthPage()}</div>
    </div>
  );
};
