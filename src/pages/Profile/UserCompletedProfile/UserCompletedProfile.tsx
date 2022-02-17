import { Icon, Switch } from '@material-ui/core';
import { allowChallengeAction, applyForAffiliationAction, blockUserAction } from 'actions';
import { Avatar } from 'Components/common/Avatar';
import { CopyButton } from 'Components/common/CopyButton';
import { Button } from 'Components/common/form';
import { MatchCard } from 'Components/MatchCard';
import WonBalance from 'Components/WonBalance';
import { gameTypeServerLabels, MatchesRoute, ProfileRoute } from 'const';
import { CreateMathModalContext, InfoModalContext } from 'context';
import { birthDayDateFormat, isFullProfileUser, makeSelector } from 'helpers';
import { useFormInModal } from 'hooks';
import {
  IMatch,
  ISpecificProfileResp,
  IUserProfileResp,
  MatchList
} from 'interfaces';
import { MatchDetail } from 'pages/Matches/Components';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { MatchesReducerState } from 'reducers';
import { inGameNames } from '../../ComponentsPage/staticData';
import DirectChallengeSearchModal from './DirectChallengeSearchModal';
interface IUserCompletedProfile {
  userData: IUserProfileResp | ISpecificProfileResp;
  matchList: MatchList;
  isSpecificPage: boolean;
  myProfileId: string;
  handleRedirect: (path: string) => () => void;
  specificId:string | undefined;
}

