import {
  CLEAR_MATCH_RESULTS, CREATE_MATCH, DELETE_MATCH, EDIT_MATCH, GET_CURRENT_MATCH_STATE, GET_MATCHES, resetMatchFilter, SAVE_MATCH_RESULTS, TOGGLE_DETAIL_MATCH, TOGGLE_SECONDARY_MATCH_MODAL, WAIT_MATCH_START
} from 'const';
import { addMinutes } from 'date-fns';
import { makeCombinedAction } from 'helpers';
import Immutable from 'immutable';
import {
  IMatch,
  MatchList,
  matchResults,
  MatchResults,
  MatchSecondaryModalTypes,
  QueryParams,
  resetMatchListModel,
  resetQueryParamsModel
} from 'interfaces';
import { ICentrifugeAcceptMatch } from 'interfaces/centrifuge/match';
import { handleActions } from 'redux-actions';



export interface MatchesReducerState {
  isLoading: boolean;
  matchesQueryParams: QueryParams;
  matchList: MatchList;
  secondModal: {
    type: MatchSecondaryModalTypes | null; // null - hidden
    competition: ICentrifugeAcceptMatch | null;
    isCollapse: boolean;
  };
  detailMatch: IMatch | null;
  currentUserResults: MatchResults;
}
// tslint:disable-next-line: no-object-literal-type-assertion
const initialState = Immutable.fromJS({
  isLoading: false,
  matchesQueryParams: {
    ...resetQueryParamsModel(true),
    filter: resetMatchFilter(),
  },
  matchList: resetMatchListModel(),
  secondModal: {
    isCollapse: false,
    type: null,
    competition: null,
  },
  detailMatch: null,
  currentUserResults: matchResults,
} as MatchesReducerState);

const { PENDING, DONE, FAILURE } = makeCombinedAction(
  GET_MATCHES,
  EDIT_MATCH,
  DELETE_MATCH,
  CREATE_MATCH,
);

const matchesReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set('isLoading', true);
    },
    [`${FAILURE}||${DONE}`]: (state: any) => {
      return state.set('isLoading', false);
    },
    [GET_MATCHES.PENDING]: (state: any, { payload }) => {
      return state.set('matchesQueryParams', Immutable.fromJS(payload));
    },
    [GET_MATCHES.SUCCESS]: (state: any, { payload }) => {
      return state.set('matchList', Immutable.fromJS(payload));
    },
    [TOGGLE_SECONDARY_MATCH_MODAL]: (state: any, { payload }) => {
      return state.set('secondModal', Immutable.fromJS(payload));
    },
    [GET_CURRENT_MATCH_STATE.SUCCESS]: (state: any, { payload }) => {
      const competitionData = payload as ICentrifugeAcceptMatch;

      const secondModal: MatchesReducerState['secondModal'] = {
        competition: competitionData,
        isCollapse: false,
        type: null,
      };

      const {
        competition: { started },
      } = competitionData;

      const waitTime = started
        ? addMinutes(new Date(started), WAIT_MATCH_START)
        : 0;
      const isExpared = +new Date() > +waitTime;

      if (competitionData.status === 'ACCEPTED') {
        secondModal.type = MatchSecondaryModalTypes.match_accept;
      }

      if (competitionData.status === 'STARTED') {
        if (isExpared) {
          secondModal.type = MatchSecondaryModalTypes.match_result;
        } else {
          secondModal.type = MatchSecondaryModalTypes.match_started;
        }
      }

      if (competitionData.status === 'RESULT_CONFLICT') {
        secondModal.type = MatchSecondaryModalTypes.match_result;
      }

      return state.set('secondModal', Immutable.fromJS(secondModal));
    },
    [TOGGLE_DETAIL_MATCH]: (state: any, { payload }) => {
      return state.set('detailMatch', payload);
    },
    [SAVE_MATCH_RESULTS]: (state: any, { payload }) => {
      return state.set('currentUserResults', payload);
    },
    [CLEAR_MATCH_RESULTS]: (state: any) => {
      return state.set('currentUserResults', matchResults);
    },
  },
  initialState,
);

export default matchesReducer;
