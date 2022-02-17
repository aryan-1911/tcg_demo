import { StaticPagesRoute } from 'const';
import { COLORS } from 'const/colors';
import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { Link } from 'react-router-dom';

import './cookie-banner.scss';

function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      cookieName="cookieName"
      style={{ background: COLORS.BLACK }}
      buttonText="I AGREE"
      buttonStyle={{
        color: COLORS.WHITE,
        fontSize: '16px',
        background: COLORS.RED,
        padding: '15px 25px 14px',
        fontWeight: '700',
        borderRadius: '12px',
        textTransform: 'uppercase',
      }}
      expires={365}
    >
      We use cookies to ensure you get the best experience. By using our website
      you agree to our{' '}
      <Link to={StaticPagesRoute.COOKIE_POLICY}>Cookies Policy</Link>
    </CookieConsent>
  );
}

export default CookieBanner;
