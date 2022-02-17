import { DisputeRoute } from 'const';
import DisputePage from 'pages/Dispute/DisputePage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';
import React from 'react';
import { Route, Switch } from 'react-router';


const DisputeRouter = () => {
  return (
    <Switch>
      <Route exact path={DisputeRoute.ROOT} component={DisputePage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default DisputeRouter;
