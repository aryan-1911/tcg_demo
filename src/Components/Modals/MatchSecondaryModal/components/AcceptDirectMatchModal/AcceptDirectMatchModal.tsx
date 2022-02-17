import { Icon } from '@material-ui/core';
import { acceptMatchAction, declineDirectChallangeAction, deleteMatchAction, getCurrentMatchStateAction, toggleSecondaryMatchModalAction } from 'actions';
import { Avatar } from 'Components/common/Avatar';
import { CopyButton } from 'Components/common/CopyButton';
import { Button } from 'Components/common/form';
import { UniversalExpandModal } from 'Components/common/UniversalExpandModal';
import { MatchCard } from 'Components/MatchCard';
import { ShowToastError } from 'Components/Toast';
import { matchMessages, MessagesRoute } from 'const';
import { InfoModalContext } from 'context';
import { makeSelector } from 'helpers';
import { IUserProfileResp } from 'interfaces';
import { ICentrifugeAcceptMatch } from 'interfaces/centrifuge/match';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IMatchSecondaryModalProps } from '../..';
import './accept-match-modal.scss';


export const AcceptDirectMatchModal = (props: IMatchSecondaryModalProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleClose, handleExpand, secondModal, userId } = props;

  // console.log('userId at acceptDirectMatch Modal',userId);

  const userData = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const { balance } = userData;

  const { type, isCollapse, competition } = secondModal;
  const isVisible = Boolean(type);
  const { openInfoModal } = useContext(InfoModalContext);

  if (!competition || !isVisible) return null;

  //@ts-ignore
  let isOwnerCheck = competition?.competition?.userCreator?.id === userId;
  const handleMessage = () => {
    history.push(
      `${MessagesRoute.getSendMessageRoute(
        //@ts-ignore
        competition.competition.userOpponent.username,
      )}`,
    );
    handleClose();
  };


  const onLeave = () => {
    if (isOwnerCheck) {
      dispatch(deleteMatchAction(competition.competition.id, {
        redirect: () => {
          dispatch(
            toggleSecondaryMatchModalAction({
              competition: null,
              type: null,
              isCollapse: false,
            }),
          );
        }
      }));
    } else {
      dispatch(declineDirectChallangeAction(competition.competition.id, {
        redirect: () => {
          dispatch(
            toggleSecondaryMatchModalAction({
              competition: null,
              type: null,
              isCollapse: false,
            }),
          );
        }
      }));

    }
  };

  const handleLeave = () => {
    // const { isOwner } = competition;
    return openInfoModal({
      onOk: onLeave,
      title: `${isOwnerCheck ? 'Delete' : 'Leave'} the challenge`,
      type: 'confirm',
    });
  };

  const handleOwnAccept = () => {
    //TODO : Later to update : you will make this req to skip the one extra step.
    // dispatch(
    //   confirmOwnMatchAction({
    //     id: competition.competition.id,
    //     type: 'accept',
    //   },{ redirect:(res) => {
    //     dispatch(
    //       toggleSecondaryMatchModalAction({
    //         ...secondModal,
    //         type: MatchSecondaryModalTypes.match_started,
    //       }),
    //     ); 
    //     dispatch(getCurrentMatchStateAction(competition.competition.id));
    //     // handleClose();
    //   }
    // }),
    // );


    let entryAmount = competition?.competition?.entry;
    // Validation by balance and if Insufficient funds on okay delete the direct challenge.
    if (balance < entryAmount) {
      ShowToastError({
        title: matchMessages.BALANCE_ERROR,
        onClick: onLeave,
      });
      return;
    }

    //This is regular popup flow : one additional step.
    dispatch(acceptMatchAction(competition.competition.id, {
      redirect: (res) => {
        // console.log("accept match dispatch res: ", res);
        dispatch(getCurrentMatchStateAction(res, { redirect: () => console.log('someone') }))
        // closeEditor()
      }
    }));

  };

  const renderButtons = (isReady: boolean) => {
    // const { isOwner } = competition;
    let isOwner = true;
    if (isOwnerCheck) {
      return (
        <>
          <Button
            preffix={<Icon className="icon-close" />}
            btnStyle="white"
            onClick={handleLeave()}
          >
            Delete Challenge
          </Button>
          <Button
            preffix={<Icon className="icon-message-voice" />}
            btnStyle="white-fill"
            onClick={handleMessage}
          >
            send message
          </Button>
        </>
      );
    }

    return (
      <>
        {/* For decline we will have another api which will delete the match for both user. */}
        <Button btnStyle="white" onClick={handleLeave()}>
          Decline
        </Button>
        {/* for accept just call same api we call at first accept. */}
        <Button btnStyle="red" onClick={() => handleOwnAccept()}>
          accept
        </Button>
      </>
    );
  };

  const renderPersonControl = (
    user: ICentrifugeAcceptMatch['competition']['createdBy'],
    isReady: boolean,
  ) => {
    const { avatar, username, gamename, id } = user;
    //@ts-ignore
    const { userOpponent } = competition?.competition;
    // console.log('userOpponent',userOpponent);

    const directChallengeId = competition?.competition?.id;

    return (
      <div
        className={`accept-match-person direct-challange-details-wrap ${isReady ? 'accept-match-person--ready' : ''
          }`}
      >
        <div className="accept-match-person__avatar">
          <Avatar avatar={avatar} />
        </div>
        <span className="accept-match-person__name" title={username}>{isOwnerCheck ? username : userOpponent.username}</span>
        <span className="accept-match-person__status">
          {isOwnerCheck ? (`Sent Direct challenge to ${userOpponent.username}`) : `Got Direct Challenge from ${username}`}
        </span>
        <span className="accept-match-person__game">
          <span className="accept-match-person__game-text">Opponent In-game name:</span>
          <span className="accept-match-person__game-value">{isOwnerCheck ? userOpponent.username : username}</span>
          <CopyButton
            className="accept-match-person__game-copy"
            value={isOwnerCheck ? userOpponent.username : username}
          />
        </span>
        <span className="accept-match-person__game">
          <span className="accept-match-person__game-text">Direct Challenge Id:</span>
          <span className="accept-match-person__game-value">{directChallengeId}</span>
          <CopyButton
            className="accept-match-person__game-copy"
            value={directChallengeId}
          />
        </span>
        <div className="accept-match-person__button direct-challange-buttons">
          {renderButtons(isReady)}
        </div>
      </div>
    );
  };

  const renderBottom = () => {
    return (
      <div className="accept-match__bottom accept-match__bottom--full">
        <div className="accept-match__bottom-col">
          {renderPersonControl(competition.competition.createdBy, true)}
        </div>
      </div>
    );
  };

  return (
    <UniversalExpandModal
      visible={isVisible}
      isCollapse={isCollapse}
      title="Direct Challenge"
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
