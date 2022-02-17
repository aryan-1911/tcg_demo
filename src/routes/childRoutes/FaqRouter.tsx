import React from 'react';
import { Route, Switch } from 'react-router';
import { FaqsRoute } from 'const';
import NotFoundPage from 'pages/NotFound/NotFoundPage';
import { FaqsPageWrapper } from 'pages/Faq/FaqsPageWrapper';

const FaqRouter = () => {
  return (
    <Switch>
      <Route path={FaqsRoute.ROOT} component={FaqsPageWrapper} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default FaqRouter;
