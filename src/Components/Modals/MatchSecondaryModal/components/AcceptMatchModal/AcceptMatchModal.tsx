import { Icon } from '@material-ui/core';
import { confirmOwnMatchAction, getCurrentMatchStateAction, toggleSecondaryMatchModalAction } from 'actions';
import { Avatar } from 'Components/common/Avatar';
import { CopyButton } from 'Components/common/CopyButton';
import { Button } from 'Components/common/form';
import { UniversalExpandModal } from 'Components/common/UniversalExpandModal';
import { MatchCard } from 'Components/MatchCard';
import { MessagesRoute } from 'const';
import { InfoModalContext } from 'context';
import { MatchSecondaryModalTypes } from 'interfaces';
import { ICentrifugeAcceptMatch } from 'interfaces/centrifuge/match';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IMatchSecondaryModalProps } from '../..';
import './accept-match-modal.scss';


export const AcceptMatchModal = (props: IMatchSecondaryModalProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleClose, handleExpand, secondModal, userId } = props;


  const { type, isCollapse, competition } = secondModal;
  const isVisible = Boolean(type);
  const { openInfoModal } = useContext(InfoModalContext);

  if (!competition || !isVisible) return null;

  const handleMessage = () => {
    history.push(
      `${MessagesRoute.getSendMessageRoute(
        competition.competition.createdBy.username,
      )}`,
    );
    handleClose();
  };

  const onLeave = () => {
    dispatch(
      confirmOwnMatchAction({
        id: competition.competition.id,
        type: 'decline',
      }, {
        redirect: (res) => {
          //If player or owner leave or decline the match , modal will disapear. 
          dispatch(
            toggleSecondaryMatchModalAction({
              ...secondModal,
              type: MatchSecondaryModalTypes.null,
            }),
          );
        }
      }),
    );
  };

  const handleLeave = () => {
    return openInfoModal({
      onOk: onLeave,
      title: 'Leave the match',
      type: 'confirm',
    });
  };

  const handleOwnAccept = () => {
    dispatch(
      confirmOwnMatchAction({
        id: competition.competition.id,
        type: 'accept',
      }, {
        redirect: (res) => {
          dispatch(
            toggleSecondaryMatchModalAction({
              ...secondModal,
              type: MatchSecondaryModalTypes.match_started,
            }),
          );
          dispatch(getCurrentMatchStateAction(competition.competition.id));
          // handleClose();
        }
      }),
    );
  };

  const renderButtons = (isReady: boolean) => {
    const { isOwner } = competition;

    if (!isOwner) {
      return isReady ? (
        <Button
          preffix={<Icon className="icon-close" />}
          btnStyle="white"
          onClick={handleLeave()}
        >
          Leave Match
        </Button>
      ) : (
        <Button
          preffix={<Icon className="icon-message-voice" />}
          btnStyle="white-fill"
          onClick={handleMessage}
        >
          send message
        </Button>
      );
    }

    return (
      <>
        <Button btnStyle="white" onClick={handleLeave()}>
          Decline
        </Button>
        <Button btnStyle="red" onClick={handleOwnAccept}>
          accept
        </Button>
      </>
    );
  };

  const renderPersonControl = (
    user: ICentrifugeAcceptMatch['competition']['acceptedBy'],
    isReady: boolean,
  ) => {
    const { avatar, username, gamename, id } = user;
    const { isOwner } = competition;

    return (
      <div
        className={`accept-match-person ${isReady ? 'accept-match-person--ready' : ''
          }`}
      >
        <div className="accept-match-person__avatar">
          <Avatar avatar={avatar} />
        </div>
        <span className="accept-match-person__name" title={username}>{username}</span>
        <span className="accept-match-person__status">
          {!isOwner ? (
            <>
              <Icon className={`icon-${isReady ? 'ready' : 'waiting'}-label`} />
              {isReady ? 'ready' : 'Waiting'}
            </>
          ) : (
            'accepted your match'
          )}
        </span>
        <span className="accept-match-person__game">
          <span className="accept-match-person__game-text">In-game name:</span>
          <span className="accept-match-person__game-value">{gamename}</span>
          {!isReady && (
            <CopyButton
              className="accept-match-person__game-copy"
              value={gamename}
            />
          )}
        </span>
        <div className="accept-match-person__button">
          {renderButtons(isReady)}
        </div>
      </div>
    );
  };

  const renderBottom = () => {
    const { isOwner } = competition;
    if (isOwner) {
      return (
        <div className="accept-match__bottom accept-match__bottom--full">
          <div className="accept-match__bottom-col">
            {renderPersonControl(competition.competition.acceptedBy, false)}
          </div>
        </div>
      );
    }
    return (
      <div className="accept-match__bottom">
        <div className="accept-match__bottom-col">
          {renderPersonControl(competition.competition.acceptedBy, true)}
        </div>
        <div className="accept-match__bottom-col">
          {renderPersonControl(competition.competition.createdBy, false)}
        </div>
      </div>
    );
  };

  return (
    <UniversalExpandModal
      visible={isVisible}
      isCollapse={isCollapse}
      title="Waiting for players"
      secondTitle="Current Match"
      onCancel={handleClose}
      onExpand={handleExpand}
    >
      <div className="accept-match">
        <MatchCard
          matchData={competition.competition}
          isCutVersion
          profileId={userId}
        />
        {renderBottom()}
      </div>
    </UniversalExpandModal>
  );
};
