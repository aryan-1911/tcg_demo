import React from 'react';
import { Route, Switch } from 'react-router';

import { ContactsRoute } from 'const';
import NotFoundPage from 'pages/NotFound/NotFoundPage';
import { ContactsPage } from 'pages/Contacts/ContactsPage';

const ContactsRouter = () => {
  return (
    <Switch>
      <Route exact path={ContactsRoute.ROOT} component={ContactsPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default ContactsRouter;
