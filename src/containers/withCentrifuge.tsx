// tslint:disable: no-floating-promises

import {
  fetchUserInfoAction,
  getDialogWithCentrifugeAction,
  getMatchesAction, toggleSecondaryMatchModalAction,
  updateProfileBalance
} from 'actions';
import { centrifuge } from 'config/centrifuge';
import { CentrifugeChanels } from 'const';
import { alarm, makeSelector } from 'helpers';
import { usePagination } from 'hooks/usePagination';
import {
  ICentrifugeBalance,
  ICentrifugeMessageResp,
  IUserProfileResp,
  MatchSecondaryModalTypes
} from 'interfaces';
import { ICentrifugeAcceptMatchResp } from 'interfaces/centrifuge/match';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

let globalActiveCompetitionId: any = null;

type ConnectStatus = 'connected' | 'disconnected' | 'pending';

export const withCentrifuge = (ChildComponent: any) => {
  const Wrapper: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const [connectStatus, setConnectStatus] = useState<ConnectStatus>(
      'disconnected',
    );

    const [needUpdateMatches, setStatusUpdateMatches] = useState(false);

    const centrifugeToken = useSelector<any, string>(
      makeSelector(['profileReducer', 'centrifugeToken']),
    );

    const { id: userId, activeCompetitionId} = useSelector<any, IUserProfileResp>(
      makeSelector(['profileReducer', 'userData']),
    );
    useEffect(() => {
      globalActiveCompetitionId = activeCompetitionId;
    }, [activeCompetitionId]);

    const canConnect =
      centrifugeToken && userId && connectStatus === 'disconnected';

    const getChanel = (chanel: CentrifugeChanels) => {
      return `${chanel}#${userId}`;
    };

    const { getList, queryParams, sortValue, filters } = usePagination({
      getListAction: getMatchesAction,
      queryName: 'matchesQueryParams',
      reducerName: 'matchesReducer',
    });

    const updateProfile = () => {
      dispatch(fetchUserInfoAction(null));
      dispatch(getMatchesAction({}));
    };

    useEffect(() => {
      if (needUpdateMatches) {
        getList(queryParams, sortValue, filters);
        setStatusUpdateMatches(false)
      }
    }, [needUpdateMatches]);

    useEffect(() => {
      if (canConnect) {
        centrifuge.setToken(centrifugeToken);

        centrifuge.subscribe(
          getChanel(CentrifugeChanels.balance_change),
          (message: ICentrifugeBalance) => {
            dispatch(updateProfileBalance(message.data.amount));
          },
        );

        centrifuge.subscribe(
          getChanel(CentrifugeChanels.accept_competition),
          (message: ICentrifugeAcceptMatchResp) => {
            alarm.success();
            updateProfile();
            if (!message.data.response) {
              dispatch(
                toggleSecondaryMatchModalAction({
                  competition: message.data,
                  isCollapse: false,
                  type: MatchSecondaryModalTypes.match_accept,
                }),
              );
              return;  
            }

            if (message.data.response === 'decline') {
              dispatch(
                toggleSecondaryMatchModalAction({
                  competition: null,
                  isCollapse: false,
                  type: null,
                }),
              );
              return;
            }
            if (message.data.response === 'accept') {
              dispatch(
                toggleSecondaryMatchModalAction({
                  isCollapse: false,
                  type: MatchSecondaryModalTypes.match_started,
                  competition: message.data,
                }),
              );
            }
          },
        );

        centrifuge.subscribe(
          getChanel(CentrifugeChanels.accept_competition_response),
          (message: ICentrifugeAcceptMatchResp) => {
            alarm.success();
            updateProfile();

            dispatch(
              toggleSecondaryMatchModalAction({
                competition: message.data,
                isCollapse: false,
                type: MatchSecondaryModalTypes.match_accept,
              }),
            );
          },
        );

        centrifuge.subscribe(
          getChanel(CentrifugeChanels.competition_expired),
          (message: ICentrifugeAcceptMatchResp) => {
            let type: MatchSecondaryModalTypes | null = null;

            if (
              message.data.action === CentrifugeChanels.competition_expired
            ) {
              type = MatchSecondaryModalTypes.competition_expired;
              updateProfile();
            }

            dispatch(
              toggleSecondaryMatchModalAction({
                competition: null,
                isCollapse: false,
                type,
              }),
            );
            // updateProfile();
          },
        );

        centrifuge.subscribe(
          getChanel(CentrifugeChanels.competition_result),
          (message: ICentrifugeAcceptMatchResp) => {
            let type: MatchSecondaryModalTypes | null = null;
            // console.log('web soc res : competition_result',message.data);
            if (
              message.data.action === CentrifugeChanels.competition_complete
            ) {
              type = MatchSecondaryModalTypes.competition_complete;
              updateProfile();
            }

            if (
              message.data.action ===
              CentrifugeChanels.competition_result_conflict
            ) {
              type = MatchSecondaryModalTypes.competition_conflict;
            }

            if (message.data.action === CentrifugeChanels.competition_dispute) {
              type = MatchSecondaryModalTypes.competition_dispute;
              updateProfile();
            }

            if (message.data.action === CentrifugeChanels.custom_competition_dispute) {
              type = MatchSecondaryModalTypes.custom_competition_dispute;
              updateProfile();
            }

            if (message.data.action === CentrifugeChanels.competition_void) {
              type = MatchSecondaryModalTypes.competition_void;
              updateProfile();
            }

            if (type && type !== 'custom_competition_dispute') {
              dispatch(
                toggleSecondaryMatchModalAction({
                  type,
                  competition: message.data,
                  isCollapse: false,
                }),
                );
            } else {
              const disputeCompetitionId = message.data?.competition.id;
              const currentMatchId:any = globalActiveCompetitionId;
              const isCurrentCompetition =  disputeCompetitionId === currentMatchId;     
              if(isCurrentCompetition && type === 'custom_competition_dispute'){
                dispatch(
                  toggleSecondaryMatchModalAction({
                    type,
                    competition: message.data,
                    isCollapse: false,
                  }),
                );
              }
            }
          }
        );

        centrifuge.subscribe(
          getChanel(CentrifugeChanels.messages),
          (message: ICentrifugeMessageResp) => {
            dispatch(getDialogWithCentrifugeAction(message.data.sender));
          },
        );


        centrifuge.subscribe(CentrifugeChanels.competition, (competition) => {
          let type: MatchSecondaryModalTypes | null = null;          
          /*
          
          -For every action rather then create , both users will get updated and featch new match.
          -For create we don't won't that or it will fetch all new match every time anyone create match : that we don't wont so !create then setStatusUpdateMatches(true) 
          -setStatusUpdateMatches(true)  will fetch new match on true.
          -here this thing is working on delete. 
          
          On this channel at the moment have two action ws with data 

          1.create  > competition/create > POST req.

          2.delete  > competition/delete/:id > DELETE req.
          
          and we need third :
          
          3.create with oppp:id > /competition/create > POST req.
          
          */ 

          // console.log('CentrifugeChanels.competition',competition.data.competition)
        
          if (competition.data.action !== 'create') {
            setStatusUpdateMatches(true);
          }

          /*

          On direct challenge :
          
          1.first fetch new match at opponent side > it is getting updated by the code above : done
          2.Show match detail popup for accept that specific match.
          3.On direct challenge get ws res in this channel with action of : create_direct_challenge
          4.On that action show details popup to opponent. : done
          */ 
          // if (competition.data.action !== 'create' && competition.data.action === 'challenge') {
          //   console.log('challenge',competition.data);
          //   type = MatchSecondaryModalTypes.competition_challenge;
          //   dispatch(
          //     toggleSecondaryMatchModalAction({
          //       type,
          //       competition: competition.data,
          //       isCollapse: false,
          //     }),
          //     );
          // }

          if (competition.data.action !== 'create' && competition.data.action === 'delete') {
            const currentUserId:any = userId;
            const opponentId = competition?.data?.competition?.userOpponent?.id;
            const isCurrentCompetition = currentUserId === opponentId;
            // if delete competition opponent id matches with currentUser id close modal. 
            if(isCurrentCompetition){
              dispatch(
                toggleSecondaryMatchModalAction({
                  competition: null,
                  isCollapse: false,
                  type: null,
                }),
                );
                updateProfile();
              }
          }

        });


        centrifuge.subscribe(getChanel(CentrifugeChanels.competition), (competition) => {

          let type: MatchSecondaryModalTypes | null = null;          
          /*
      
          On direct challenge :
          
          1.first fetch new match at opponent side > it is getting updated by the code above : done
          2.Show match detail popup for accept that specific match.
          3.On direct challenge get ws res in this channel with action of : create_direct_challenge
          4.On that action show details popup to opponent. : done
          */ 
          if (competition.data.action !== 'create' && competition.data.action === 'challenge') {
            type = MatchSecondaryModalTypes.competition_challenge;
            dispatch(
              toggleSecondaryMatchModalAction({
                type,
                competition: competition.data,
                isCollapse: false,
              }),
              );
          }

          if (competition.data.action !== 'create' && competition.data.action === 'challenge_decline') {
            dispatch(
              toggleSecondaryMatchModalAction({
                competition: null,
                  isCollapse: false,
                  type: null,
              }),
              );
            updateProfile();
          }

        });
        

        centrifuge.on('connect', (context) => {
          setConnectStatus('connected');
        });

        centrifuge.on('disconnect', (ctx) => {
          setConnectStatus('disconnected');
          centrifuge.disconnect();
          centrifuge.removeAllListeners();
        });

        setConnectStatus('pending');
        centrifuge.connect();
      }

      return () => {
        // if (connectStatus !== 'connected') {
        //   setConnectStatus('pending');
        //   centrifuge.disconnect();
        // }
      };
    }, [centrifugeToken, userId, connectStatus]);
    return <ChildComponent {...props} />;
  };

  return Wrapper;
};
