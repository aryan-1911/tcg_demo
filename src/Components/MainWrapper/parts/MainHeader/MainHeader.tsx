import { Icon } from '@material-ui/core';
import { signOutAction } from 'actions';
import { Avatar } from 'Components/common/Avatar';
import { DropDownMenu, IDropDownOption } from 'Components/common/DropDownMenu';
import { Button } from 'Components/common/form';
import { centrifuge } from 'config/centrifuge';
import { AuthRoute, howToPlay, MatchesRoute, ProfileRoute, RegistrationRoute } from 'const';
import { CreateMathModalContext, InfoModalContext } from 'context';
import { formatPrice, makeSelector, session } from 'helpers';
import { IUserProfileResp } from 'interfaces';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import base from '../../../../base';
import './main-header.scss';

function MainHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { balance, username, avatar,id } = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  let isProfilePage = location.pathname.includes('profile');
  let isBlogPage = location.pathname.includes('blog');
  const hasToken = Boolean(session.getToken());  
  function handleLogout(){
    centrifuge.disconnect();
    centrifuge.removeAllListeners();
    dispatch(signOutAction(null));
    //  update online status of current user to offline at firebase rtd
    if(!!id && id != null && id != undefined ){
      localStorage.setItem('userId', '');
      let userPostRef = base.post(`${id || localStorage.getItem('userId')}/info`,{
        data:{username:username,isOnline:{last_changed:1641751147661,state:'offline'}},
      })
      return () => {
        base.removeBinding(userPostRef);
      }
    }
  };

  const { openInfoModal } = useContext(InfoModalContext);

  const handleLogoutConfirm = openInfoModal({
      onOk:handleLogout,
      title: 'Are you sure you want to logout?',
      // text: 'Logout yourself off with confirm.',
      type: 'confirm',
    })
  
  const { openCreateMatchModal } = useContext(CreateMathModalContext);

  const menuOptions: IDropDownOption[] = [
    {
      label: 'Profile',
      onClick: () => history.push(ProfileRoute.ROOT),
    },
    {
      label: 'Settings',
      onClick: () => history.push(ProfileRoute.USER_PROFILE_SETTINGS),
    },
    {
      label: 'Logout',
      onClick: handleLogoutConfirm,
    },
  ];

  const hasButton = location.pathname !== MatchesRoute.ROOT;

  return (
    <div className="main-header-wrapper">
      <div className="main-header-button">
        {hasButton && !isBlogPage && (
          !isProfilePage?<Button onClick={openCreateMatchModal()}>Create Match</Button>:null
        )}
      </div>
      <div className="main-header-user-info">

        {/* Hidden for current version */}
        {/* <div className="header-notification">
          <Icon className={`icon-notification_bell`} />
        </div> */}
        {
        !isBlogPage?
          (<>
            <div className="header-balance">
            <Icon className={`icon-dollar_sign`} />
            <div className="balance-block">
              <span className="span-block">
                <span className="amount">{formatPrice(balance, true)}</span>
              </span>
              <span className="balance-text">balance</span>
            </div>
          </div>            
          <div className="header__menu">
          <DropDownMenu
            options={menuOptions}
            button={
              <div className="header-user-info">
                <div className="header-user-info__image">
                  <Avatar avatar={avatar} />
                </div>
                <div className="header-user-info__name">
                  <span>{username}</span>
                </div>
              </div>
            }
            />
        </div>
        </>):<div className="header__menu">
              <ul className="header-nav__list">
                    <li className="header-nav__item">
                      <Link to={howToPlay}
                        className="header-nav__link">How To
                      Play</Link>
                    </li>
                    {
                      hasToken?
                      <>
                      <li className="header-nav__item">
                        <Link onClick={handleLogout} to={AuthRoute.ROOT} className='btn btn-red'>Logout</Link>
                      </li>                      
                      </>:<>
                      <li className="header-nav__item">
                        <Link target="_blank" to={AuthRoute.ROOT} className=
                        "header-nav__link">Sign In</Link>
                      </li>
                      <li className="header-nav__item">
                        <Link target="_blank" to={RegistrationRoute.ROOT} className=
                        "header-nav__link btn btn-red">Sign UP</Link>
                      </li></>
                    }
                  </ul>
        </div>}
      </div>
    </div>
  );
}

export default MainHeader;
