import { useTypedController } from '@hookform/strictly-typed';
import { FormControlLabel, Icon, Radio, RadioGroup } from '@material-ui/core';
import {
  clearMatchResultsAction,
  saveMatchResultsAction,
  sendMatchResultAction
} from 'actions';
import { Avatar } from 'Components/common/Avatar';
import { CopyButton } from 'Components/common/CopyButton';
import { Button } from 'Components/common/form';
import { UniversalExpandModal } from 'Components/common/UniversalExpandModal';
import { MatchCard } from 'Components/MatchCard';
import { DisputeRoute, MessagesRoute, REQUIRED } from 'const';
import { makeSelector, prepareMatchHistory } from 'helpers';
import { MatchResults, MatchSecondaryModalTypes } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IMatchSecondaryModalProps } from '../..';
import './result-match-modal.scss';


export const ResultMatchModal = (props: IMatchSecondaryModalProps) => {
  const currentUserResults = useSelector<any, MatchResults>(
    makeSelector(['matchesReducer', 'currentUserResults']),
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const {
    handleClose,
    handleExpand,
    secondModal,
    userId,
    handleOpenModal,
  } = props;

  const [isModalWaitOpen, openModal] = useState(false);

  useEffect(() => {
    handleOpenModal &&
      isModalWaitOpen &&
      handleOpenModal(MatchSecondaryModalTypes.competition_wait_opponent);
  }, [isModalWaitOpen]);

  const { control, handleSubmit, errors, getValues } = useForm<any>({
    defaultValues: {},
    mode: 'onSubmit',
  });


  const TypedController: any = useTypedController({
    control,
  });

  const { type, isCollapse, competition } = secondModal;
  const isVisible = Boolean(type);

  if (!competition || !isVisible) return null;

  const {
    competition: { id, createdBy, acceptedBy, results, type: matchType },
    isOwner,
  } = competition;


  let disputeDetails =  {
    competition: id,
    game_user_name: isOwner?createdBy?.gamename:acceptedBy?.gamename,
    game_partner_name: isOwner?acceptedBy?.gamename:createdBy?.gamename,
 }

  const handleMessage = () => {
    const opponent = isOwner ? acceptedBy.username : createdBy.username;
    history.push(`${MessagesRoute.getSendMessageRoute(opponent)}`);
    handleClose();
  };

  const onSubmit = handleSubmit((data) => {
    const winner: string[] = Object.values(data);

    dispatch(
      sendMatchResultAction(
        {
          winner,
          competitionId: id,
        },
        { redirect: () => openModal(true) },
      ),
    );

    dispatch(clearMatchResultsAction());
  });

  const saveResults = () => {
    const val = getValues();
    dispatch(saveMatchResultsAction(val));
  };


  let issecondAttempt = results?.length >= 1;

  const renderHistory = () => {
    if (!results || !results.length) {
      return null;
    }

    const history = prepareMatchHistory(results);

  
    return (
      <div className="result-match-history">
        <span className="result-match-history__title">HISTORY</span>
        <ul className="result-match-history__list">
          {history.map((r) => {
            return (
              <li className="result-match-history__item" key={r.attempt}>
                <span className="result-match-history__text">Game #1 won:</span>
                <span className="result-match-history__value">
                  {createdBy.username} / {acceptedBy.username}
                </span>
              </li>
            );
          })}
        </ul>
        <span className="result-match-history__title">Want to discuss?</span>
        <Button
          preffix={<Icon className="icon-message-voice" />}
          className="result-match-history__message"
          btnStyle="white-fill"
          onClick={handleMessage}
        >
          send message
        </Button>
      </div>
    );
  };

  const renderBottom = () => {
    const canSubmit = !Boolean(Object.keys(errors).length);

    return (
      <div className="result-match__box">
        <span className="match-started-modal__id">
          Match ID:
          <span>
            {id.slice(0, 5)}...
            <CopyButton value={id} />
          </span>
        </span>
        <Button
          preffix={<Icon className="icon-message-voice" />}
          className="result-match-history__message"
          btnStyle="white-fill"
          onClick={handleMessage}
        >
          send message
        </Button>
        <div className="result-match-won">
          <div className="result-match-won__head">
            <div className="result-match-won__row">
              <div className="result-match-won__col">
                <span className="result-match-won__text">Mark who won:</span>
              </div>
              <div className="result-match-won__col">
                <div className="result-match-won__person">
                  <Avatar avatar={createdBy.avatar} />
                  <span>{createdBy.username}</span>
                </div>
              </div>
              <div className="result-match-won__col">
                <div className="result-match-won__person">
                  <Avatar avatar={acceptedBy.avatar} />
                  <span>{acceptedBy.username}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="result-match-won__cont">
            {[...new Array(matchType)].map((_, idx) => {
              return (
                <TypedController
                  name={`result-${idx + 1}`}
                  rules={REQUIRED}
                  key={idx}
                  defaultValue={currentUserResults[`result-${idx + 1}`]}
                  render={(props) => {
                    return (
                      <RadioGroup
                        name={`result-${idx + 1}`}
                        {...props}
                        value={props.value || ''}
                      >
                        <div className="result-match-won__row">
                          <div className="result-match-won__col">
                            <span className="result-match-won__text">
                              Game #{idx + 1}
                            </span>
                          </div>
                          <div className="result-match-won__col">
                            <FormControlLabel
                              value={createdBy.id}
                              label=""
                              control={<Radio />}
                            />
                          </div>
                          <div className="result-match-won__col">
                            <FormControlLabel
                              value={acceptedBy.id}
                              label=""
                              control={<Radio />}
                            />
                          </div>
                        </div>
                      </RadioGroup>
                    );
                  }}
                />
              );
            })}
          </div>
          <div className={`result-match-won__bottom ${issecondAttempt?'with-dispute':''}`}>
            {issecondAttempt?<Button onClick={() => {
              history.push({pathname:DisputeRoute.ROOT,state:disputeDetails});
              handleClose();
              }}>Create Dispute</Button>:null}            
            <Button onClick={onSubmit} disabled={!canSubmit}>
              Submit results
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <UniversalExpandModal
      visible={isVisible}
      isCollapse={isCollapse}
      title="Match results"
      secondTitle="Match results"
      onCancel={() => handleClose(saveResults)}
      onExpand={handleExpand}
    >
      <div className="accept-match result-match">
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
