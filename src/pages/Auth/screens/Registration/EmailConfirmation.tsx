import { emailConfirmationAction } from 'actions';
import { LandingPageRouter } from 'const';
import { session } from 'helpers';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import '../../auth-page.scss';

const EmailConfirmation = (props: RouteComponentProps) => {
  const { history } = props;

  useEffect(() => {
    let unlisten = history.listen(() => {
      if (history.action === 'POP') {
        session.clearData();
        unlisten();
      }
    });
  }, []);

  const dispatch = useDispatch();

  const pathname = history.location.pathname.split('/')[3];
  const search = history.location.search;

  const handleRedirect = () => (path?: string) => {
    if (path) history.push(path);
  };

  const redirectToProfile = () => {
    history.push(LandingPageRouter.ROOT);
  };

  const confirmEmailQuery = () => {
    const queryString: string = `${pathname}${search}`;
    dispatch(
      emailConfirmationAction(
        { act: queryString },
        { redirect: handleRedirect() },
      ),
    );
  };

  const checkIfUrlContainsToken = () => {
    if (pathname === undefined) {
      return;
    }
    
    confirmEmailQuery();
  };

  useEffect(() => {
    checkIfUrlContainsToken();
  }, []);

  return (
    <div className="email-confirmation-block">
      <span className={`icon-email`} />
      <div className="email-confirmation-block__title">
        <span>Please confirm your email</span>
        <span>to finalized registration.</span>
      </div>
      <div className="email-confirmation-block__subtitle">
        <span>
          <span className="white-text">Welcome to TCG Showdown!</span><br/>
          <span>To begin using the platform, you will need to activate</span>
        </span>
        <span>your account through your email.</span>
      </div>
      <span className="link" onClick={redirectToProfile}>
        Skip this step
      </span>
    </div>
  );
};

export default EmailConfirmation;
