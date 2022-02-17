import { Icon } from '@material-ui/core';
import { acceptMatchAction, deleteMatchAction, getCurrentMatchStateAction } from 'actions';
import { Avatar } from 'Components/common/Avatar';
import { CopyButton } from 'Components/common/CopyButton';
import { Button } from 'Components/common/form';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { ShowToastError } from 'Components/Toast';
import {
  FORMAT_DATE_WITH_TIME_CST,
  gameTypeLables,
  gameTypeServerLabels,
  matchFormatLables,
  matchMessages,
  matchTypeLables,
  ProfileRoute
} from 'const';
import { InfoModalContext } from 'context';
import {
  formatDateWithFormat, formatPrice,
  getWinLabel,
  isFullProfileUser,
  makeSelector
} from 'helpers';
import { useRedirectToUserProfile } from 'hooks/useRedirectToUserProfile';
import {
  IMatch,
  ISpecificProfileResp,
  IUserProfileResp,
  MatchStatus
} from 'interfaces';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './match-detail.scss';


interface IMatchDetail {
  initialValues: IMatch;
  isPrompt: boolean;
  userData: IUserProfileResp | ISpecificProfileResp;
  closeEditor(): void;
  openEditMatchModal: (card: IMatch) => () => void;
  isStarted: boolean;
  specProfileId?: string;
}

