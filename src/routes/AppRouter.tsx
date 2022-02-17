import CookieBanner from 'Components/CookieBanner';
import { MainWrapper } from 'Components/MainWrapper/MainWrapper';
import { InfoModal } from 'Components/Modals';
import {
  AuthRoute, BlogRoute, FaqsRoute, howToPlay, LandingPageRouter, MatchesRoute,
  RegistrationRoute,
  StaticPagesRoute
} from 'const';
import { withCentrifuge, withModals } from 'containers';
import { InfoModalContext } from 'context';
import { session } from 'helpers';
import { useConfirmModal } from 'hooks';
import { AuthPageWrapper } from 'pages/Auth/AuthPage';
import BlogsWrapper from 'pages/blogs/blogs-wrapper';
import HowTOPlayPage from 'pages/HowToPlay/HowToPlayPage';
import { StaticPagesWrapper } from 'pages/StaticPages/StaticPagesWrapper';
import React, { memo } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import AuthRouter from './childRoutes/AuthRouter';
import FaqRouter from './childRoutes/FaqRouter';
import StaticPagesRouter from './childRoutes/StaticPagesRouter';
import RootRouter from './RootRouter';


const PrivateRoutes = ({ hasToken }: { hasToken: boolean }) => {
  if (!hasToken) return <Redirect to={AuthRoute.ROOT} />;
  return (
    <Route
      path="/"
      render={() => {
        return (
          <>
            <Switch>
              <Redirect exact from="/" to={LandingPageRouter.ROOT} />
              <Route component={RootRouter} />
            </Switch>
          </>
        );
      }}
    />
  );
};

const withMemo = memo(MainWrapper(PrivateRoutes));

const MemoPrivateRoutes = withCentrifuge(withModals(withMemo));

const AppRouter = () => {
  const hasToken = Boolean(session.getToken());

  const {
    isOpenInfoModal,
    modalTitle,
    closeInfoModal,
    openInfoModal,
    onInfoOk,
    modalType,
    modalText,
  } = useConfirmModal();

  return (
    <InfoModalContext.Provider value={{ openInfoModal, closeInfoModal }}>
      <Switch>
        {/* AUTHORIZATION */}
        <Route path={AuthRoute.ROOT} component={AuthPageWrapper(AuthRouter)} />
        <Route
          path={RegistrationRoute.ROOT}
          component={AuthPageWrapper(AuthRouter)}
        />
        <Route
          path={StaticPagesRoute.ROOT}
          component={StaticPagesWrapper(StaticPagesRouter)}
        />
        <Route path={FaqsRoute.ROOT} component={FaqRouter} />
        <Route path={BlogRoute.ROOT} component={BlogsWrapper} />
        <Route path={howToPlay} component={HowTOPlayPage} />
        <MemoPrivateRoutes hasToken={hasToken} />
      </Switch>
      <InfoModal
        isPrompt={isOpenInfoModal}
        title={modalTitle}
        text={modalText}
        closeEditor={closeInfoModal}
        onOk={onInfoOk}
        modalType={modalType}
      />
      <CookieBanner />
    </InfoModalContext.Provider>
  );
};

export default withRouter(AppRouter);
