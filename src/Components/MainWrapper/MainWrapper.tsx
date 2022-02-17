import {
  fetchUserInfoAction,
  getCentrifugeTokenAction, getCurrentMatchStateAction, getUnreadMessageCountsAction, onlieOfflineDataAction, toggleSecondaryMatchModalAction, userOnlieOfflineDataAction
} from 'actions';
import Disclaimer from 'Components/Disclaimer';
import firebase from 'firebase';
import { checkByAdmin, makeSelector } from 'helpers';
import { IUserProfileResp, MatchList, MatchSecondaryModalTypes } from 'interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { MatchesReducerState, MessagesReducerState } from 'reducers';
import base from '../../base';
import './main-wrapper.scss';
import Aside from './parts/Aside';
import MainHeader from './parts/MainHeader/MainHeader';

interface IProps {
  currPath: string;
  history: RouteComponentProps['history'];
  hasToken: boolean;
}

export const MainWrapper = (Router: any) => {
  const Wrapper: React.FC<IProps> = ({ currPath, hasToken}) => {
    const [isVisibleDisclaimer, setVisibleDisclaimer] = useState(false);
    const dispatch = useDispatch();
    let newsecondModal: any = null;
    
    const { id: userId, activeCompetitionId, isConfirmed, roles ,username} = useSelector<
      any,
      IUserProfileResp
    >(makeSelector(['profileReducer', 'userData']));

    const { pathname } = useLocation();
    const profileId = pathname.slice(pathname.lastIndexOf('/') + 1);
    const [info, setInfo] = useState({});

    //TODO:use this flag to update online states when user goes offline due to some internet issues of something. 
    let goesOffline = !navigator.onLine;
    //Post req at firebase rtd 
    useEffect( () => {
      if(userId ===  undefined) {return};
      if(!!userId){
      let userPostRef;
      const intervalId = setInterval(() => { 
          localStorage.setItem('userId', userId);
          userPostRef =  base.post(`${userId}/info`,{
            data:{username:username,isOnline:{state:"online"}},
          })
          // return () => {
          // }
        },3000);
        return () => {
          if(userPostRef != undefined){
            base.removeBinding(userPostRef);
          }
          clearInterval(intervalId);
        }; //This is important
      }
    }, [userId,useEffect])

    useEffect(() => {
      if(profileId ===  undefined) {return};
      let ref;
      const intervalId2 = setInterval(() => { 
      ref = base.syncState(`${profileId}/info`, {
        context: {
          setState: ({ info }) => setInfo({ ...info }),
          state: { info },
        },
        state: 'info'
      })
      },3000);
      return () => {
        if(ref !== undefined){
          base.removeBinding(ref);
        }
        clearInterval(intervalId2);
      }
    }, [profileId,useEffect])

    // This will make update logged in user's firebase rtdt offline status on close tab and internet issue.  
    let isOfflineForDatabase = {
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    useEffect( () => {
      if(userId ===  undefined) {return};
      let userStatusDatabaseRef = firebase.database().ref(`/${userId}/info/isOnline`);
      firebase.database().ref('.info/connected').on('value', function(snapshot) {
        // If we're not currently connected, don't do anything.
        if (snapshot.val() == false) {
          return;
        };
        // If we are currently connected, then use the 'onDisconnect()' 
        // method to add a set which will only trigger once this 
        // client has disconnected by closing the app, 
        // losing internet, or any other means.
        userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
          // The promise returned from .onDisconnect().set() will
          // resolve as soon as the server acknowledges the onDisconnect() 
          // request, NOT once we've actually disconnected:
          // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect
          
          // We can now safely set ourselves as 'online' knowing that the
          // server will mark us as offline once we lose connection.
        });
      });
    },[userId]);

    //TODO : user own online status

    // const [fishes2, setFishes2] = useState({});

    // useEffect(() => {
    //   if(userId ===  undefined) {return};
    //   let ref3;
    //   const intervalId3 = setInterval(() => { 
    //     ref3 = base.syncState(`${userId}/info`, {
    //     context: {
    //       setState: ({ fishes2 }) => setFishes2({ ...fishes2 }),
    //       state: { fishes2 },
    //     },
    //     state: 'fishes2'
    //   })
    //   },1000);
    //   return () => {
    //     if(ref3 !== undefined){
    //       base.removeBinding(ref3);
    //     }
    //     clearInterval(intervalId3);
    //   }
    // }, [])

    useEffect(() => {
      dispatch(onlieOfflineDataAction(info));
    }, [dispatch]);
  
    const  onlineOfflineInfoFromReducer  = useSelector<any, any>(
      makeSelector(['profileReducer', 'onlineOfflineInfo']),
    );

    useEffect(() => {
      dispatch(userOnlieOfflineDataAction(info));
    }, [dispatch, info]);


    const  userOnlineOfflineInfoFromReducer  = useSelector<any, any>(
      makeSelector(['userReducer', 'userOnlineOfflineInfo']),
    );

    const unreadCounts = useSelector<any, MessagesReducerState['unreadCounts']>(
      makeSelector(['messagesReducer', 'unreadCounts']),
    );

    const { secondModal } = useSelector<any, MatchesReducerState>(
      makeSelector(['matchesReducer']),
    );

    useEffect(() => {
      newsecondModal = secondModal;
    }, [secondModal]);


    const { data:currentMatchList }:any = useSelector<any, MatchList>(
      makeSelector(['matchesReducer', 'matchList']),
    );
    
    let withOppId:any = currentMatchList.find(currentMatch => !!currentMatch.opponentUserId );

    let inDirectChallange = !!withOppId?.opponentUserId && withOppId?.partnerUserId === null;

    useEffect(() => {
      dispatch(fetchUserInfoAction(null));
      dispatch(getCentrifugeTokenAction(null));
      dispatch(getUnreadMessageCountsAction(null));
    }, []);

    useEffect(() => {
      if (userId && activeCompetitionId) {
        dispatch(getCurrentMatchStateAction(activeCompetitionId));
      }
    }, [userId]);

    useEffect(() => {
      if (inDirectChallange) {

        dispatch(getCurrentMatchStateAction(withOppId?.id,{ redirect: (res)=>{

          if(res && !res.error){
            let updatedsecondModal = {...secondModal?secondModal:null,competition:{competition:res.message.competition},type:MatchSecondaryModalTypes.competition_challenge}
            dispatch(
              //@ts-ignore
              toggleSecondaryMatchModalAction({
                ...updatedsecondModal
              }));          
            }
        } }));
        // let updatedsecondModal = {...newsecondModal,type:MatchSecondaryModalTypes.competition_challenge}
        // dispatch(
        //   toggleSecondaryMatchModalAction({
        //     ...updatedsecondModal
        //   }));  
      }
    }, [inDirectChallange]);

    useEffect(() => {
      if (userId) {
        setVisibleDisclaimer(!isConfirmed);
      }
    }, [isConfirmed, userId]);

    const handleCloseDisclaimer = useCallback(() => {
      setVisibleDisclaimer(false);
    }, [setVisibleDisclaimer]);

    const isAdmin = checkByAdmin(roles);

    return (
      <>
        <Disclaimer
          isVisible={isVisibleDisclaimer}
          onClose={handleCloseDisclaimer}
        />
        <div
          className={`main-wrapper ${
            isVisibleDisclaimer ? 'main-wrapper--disclaimer' : ''
          }`}
        >
          <Aside
            currPath={currPath}
            unreadCounts={unreadCounts}
            isAdmin={isAdmin}
          />
          <main className="main-content">
            <MainHeader />
            <div className="main-content__content">
              <Router hasToken={hasToken} />
            </div>
          </main>
        </div>
      </>
    );
  };

  return ({
    history,
    location: { pathname },
    hasToken,
  }: RouteComponentProps & { hasToken: boolean }) => (
    <Wrapper currPath={pathname} history={history} hasToken={hasToken} />
  );
};