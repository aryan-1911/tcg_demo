import React from 'react';
import { Route, Switch } from 'react-router';

import { MessagesRoute } from 'const';
import MessagesPage from 'pages/Messages/MessagesPage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';

const MessagesRouter = () => {
  return (
    <Switch>
      <Route exact path={MessagesRoute.ROOT} component={MessagesPage} />
      <Route exact path={MessagesRoute.SEND_MESSAGE} component={MessagesPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default MessagesRouter;
