import React from 'react';
import { Route, Switch } from 'react-router';

import { MatchesRoute } from 'const';
import { MatchesPage, UserMatches } from 'pages/Matches';
import NotFoundPage from 'pages/NotFound/NotFoundPage';

const MatchesRouter = () => {
  return (
    <Switch>
      <Route exact path={MatchesRoute.ROOT} component={MatchesPage} />
      <Route exact path={MatchesRoute.SPECIFIC} component={UserMatches} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default MatchesRouter;
