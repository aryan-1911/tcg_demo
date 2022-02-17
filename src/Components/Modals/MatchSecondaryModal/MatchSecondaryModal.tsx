import { toggleSecondaryMatchModalAction } from 'actions';
import { formatPrice, makeSelector } from 'helpers';
import { IUserProfileResp, MatchSecondaryModalTypes } from 'interfaces';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MatchesReducerState } from 'reducers';
import { InfoModal } from '..';
import { AcceptDirectMatchModal } from './components/AcceptDirectMatchModal';
import { AcceptMatchModal } from './components/AcceptMatchModal';
import { MatchStartedModal } from './components/MatchStartedModal';
import { ResultMatchModal } from './components/ResultMatchModal';
import { WaitOpponentModal } from './components/WaitOpponentModal';
import './match-secondary-modal.scss';


export interface IMatchSecondaryModalProps {
  handleClose(callback?: () => void): void;
  handleExpand(): void;
  userId: string;
  secondModal: MatchesReducerState['secondModal'];
  handleOpenModal?: (type: MatchSecondaryModalTypes) => void;
}

export const MatchSecondaryModal = () => {
  const dispatch = useDispatch();
  const { secondModal } = useSelector<any, MatchesReducerState>(
    makeSelector(['matchesReducer']),
  );

  const { id: userId ,activeCompetitionId} = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const handleClose = (callback) => {
    hideModal();
    // callback || callback();
    // callback();

  };

  const hideModal = useCallback(() => {
    dispatch(
      toggleSecondaryMatchModalAction({
        ...secondModal,
        isCollapse: true,
      }),
    );
  }, [dispatch, secondModal.type]);

  const handleExpand = useCallback(() => {
    dispatch(
      toggleSecondaryMatchModalAction({
        ...secondModal,
        isCollapse: false,
      }),
    );
  }, [dispatch, secondModal.type]);

  const handleCloseModal = useCallback(() => {
    dispatch(
      toggleSecondaryMatchModalAction({
        competition: null,
        type: null,
        isCollapse: false,
      }),
    );
  }, [dispatch]);

  const handleCollapceResultModal = useCallback(
    (isCollapse?: boolean) => {
      dispatch(
        toggleSecondaryMatchModalAction({
          ...secondModal,
          isCollapse: isCollapse === undefined ? true : isCollapse,
          type: MatchSecondaryModalTypes.match_result,
        }),
      );
    },
    [dispatch, secondModal.type],
  );

  const handleOpenModal = useCallback(
    (type: MatchSecondaryModalTypes) => {
      dispatch(
        toggleSecondaryMatchModalAction({
          ...secondModal,
          type,
        }),
      );
    },
    [dispatch, secondModal.type],
  );

  if (!Boolean(secondModal.type)) return null;

  const modalProps: IMatchSecondaryModalProps = {
    handleClose,
    handleExpand,
    secondModal,
    userId,
  };

  const renderWon = () => {
    const prize = secondModal.competition?.competition.prize;
    if (!prize) return '';
    return (
      <div className="secondary-modal-won">
        <span className="secondary-modal-won__title">You won</span>
        <div className="game-card-prize">
          <div className="game-card-prize__price">
            <span className="game-card-prize__price-ico">$</span>
            <span className="game-card-prize__price-val">
              {formatPrice(prize, true)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderModals = () => {
    switch (secondModal.type) {
      case MatchSecondaryModalTypes.match_accept:
        return <AcceptMatchModal {...modalProps} />;
      case MatchSecondaryModalTypes.match_started:
        return <MatchStartedModal {...modalProps} />;
      case MatchSecondaryModalTypes.match_result:
        return (
          <ResultMatchModal {...modalProps} handleOpenModal={handleOpenModal} />
        );
      case MatchSecondaryModalTypes.competition_wait_opponent:
        return <WaitOpponentModal {...modalProps} />;
      case MatchSecondaryModalTypes.competition_complete: {
        const isWinnerId = secondModal.competition?.winner?.uuid;
        const isWinner = userId === isWinnerId;
        if (isWinner) {
          return (
            <InfoModal
              onOk={handleCloseModal}
              closeEditor={handleCloseModal}
              modalType="info"
              title="Congratulations!"
              text={renderWon()}
              isPrompt={Boolean(secondModal.type)}
            />
          );
        }

        return (
          <InfoModal
            onOk={handleCloseModal}
            closeEditor={handleCloseModal}
            modalType="info"
            title="Good Game!"
            text="You will get them next time"
            isPrompt={Boolean(secondModal.type)}
          />
        );
      }
      case MatchSecondaryModalTypes.competition_conflict: {
        return (
          <InfoModal
            onOk={() => handleOpenModal(MatchSecondaryModalTypes.match_result)}
            closeEditor={() => handleCollapceResultModal(false)}
            modalType="info"
            title="Attention!"
            text="We noticed that the players gave different match results."
            isPrompt={Boolean(secondModal.type)}
            okTitle="Submit results again"
          />
        );
      }
      case MatchSecondaryModalTypes.competition_dispute:
        return (
          <InfoModal
            onOk={handleCloseModal}
            closeEditor={handleCloseModal}
            modalType="info"
            title="Attention!"
            text={
              <>
                <span>
                  We noticed that the players gave different match results.
                </span>
                <br /> <br />
                <b>Admins will contact you in 24 hours!</b>
              </>
            }
            isPrompt={Boolean(secondModal.type)}
          />
        );
      case MatchSecondaryModalTypes.custom_competition_dispute:
        return (
              <InfoModal
              onOk={handleCloseModal}
              closeEditor={handleCloseModal}
              modalType="info"
              title="Attention!"
              text={
                <>
                  <span>
                  Your opponent has created a dispute for this match. Please contact the admins for more information.
                  </span>
                  <br /> <br />
                  {/* <b>Admins will contact you in 24 hours!</b> */}
                </>
              }
              isPrompt={Boolean(secondModal.type)}
            /> 
        );
      case MatchSecondaryModalTypes.competition_void:
        return null;
      case MatchSecondaryModalTypes.competition_expired:
        return (
              <InfoModal
              onOk={handleCloseModal}
              closeEditor={handleCloseModal}
              modalType="info"
              title="Attention!"
              text={
                <>
                  <span>Your match did not receive any clicks  within 24 hours. It has been deleted, please create a new match or accept an open match.</span>
                  <br /> <br />
                </>
              }
              isPrompt={Boolean(secondModal.type)}
            /> 
        );        
      case MatchSecondaryModalTypes.competition_challenge:{
      //   let activeCompetitionId2 = activeCompetitionId;
      //   let challengeId = secondModal?.competition?.competition?.id;
      //   console.log('activeCompetitionId2,challengeId',activeCompetitionId2,challengeId);
      //   let isOpponent = challengeId !== activeCompetitionId2;  
      //   if(isOpponent){        
      //     return (
      //     <InfoModal
      //     //@ts-ignore
      //     onOk={() => dispatch(toggleDetailMatchAction(secondModal?.competition?.competition))}
      //     closeEditor={handleCloseModal}
      //     modalType="info"
      //     title="Direct Challenge!"
      //     text={
      //       <>
      //         <br />
      //         <span>
      //         {secondModal?.competition?.competition.createdBy.username} has created a direct challange to you.
      //         </span>
      //       </>
      //     }
      //     isPrompt={Boolean(secondModal.type)}
      //   /> 
      //   );
      // }else{
      //   return null;
      // }
      return <AcceptDirectMatchModal {...modalProps} />;
    }
      default:
        return null;
    }
  };

  return renderModals();
};
