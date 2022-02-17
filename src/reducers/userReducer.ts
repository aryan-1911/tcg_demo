import { ANY_USER_ONLINE_OFFLINE_DATA, GET_USER, GET_USER_MATCHES, USER_ONLINE_OFFLINE_DATA } from 'const';
import { makeCombinedAction } from 'helpers';
import Immutable from 'immutable';
import {
  ISpecificProfileResp,
  resetMatchListModel,
  resetQueryParamsModel
} from 'interfaces';
import { handleActions } from 'redux-actions';



const { PENDING, DONE, FAILURE } = makeCombinedAction(GET_USER);

interface IUserReducerState {
  isLoading: boolean;
  userData: ISpecificProfileResp;
  matchList: ReturnType<typeof resetMatchListModel>;
  matchesQueryParams: ReturnType<typeof resetQueryParamsModel>;
  userOnlineOfflineInfo: any;
  anyUserOnlineOfflineInfo: any;
}

// tslint:disable-next-line: no-object-literal-type-assertion
const initialState = Immutable.fromJS({
  isLoading: false,
  userData: {
    id: '',
    username: '',
    fullname: '',
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
    statistic: {
      balance: 0,
      losePercent: 0,
      loses: 0,
      winPercent: 0,
      wins: 0,
    },
    roles: [],
    allowChallenge: 1,
    dispute_amount: 0,
  },
  matchList: resetMatchListModel(),
  matchesQueryParams: {
    ...resetQueryParamsModel(true),
  },
  userOnlineOfflineInfo: {

  },
  anyUserOnlineOfflineInfo: {

  },
} as IUserReducerState);

const userReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set('isLoading', true);
    },
    [`${FAILURE}||${DONE}`]: (state: any) => {
      return state.set('isLoading', false);
    },

    [GET_USER.SUCCESS]: (state: any, { payload }) => {
      return state.set('userData', Immutable.fromJS(payload));
    },
    [GET_USER_MATCHES.PENDING]: (state: any, { payload }) => {
      return state.set('matchesQueryParams', Immutable.fromJS(payload));
    },
    [GET_USER_MATCHES.SUCCESS]: (state: any, { payload }) => {
      return state.set('matchList', payload);
    },
    [USER_ONLINE_OFFLINE_DATA]: (state: any, { payload }) => {
      return state.set('userOnlineOfflineInfo', payload);
    },
    [ANY_USER_ONLINE_OFFLINE_DATA]: (state: any, { payload }) => {
      return state.set('anyUserOnlineOfflineInfo', payload);
    },
  },
  initialState,
);

export default userReducer;
