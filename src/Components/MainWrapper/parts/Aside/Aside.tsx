import { Icon } from '@material-ui/core';
import Logo from 'assets/images/TCG_logo.svg';
import { Button } from 'Components/common/form';
import {
  ChatRoomRoute,
  ContactsRoute, DepositRoute,
  DisputeRoute, FaqsRoute, LandingPageRouter, MatchesRoute, MessagesRoute, ProfileRoute, SpecialEventsRoute, StaticPagesRoute
} from 'const';
import { session } from 'helpers';
import { useAsideMenu } from 'hooks';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './aside.scss';


interface IAsideProps {
  currPath: string;
  unreadCounts: number;
  isAdmin: boolean;
}

function Aside(props: IAsideProps) {
  const { currPath, unreadCounts, isAdmin } = props;
  const history = useHistory();

  const { isOpen, toggle } = useAsideMenu({
    breakpoint: 1000,
    asideClassName: 'aside',
  });

  const handlerHomeRedirection = () => {
    history.push(LandingPageRouter.ROOT);
  };

  const isLoggedIn = Boolean(session.getToken());

  const renderItem = ({
    ico,
    path,
    text,
  }: {
    ico?: string;
    path: string;
    text: string;
  }) => {
    const isActive = currPath === path;

    return (
      <li className={isActive ? 'is-active' : ''}>
        <Link to={path} className="menu-link">
          {ico && <Icon className={`icon-${ico}`} />}
          <span>{text}</span>
        </Link>
      </li>
    );
  };

  return (
    <aside className="aside aside-container">
      <div className="aside__box">
        <div className="aside__cont">
          <header className="aside-header aside-container">
            <div className="aside-logo" onClick={handlerHomeRedirection}>
              <img src={Logo} alt="" />
            </div>
            <Button onClick={() => toggle(!isOpen)} className="aside__burger">
              <Icon className="icon-menu" />
            </Button>
          </header>
          {isLoggedIn ?
            <nav className="nav">
              <ul className="nav__list">
              {renderItem({
                  ico: 'home',
                  path: LandingPageRouter.ROOT,
                  text: 'Home',
                })}
                {renderItem({
                  ico: 'matches',
                  path: MatchesRoute.ROOT,
                  text: '1v1 Matches',
                })}
                {/* {renderItem({
              ico: 'pods',
              path: PodsRoute.ROOT,
              text: 'Pods',
            })} */}
                {renderItem({
                  ico: 'tournaments',
                  path: SpecialEventsRoute.ROOT,
                  text: 'Tournaments',
                })}
                {/* {renderItem({
              ico: 'leaderboard',
              path: LeaderboardRoute.ROOT,
              text: 'Leaderboard',
            })}                               */}
                {renderItem({
                  ico: 'chat-room',
                  path: ChatRoomRoute.ROOT,
                  text: 'Chat Room',
                })}
                {renderItem({
                  ico: 'messages',
                  path: MessagesRoute.ROOT,
                  text: `Messages ${unreadCounts ? `(${unreadCounts})` : ''}`,
                })}
                {renderItem({
                  ico: 'dispute',
                  path: DisputeRoute.ROOT,
                  text: 'Disputes',
                })}
                {renderItem({
                  ico: 'profile',
                  path: ProfileRoute.ROOT,
                  text: 'Profile',
                })}
                {renderItem({
                  ico: 'deposit',
                  path: DepositRoute.ROOT,
                  text: 'Deposit & Withdraw',
                })}
              </ul>
            </nav> : null
          }
          <footer className={`aside-footer ${isLoggedIn ? '' : 'out'}`}>
            <nav className="general-info-links-wrapper">
              <ul className="general-info-links">
                {isLoggedIn ?
                  <>
                    {renderItem({
                      path: FaqsRoute.ROOT,
                      text: 'FAQ',
                    })}
                    {renderItem({
                      path: ContactsRoute.ROOT,
                      text: 'Contact US',
                    })}
                  </> : null
                }
                {renderItem({
                  path: StaticPagesRoute.TERMS,
                  text: 'Terms & Conditions',
                })}
                {/* {isAdmin && (
                  <li>
                    <a
                      href={`${
                        AppConfig.ADMIN_URL
                      }/login/${session.getToken()}`}
                      target="_blank"
                    >
                      <span>Admin Panel</span>
                    </a>
                  </li>
                )} */}
              </ul>
            </nav>
            <p className="copyright">© Copyright {new Date().getFullYear()} TCG Showdown</p>
          </footer>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
