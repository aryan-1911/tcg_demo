import React from 'react';
import { Route, Switch } from 'react-router';

import { DepositRoute } from 'const';
import DepositPage from 'pages/Deposit/DepositPage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';

const DepositRouter = () => {
  return (
    <Switch>
      <Route exact path={DepositRoute.ROOT} component={DepositPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default DepositRouter;
