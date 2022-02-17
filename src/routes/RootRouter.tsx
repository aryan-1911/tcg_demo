import {
  AuthRoute, ChatRoomRoute, ContactsRoute, DepositRoute, DisputeRoute, LandingPageRouter, LeaderboardRoute, MatchesRoute, MessagesRoute, PodsRoute, ProfileRoute, SpecialEventsRoute
} from 'const';
import ChatRoomPage from 'pages/ChatRoom/ChatRoomPage';
import LeaderboardPage from 'pages/Leaderboard/LeaderboardPage';
import PodsPage from 'pages/Pods/PodsPage';
import SpecialEventsPage from 'pages/SpecialEvents/SpecialEventsPage';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';



const NotFoundPage = React.lazy(() => import('pages/NotFound/NotFoundPage'));

const MatchesRouter = React.lazy(() => import('./childRoutes/MatchesRouter'));
const MessagesRouter = React.lazy(() => import('./childRoutes/MessagesRouter'));
const DisputeRouter = React.lazy(() => import('./childRoutes/DisputeRouter'));
const ProfileRouter = React.lazy(() => import('./childRoutes/ProfileRouter'));
const DepositRouter = React.lazy(() => import('./childRoutes/DepositRouter'));
const ContactsRouter = React.lazy(() => import('./childRoutes/ContactsRouter'));
const Events = React.lazy(() => import('pages/landingPage/event'));

const RootRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path={MatchesRoute.ROOT} component={MatchesRouter} />
        <Route path={PodsRoute.ROOT} component={PodsPage} />
        <Route path={LeaderboardRoute.ROOT} component={LeaderboardPage} />
        <Route path={ChatRoomRoute.ROOT} component={ChatRoomPage} />
        <Route path={SpecialEventsRoute.ROOT} component={SpecialEventsPage} />
        <Route path={MessagesRoute.ROOT} component={MessagesRouter} />
        <Route path={DisputeRoute.ROOT} component={DisputeRouter} />
        <Route path={ProfileRoute.ROOT} component={ProfileRouter} />
        <Route path={DepositRoute.ROOT} component={DepositRouter} />
        <Route path={ContactsRoute.ROOT} component={ContactsRouter} />
        <Route path={LandingPageRouter.ROOT} component={Events} />
        <Redirect exact from={AuthRoute.ROOT} to={LandingPageRouter.ROOT} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};

export default RootRouter;