export const UserCompletedProfile = (props: IUserCompletedProfile) => {
  const dispatch = useDispatch();
  const {
    userData,
    handleRedirect,
    matchList,
    isSpecificPage,
    myProfileId,
    specificId
  } = props;

  const { isPrompt, closeEditor, openEditor, modalType } = useFormInModal<
    null,
    any
  >([], '');


  const {
    secondModal: { competition },
  } = useSelector<any, MatchesReducerState>(makeSelector(['matchesReducer']));


  const userOnlineOfflineInfo = useSelector<any,any>(makeSelector(['userReducer', 'userOnlineOfflineInfo']));
  
  const { pathname } = useLocation();
  const profileId = pathname.slice(pathname.lastIndexOf('/') + 1);
  
  //online-offline flag : by default will be false.
  let isOnlineFlag = (userOnlineOfflineInfo?.isOnline?.state === 'online')?true:false;


  //TODO: enable-disable direct challenge based on user choice.
  
  //This will be from user's profile info:
  // let wantDirectChallenge = true;

  const {
    balance: currentBalance,
    statistic: { balance: wonBalance },
    isAffiliated,
    isConfirmed,
    referral_code,
    hasActiveAffiliateRequest,
  } = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );
  
  const loading = useSelector(
    makeSelector(['profileReducer', 'affiliateLoading']),
  );

  // const loading = useLoading('profileReducer');

  //Show user's user statistic on their public profile based on their choice : showIncome > true | false > on profile edit.
  //TODO : remove this default value after api has that key
  const {showIncome,statistic:userStatistic,
  } = useSelector(
      makeSelector(['userReducer', 'userData']),
      );
          
  const matches = matchList.data.slice(0, 3);

  const { openInfoModal } = useContext(InfoModalContext);

  // Detail match modal
  const {
    formInitialValues: detailFormInitialValues,
    isPrompt: isDetailPrompt,
    closeEditor: closeDetailEditor,
    openEditor: openDetailEditor,
  } = useFormInModal(matches, 'match');

  const openEditMatchModal = (card: IMatch) => () => {
    openCreateMatchModal({ initialValues: card, cards: matches })();
    closeDetailEditor();
  };

  const openMatchDetailModal = (card: IMatch) => () => {
    openDetailEditor(card)();
  };

  const handleShowAllMatches = () => {
    handleRedirect(MatchesRoute.getSpecificRoute(userData.id))();
  };

  const handleBlockUser = () => {
    dispatch(
      blockUserAction(userData.id, {
        redirect: handleRedirect(MatchesRoute.ROOT),
      }),
    );
  };

  const [isBtnDisable,setIsBtnDisable] = useState(false);

  const handleAffiliation = () => {
    dispatch(applyForAffiliationAction(null, {redirect: ()=>setIsBtnDisable(true)}))
  }
    
  const handleDirectChallenge = () => {
    // On this btn click dispatch createMatchAction
    // Send all the match data that we send when we create a match , just add aditional opponent id in that. 
    // dispatch(
    //   directChallengeAction({id:'test'}, {
    //     redirect: handleRedirect(MatchesRoute.ROOT),
    //   }),
    // );
  }

  const { openCreateMatchModal } = useContext(CreateMathModalContext);

  const renderPrivateInfo = () => {
    if (!isFullProfileUser(userData)) {
      return null;
    }
    const user = userData as IUserProfileResp;

    return (
      <>
        <span className="name">{user.fullname}</span>
        <span className="email">{user.email}</span>
        {
          !isSpecificPage?(
            <>
          <span className="referral-code-info">
            {!!isAffiliated?<span className="info-tip" data-tooltip="Share this code with your followers. When they sign up, deposit money and play first match. You will receive $1 and your friend will get $5. Min deposit of $10 is required.">i</span>:<span className="info-tip" data-tooltip="Share this code with your friends. when they sign up, deposit money and play first match. You and your friend will get $1.">i</span>}
            <span>
              {isAffiliated?'Affiliated':'Referral'} Code : {referral_code?referral_code:'Not found'}<CopyButton
                      className="accept-match-person__game-copy"
                      value={referral_code?referral_code:'Not found'}
                    />
            </span>
            {!!isAffiliated?<Icon  className={`icon-ic_edit`} onClick={handleRedirect(ProfileRoute.EDIT_USER_PROFILE)}/>:null}           
          </span>
          </>
        ):(
          null
          )
        }
        <div className="user-secondary-info">
          <div className="user-secondary-info__element">
            <span className={`icon-calendar`} />
            <span>{birthDayDateFormat(user.birthdate)}</span>
          </div>
          {Boolean(user.phone) && (
            <div className="user-secondary-info__element">
              <span className={`icon-phone`} />
              <span>
                {user.prefix}
                {user.phone}
              </span>
            </div>
          )}
        </div>
      </>
    );
  };

  const { avatar, username, statistic } = userData;

  const isStarted =
    detailFormInitialValues.id === competition?.competition.id &&
    competition?.status !== 'NEW';

  const classGeneral = `user-profile-user-general${
    isSpecificPage ? ` other-profile ${showIncome? ' show':' hide'}` : ' my-profile'
  }`;

  let isAllowChallenge = (userData.allowChallenge === 1)?true:false;
  let handleAllowChallenge = (e) => {
    let isAllow = (e.target.checked === false)?0:1;
    dispatch(
      allowChallengeAction({id:myProfileId,isAllow:isAllow}),
    );
  };

  return (
    <>
      <div className={classGeneral}>
        <div className="user-profile-user-info">
          {!isSpecificPage ? (
            <>
              <div
                className="user-profile-user__edit"
              > <div className="edit-inner-wrap" onClick={handleRedirect(ProfileRoute.EDIT_USER_PROFILE)}>
                    <Icon className="icon-ic_edit" />
                    <span>Edit profile</span>
                </div>
                <Button onClick={openEditor('direct-challange')}>Direct Challenge</Button>            
              </div>
              {isConfirmed?(!!isAffiliated?(
              <>
                <div className="affiliation-button">
                  <span className='affiliation-button-text'>Affiliated</span>                
                </div>                
              </>
              ):<div className="affiliation-button">
                <Button onClick={handleAffiliation} disabled={loading || isBtnDisable || !!hasActiveAffiliateRequest}>Apply for affiliation</Button>
              </div>):null 
              }
            </>           
          ) : <div className="user-direct-challenge">{isAllowChallenge?<Button onClick={openCreateMatchModal()} disabled={!isOnlineFlag}>Direct Challenge</Button>:null}</div>
        }
          <div className="info">
          {!isSpecificPage?<Avatar avatar={avatar} className="user-avatar"/>:<Avatar avatar={avatar} className="user-avatar" isOnline={isOnlineFlag}/>}
          {/* {!isSpecificPage?<Avatar avatar={avatar} className="user-avatar"/>:(isAllowChallenge?<Avatar avatar={avatar} className="user-avatar" isOnline={isOnlineFlag}/>:<Avatar avatar={avatar} className="user-avatar"/>)}             */}
            <span className="user-name">{username}</span>
            {renderPrivateInfo()}
          </div>
          <div className="game-nickenames">
            {inGameNames.map((item) => (
              <div className="game-nickenames__element" key={item.gameName}>
                <span className="game-name">{item.gameName}</span>
                <span className="in-game-name">
                  {userData.nicknames[gameTypeServerLabels[item.key]]}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="user-profile-user-game-stats">
          <div className="user-profile-chart">
            {!(
              isNull(statistic.winPercent) || isNull(statistic.losePercent)
            ) && (
              <PieChart
                series={[statistic.winPercent, statistic.losePercent]}
              />
            )}
          </div>
          <div className="user-profile-games">
            <div className="user-profile-games__won">
              <span>{statistic.wins}</span>
              <span>Games won</span>
            </div>
            <div className="user-profile-games__lost">
              <span>{statistic.loses}</span>
              <span>Games lost</span>
            </div>
          </div>
        </div> */}
        {/* <div className="user-profile-user-game-stats">
        {!isSpecificPage?(
            <div className="direct-challenge-switch-wrap">
              <Switch checked={(isAllowChallenge !== undefined)?isAllowChallenge:true} onChange={handleAllowChallenge} inputProps={{ 'aria-label': 'controlled' }}></Switch>     
              <span className='text-label'>Accept Direct Challenge</span>
            </div>
        ):null}           
          <WonBalance balance={wonBalance} />
          <div className="user-profile-games">
            <div className="user-profile-games__won">
              <span>{statistic.wins}</span>
              <span>Games won</span>
            </div>
          </div>
        </div>   */}
        {
        !isSpecificPage?(
            <div className="user-profile-user-game-stats">
              {!isSpecificPage?(
                <div className="direct-challenge-switch-wrap">
                    <Switch checked={(isAllowChallenge !== undefined)?isAllowChallenge:true} onChange={handleAllowChallenge} inputProps={{ 'aria-label': 'controlled' }}></Switch>     
                    <span className='text-label'>Accept Direct Challenge</span>
                  </div>
              ):null}           
            <WonBalance balance={wonBalance} />
            <div className="user-profile-games">
              <div className="user-profile-games__won">
                <span>{statistic.wins}</span>
                <span>Games won</span>
              </div>
            </div>
          </div>
        ):(
          <>
            {
            (showIncome && isSpecificPage)?(
              <>
              <div className="user-profile-user-game-stats">
                <WonBalance balance={userStatistic?.balance} />
                <div className="user-profile-games">
                  <div className="user-profile-games__won">
                    <span>{userStatistic?.wins}</span>
                    <span>Games won</span>
                  </div>
                </div>
              </div>
              </>
              
              ):null}           
        </>
        )     
      }              
      </div>

      <div className="user-profile-matches">
        <div className="user-profile-matches__top">
          <span className="user-profile-matches__title">
            {isSpecificPage ? 'Match History': 'Match History'}
          </span>
          {Boolean(matches.length) && (
            <Button
              className="user-profile-matches__btn"
              onClick={handleShowAllMatches}
            >
              <>
                SEE ALL
                <Icon className="icon-direction_arrow" />
              </>
            </Button>
          )}
        </div>
        <div className="user-profile-matches-list">
          {matches.map((match) => {
            return (
              <MatchCard
                onClick={openMatchDetailModal(match)}
                key={match.id}
                matchData={match}
                profileId={userData.id}
                myProfileId={myProfileId}
              />
            );
          })}
        </div>
      </div>

      <MatchDetail
        userData={userData}
        initialValues={detailFormInitialValues}
        isPrompt={isDetailPrompt}
        closeEditor={closeDetailEditor}
        openEditMatchModal={openEditMatchModal}
        isStarted={isStarted}
      />
        <DirectChallengeSearchModal
        type={modalType}
        defaultValues={{ username:'' }}
        isPrompt={isPrompt}
        closeEditor={closeEditor}
        disableBackdropClick={true}
      />
    </>
  );
};