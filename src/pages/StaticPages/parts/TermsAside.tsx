import { Icon } from '@material-ui/core';
import BlackLogo from 'assets/images/black_logo.svg';
import { Button } from 'Components/common/form';
import { LandingPageRouter, MatchesRoute, StaticPagesRoute } from 'const';
import { useAsideMenu } from 'hooks';
import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import '../terms-condition-wrapper.scss';
import { ITermsPage } from '../TermsConditionsPage';

interface ITermsAside {
  content: ITermsPage;
}

export const TermsAside = (props: ITermsAside) => {
  const location = useLocation();
  const history = useHistory();
  const isTermPage = location.pathname === StaticPagesRoute.TERMS;

  const { content } = props;

  const { isOpen, toggle } = useAsideMenu({
    breakpoint: 1000,
    asideClassName: 'terms_condition-aside',
  });

  useEffect(() => {
    const hash = location.hash;
    const container = document.getElementById(hash.substr(1));
    if (hash && container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  const renderItem = ({ path, text }: { path: string; text: string }) => {
    const isActive = location.pathname === path;

    const renderSubMenu = () => {
      if (isTermPage && isActive) {
        return (
          <div className="sub-menu">
            {content.terms.length &&
              content.terms.map(({ title }, index: number) => (
                <ScrollLink
                  to={`terms-anchor-${index}`}
                  key={title}
                  spy={true}
                  smooth={true}
                  duration={500}
                  activeClass="active"
                >
                  {++index}. <span>{title}</span>
                </ScrollLink>
              ))}
          </div>
        );
      }
    };

    return (
      <li className={isActive ? 'is-active' : ''}>
        <Link to={path}>{text}</Link>
        {/* {renderSubMenu()} */}
      </li>
    );
  };

  return (
    <div className="terms_condition-aside adaptive-aside">
      <Button
        onClick={() => toggle(!isOpen)}
        className="terms_condition-aside__burger adaptive-aside__burger"
      >
        <Icon className="icon-menu" />
      </Button>
      <div className="terms_condition-aside__box adaptive-aside__box">
        <div className="terms_condition-logo">
          <Link to={LandingPageRouter.ROOT}>
            <img src={BlackLogo} alt="Logo" />
          </Link>
        </div>
        <div className="terms-aside-wrapper">
          <nav className="terms-aside-nav">
            <ul className="terms-aside-list">
              {renderItem({
                path: StaticPagesRoute.TERMS,
                text: 'Terms & Conditions',
              })}
              {renderItem({
                path: StaticPagesRoute.PRIVACY_POLICY,
                text: 'Privacy Policy',
              })}
              {renderItem({
                path: StaticPagesRoute.COOKIE_POLICY,
                text: 'Cookie Policy',
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