export const MatchDetail = (props: IMatchDetail) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isPrompt,
    closeEditor,
    initialValues,
    userData,
    openEditMatchModal,
    isStarted = false,
    specProfileId,
  } = props;

  const { id: myProfileId } = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );


  const { openInfoModal } = useContext(InfoModalContext);

  const { handleRedirectToUser } = useRedirectToUserProfile();

  if (!Object.keys(initialValues).length) return null;

  let balance = 0;

  const { id: openedProfileId, activeCompetitionId } = userData;

  const profileId = specProfileId || openedProfileId;

  if (isFullProfileUser(userData)) {
    balance = (userData as IUserProfileResp).balance;
  }

  const {
    id,
    game,
    format,
    type,
    avatar,
    username,
    prize,
    gamename,
    entry,
    rule,
    userId,
    created: { date },
    status,
    winner,
    onDispute,
    partnerAvatar,
    partnerUsername,
    partnerUserId,
    partnerGamename,
  } = initialValues;

  const isOwn = userId === profileId;

  const isMyProfile = myProfileId === profileId;

  const renderWinLabel = () => {
    const label = getWinLabel(profileId, winner, onDispute,status);

    if (label) {
      return <span className={`game-card__label ${label}`}>{label}</span>;
    }
  };

  const haveIngameName = Boolean(
    userData.nicknames[gameTypeServerLabels[game]],
  );

  const isOpen = status === MatchStatus.open;

  const canEdit = isMyProfile && isOwn && isOpen && !isStarted;

  const canAccept = !activeCompetitionId && !isOwn && !winner && isOpen;

  const handleAccept = () => {
    if (balance < entry) {
      ShowToastError({
        title: matchMessages.BALANCE_ERROR,
      });
      closeEditor();
      return;
    }
    if (!haveIngameName) {
      ShowToastError({
        title: matchMessages.EMPTY_INGAME_NAME.title,
        subtitle: matchMessages.EMPTY_INGAME_NAME.subtitle,
        btnTitle: 'Go',
        onClick: () => history.push(ProfileRoute.EDIT_USER_PROFILE),
      });
      closeEditor();
      return;
    }
    dispatch(acceptMatchAction(id, { redirect: (res)=>{
      dispatch(getCurrentMatchStateAction(res, { redirect: () => console.log('someone')}))
      closeEditor()
    } }));
    // dispatch(acceptMatchAction(id, { redirect: closeEditor }));
  };

  const handleDelete = () => {
    dispatch(deleteMatchAction(id, { redirect: closeEditor }));
  };

  const partnerName = status && isOwn ? partnerUsername : username;
  const partnerAva = status && isOwn ? partnerAvatar : avatar;
  const partnerId = status && isOwn ? partnerUserId : userId;
  const isSelfAva = myProfileId === partnerId;
  const redirectData = {
    isSelf: isSelfAva,
    userId: partnerId,
    callback: closeEditor,
  };

  return (
    <UniversalModal
      visible={isPrompt}
      onCancel={closeEditor}
      className="match-detail-modal"
    >
      <div className="match-detail-modal__header">
        <div className="game-card__info">
          <span className="game-card__name">
            {gameTypeLables[game]} {renderWinLabel()}
          </span>
          <div className="game-card-edit">
            <div className="game-card-types">
              <span className="game-card-types__text">
                {matchFormatLables[format]}
              </span>
              <span className="game-card-types__text">
                {matchTypeLables[type]}
              </span>
            </div>
            {canEdit && (
              <div className="game-card-edit__buttons">
                <Button
                  preffix={<Icon className="icon-trash" />}
                  onClick={openInfoModal({
                    onOk: handleDelete,
                    title: 'delete match',
                    type: 'delete',
                  })}
                >
                  Delete
                </Button>
                <Button
                  preffix={<Icon className="icon-ic_edit" />}
                  onClick={openEditMatchModal(initialValues)}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        </div>
        <Button
          className="match-detail-modal__header-close universal-modal__header-close"
          onClick={closeEditor}
        >
          <Icon className="icon-RedX" />
        </Button>
      </div>
      <div className="match-detail-modal__content">
        <div className="match-detail-modal__row">
          <div
            className="game-card-author"
            onClick={(e) => handleRedirectToUser(e, redirectData)}
          >
            <div className="game-card-author__avatar">
              <Avatar avatar={partnerAva} />
            </div>
            <div className="game-card-author__cont">
              <span className="game-card-author__name">{partnerName}</span>
              <span className="game-card-author__time">
                {/* {formatFn(FORMAT_DATE_WITH_TIME)(date)} */}
              {formatDateWithFormat( date,FORMAT_DATE_WITH_TIME_CST)}
              </span>
            </div>
          </div>
          <div className="game-card-prize">
            <div className="game-card-prize__price">
              <span className="game-card-prize__price-ico">$</span>
              <span className="game-card-prize__price-val">
                {formatPrice(prize, false)}
              </span>
            </div>
            <span className="game-card-prize__text">total prize</span>
          </div>
        </div>
        <div className="match-detail-modal__row ingame-wrap">
          <div className="match-detail-modal__ingame">
            {gamename && (
              <>
                <span className="match-detail-modal__title">In-game name</span>
                <span className="match-detail-modal__ingame-name">
                  {gamename}
                  <CopyButton
                    className="accept-match-person__game-copy"
                    value={gamename}
                  />
                </span>              
              </>
            )}
          </div>
          {!isOpen && partnerGamename && (
                  <>
                  <div className="match-detail-modal__ingame">
                    <span className="match-detail-modal__title">Partner In-game name</span>
                    <span className="match-detail-modal__ingame-name">
                      {partnerGamename}
                      <CopyButton
                        className="accept-match-person__game-copy"
                        value={partnerGamename}
                      />
                    </span>
                  </div> 
                  </>
                )} 
          <div className="game-card-entry">
            <span className="game-card-entry__text">Entry:</span>
            <span className="game-card-entry__price">
              <span className="game-card-entry__price-ico">$</span>
              <span className="game-card-entry__price-val">
                {formatPrice(entry, false)}
              </span>
            </span>
          </div>
        </div>
        {rule && (
          <div className="match-detail-modal__row">
            <div className="match-detail-modal__rule">
              <span className="match-detail-modal__title">
                Extra rules / notes
              </span>
              <span className="match-detail-modal__rule-text">{rule}</span>
            </div>
          </div>
        )}
        <div className="match-detail-modal__row">
          <div className="match-detail-modal__id">
            <span className="match-detail-modal__title">Match ID</span>
            <span className="match-detail-modal__rule-text">
              {id.slice(0, 7)}...
              <CopyButton
                className="accept-match-person__game-copy"
                value={id}
              />
            </span>
          </div>
        </div>
        {canAccept && (
          <div className="match-detail-modal__row">
            <Button
              className="match-detail-modal__accept"
              onClick={openInfoModal({
                onOk: handleAccept,
                title: 'Are you sure you want to play?',
                type: 'confirm',
              })}
            >
              Accept Match
            </Button>
          </div>
        )}
      </div>
    </UniversalModal>
  );
};
