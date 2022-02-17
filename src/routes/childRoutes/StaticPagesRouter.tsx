import { StaticPagesRoute } from 'const';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';


const NotFoundPage = React.lazy(() => import('pages/NotFound/NotFoundPage'));
const TermsConditionsPage = React.lazy(
  () => import('pages/StaticPages/TermsConditionsPage'),
);
const PrivacyPolicyPage = React.lazy(
  () => import('pages/StaticPages/PrivacyPolicyPage'),
);
const CookiePolicyPage = React.lazy(
  () => import('pages/StaticPages/CookiePolicyPage'),
);
const DefaultStaticPage = React.lazy(
  () => import('pages/StaticPages/DefaultStaticPage'),
);
const StaticPagesRouter = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route
        exact
        path={StaticPagesRoute.TERMS}
        render={() => <TermsConditionsPage />}
        // component={renderTerms}
      />
      <Route
        exact
        path={StaticPagesRoute.PRIVACY_POLICY}
        component={PrivacyPolicyPage}
        // component={RenderPrivacyPolicyContent}
      />
      <Route
        exact
        path={StaticPagesRoute.COOKIE_POLICY}
        component={CookiePolicyPage}
        // component={renderCookieContent}
      />

      <Route component={NotFoundPage} />
    </Switch>
  </Suspense>
);

export default StaticPagesRouter;
