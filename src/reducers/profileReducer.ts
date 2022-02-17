import {
  APPLY_FOR_AFFILIATION,
  CREATE_DISPUTE, EDIT_USER_INFO, FETCH_USER_INFO, GET_CENTRIFUGE_TOKEN, GET_DIFF_SYSTEM_TIME, GET_PROFILE_MATCHES, ONLINE_OFFLINE_DATA, PARTIAL_USER_INFO_EDITING, SET_USER_PROFILE_INFO, UPDATE_ACTIVE_COMPETITION_ID, UPDATE_PROFILE_BALANCE
} from 'const';
import { makeCombinedAction } from 'helpers';
import Immutable from 'immutable';
import {
  IUserProfileResp,
  resetMatchListModel,
  resetQueryParamsModel
} from 'interfaces';
import { handleActions } from 'redux-actions';



const { PENDING, DONE, FAILURE } = makeCombinedAction(
  SET_USER_PROFILE_INFO,
  EDIT_USER_INFO,
  FETCH_USER_INFO,
  PARTIAL_USER_INFO_EDITING,
  CREATE_DISPUTE,
);

const initialState = Immutable.fromJS({
  isLoading: false,
  affiliateLoading: false,
  centrifugeToken: '',
  // tslint:disable-next-line: no-object-literal-type-assertion
  userData: {
    id: '',
    username: '',
    fullname: '',
    paypal_email: '',
    isAffiliated: 0,
    referral_code: 'SOMECODE',
    hasActiveAffiliateRequest: 0,
    email: '',
    birthdate: '',
    phone: null,
    prefix: '+1',
    showIncome: false,
    nicknames: {
      'MTG ARENA': '',
      'POKEMON TCGO': '',
      'YU-GI-OH MASTER DUEL': '',
      'MAGIC THE GATHERING ONLINE': '',
    },
    avatar: '',
    balance: 0,
    wonBalance: 0,
    activeCompetitionId: undefined,
    isConfirmed: false,
    roles: [],
    statistic: {
      balance: 0,
      losePercent: 0,
      loses: 0,
      winPercent: 0,
      wins: 0,
    },
    date: 0,
    allowChallenge: 1,
    dispute_amount: 0,
  } as IUserProfileResp,
  matchList: resetMatchListModel(),
  matchesQueryParams: {
    ...resetQueryParamsModel(true),
  },
  diffSystemTime: null,
  onlineOfflineInfo: {
  }
});

const profileReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set('isLoading', true);
    },
    [`${FAILURE}||${DONE}`]: (state: any) => {
      return state.set('isLoading', false);
    },
    [APPLY_FOR_AFFILIATION.PENDING]: (state: any) => {
      return state.set('affiliateLoading', true);
    },
    [`${APPLY_FOR_AFFILIATION.FAILURE}||${APPLY_FOR_AFFILIATION.DONE}`]: (state: any) => {
      return state.set('affiliateLoading', false);
    },
    [FETCH_USER_INFO.SUCCESS]: (state: any, { payload }) => {
      return state.set('userData', Immutable.fromJS(payload));
    },
    [GET_CENTRIFUGE_TOKEN.SUCCESS]: (state: any, { payload }) => {
      return state.set('centrifugeToken', payload);
    },
    [UPDATE_PROFILE_BALANCE]: (state: any, { payload }) => {
      const { userData } = state.toJS();

      const updatdUserData: IUserProfileResp = {
        ...userData,
        balance: payload,
      };

      return state.set('userData', Immutable.fromJS(updatdUserData));
    },
    [UPDATE_ACTIVE_COMPETITION_ID]: (state: any, { payload }) => {
      const { userData } = state.toJS();

      const updatdUserData: IUserProfileResp = {
        ...userData,
        activeCompetitionId: payload,
      };
      return state.set('userData', Immutable.fromJS(updatdUserData));
    },
    [GET_PROFILE_MATCHES.PENDING]: (state: any, { payload }) => {
      return state.set('matchesQueryParams', Immutable.fromJS(payload));
    },
    [GET_PROFILE_MATCHES.SUCCESS]: (state: any, { payload }) => {
      return state.set('matchList', payload);
    },
    [GET_DIFF_SYSTEM_TIME]: (state: any, { payload }) => {
      return state.set('diffSystemTime', payload);
    },
    [ONLINE_OFFLINE_DATA]: (state: any, { payload }) => {
      return state.set('onlineOfflineInfo', payload);
    },
  },
  initialState,
);

export default profileReducer;
