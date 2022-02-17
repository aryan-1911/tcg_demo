import { toggleSecondaryMatchModalAction } from 'actions';
import { CopyButton } from 'Components/common/CopyButton';
import { CountDownTimer } from 'Components/common/CountDownTimer';
import { Button } from 'Components/common/form';
import { UniversalExpandModal } from 'Components/common/UniversalExpandModal';
import { WAIT_MATCH_START } from 'const';
import { addMinutes, getTime } from 'date-fns';
import { makeSelector } from 'helpers';
import { MatchSecondaryModalTypes } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMatchSecondaryModalProps } from '../../';
import './match-started-modal.scss';


export const MatchStartedModal = (props: IMatchSecondaryModalProps) => {
  const dispatch = useDispatch();
  const { handleClose, handleExpand, secondModal } = props;

  const diffSystemTime = useSelector<any, number>(
    makeSelector(['profileReducer', 'diffSystemTime']),
  );

  const [isExpared, setExpare] = useState(false);

  const { isCollapse, type, competition } = secondModal;
  const isVisible = Boolean(type);

    // console.log('MatchStartedModals econdModal',secondModal);

  useEffect(() => {
    const waitTime = started
      ? addMinutes(new Date(started), WAIT_MATCH_START)
      : 0;

    setExpare(+new Date() > +waitTime);
  }, [secondModal]);

  const handleAccept = () => {
    dispatch(
      toggleSecondaryMatchModalAction({
        ...secondModal,
        type: MatchSecondaryModalTypes.match_result,
      }),
    );
  };

  if (!competition || !isVisible) return null;

  const {
    isOwner,
    competition: { id, acceptedBy, createdBy, started },
  } = competition;
  const opponentGameName = isOwner ? acceptedBy.gamename : createdBy.gamename;

  const waitTime = started
    ? addMinutes(getTime(new Date(started)) + diffSystemTime, WAIT_MATCH_START)
    : 0;

  const renderButtom = () => {
    const renderButtons = () => {
      return (
        <div className="match-started-modal__buttons">
          <span className="match-started-modal__bottom-title">
            Good luck in your match!
          </span>
          <Button onClick={handleAccept}>Submit results</Button>
        </div>
      );
    };

    return (
      <div className="match-started-modal__bottom">
        {!isExpared && (
          <span className="match-started-modal__bottom-title">
            Wait {WAIT_MATCH_START} minutes before you can submit your results.
          </span>
        )}
        <CountDownTimer
          date={waitTime}
          afterContent={renderButtons()}
          onComplete={() => setExpare(true)}
        />{' '}
      </div>
    );
  };

  return (
    <UniversalExpandModal
      visible={isVisible}
      isCollapse={isCollapse}
      title="Active Match"
      secondTitle="match has started"
      onCancel={handleClose}
      onExpand={handleExpand}
      className="secondary-modal"
    >
      <div className="match-started-modal">
        <span className="match-started-modal__text">
          Go outside the platform and start playing the chosen game. When the
          match is over, <span>do not forget to submit your results!</span>
        </span>
        <span className="match-started-modal__id">
          Match ID:
          <span>
            {id.slice(0, 5)}...
            <CopyButton className="accept-match-person__game-copy" value={id} />
          </span>
        </span>
        <span className="match-started-modal__opponent">
          Your opponent’s in-game name:
          <span>
            {opponentGameName}
            <CopyButton
              className="accept-match-person__game-copy"
              value={opponentGameName}
            />
          </span>
        </span>
        {renderButtom()}
      </div>
    </UniversalExpandModal>
  );
};
