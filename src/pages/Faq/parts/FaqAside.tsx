import React, { useCallback, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAsideMenu } from 'hooks';
import Logo from 'assets/images/TCG_logo.svg';
import { LandingPageRouter, MatchesRoute } from 'const';
import { Button } from 'Components/common/form';
import { Icon } from '@material-ui/core';
import { IFAQPage } from '../FaqsPageWrapper';
import './faq-aside-styles.scss';

interface IProps {
  content: IFAQPage;
}

function FaqAside(props: IProps) {
  const { faq } = props.content;

  const location = useLocation();
  const history = useHistory();

  const { isOpen, toggle } = useAsideMenu({
    breakpoint: 1000,
    asideClassName: 'faq-aside',
  });

  const handleClick = useCallback(
    (path: string) => (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
      event.preventDefault();
      history.push(path);
    },
    [],
  );

  useEffect(() => {
    const hash = location.hash;
    const container = document.getElementById(hash.substr(1));
    if (hash && container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  const renderItem = ({
    text,
    subElements,
  }: {
    text: string;
    subElements: any;
  }) => {
    const renderSubMenu = () => {
      return (
        <div className="faq-aside-list-element-wrapper">
          {subElements.map((item: { question: string }, index: number) => {
            const count = index + 1;
            const href = `#${item.question}`;
            const isActive = decodeURIComponent(location.hash) === href;

            return (
              <Link
                className={`faq-aside-list-element ${isActive ? 'is-active' : ''
                  }`}
                key={href}
                to={{
                  pathname: location.pathname,
                  hash: href,
                }}
                onClick={handleClick(`${location.pathname}${href}`)}
              >
                <span>
                  {count}. {item.question}
                </span>
              </Link>
            );
          })}
        </div>
      );
    };
    return (
      <>
        <span className="faq-aside-list-element-title">{text}</span>
        {renderSubMenu()}
      </>
    );
  };

  return (
    <div className="aside-wrapper adaptive-aside">
      <Button
        onClick={() => toggle(!isOpen)}
        className="adaptive-aside__burger"
      >
        <Icon className="icon-menu" />
      </Button>
      <div className="adaptive-aside__box">
        <div className="aside-logo">
          <Link to={LandingPageRouter.ROOT}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <nav className="faq-aside-navigation">
          <ul className="faq-aside-list">
            {faq.map((category) => {
              return (
                <li key={category.title}>
                  {renderItem({
                    text: category.title,
                    subElements: category.nestedArray,
                  })}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default FaqAside;
