import {
  ACCEPT_MATCH, CLEAR_MATCH_RESULTS, CONFIRM_OWN_MATCH, CREATE_MATCH,
  DECLINE_DIRECT_CHALLANGE,
  DELETE_MATCH, EDIT_MATCH, GET_CURRENT_MATCH_STATE, GET_MATCHES, SAVE_MATCH_RESULTS, SEND_MATCH_RESULT,
  TOGGLE_DETAIL_MATCH, TOGGLE_SECONDARY_MATCH_MODAL
} from 'const';
import {
  IActionFn,
  IMatch, ISendMatchResult, MatchResults,
  QueryParams
} from 'interfaces';
import { MatchesReducerState } from 'reducers';

export const getMatchesAction: IActionFn<QueryParams> = (payload, params) => {
  return ({
    payload,
    params,
    type: GET_MATCHES.PENDING,
  })
};

export const createMatchAction: IActionFn<IMatch> = (payload, params) => ({
  payload,
  params,
  type: CREATE_MATCH.PENDING,
});

export const editMatchAction: IActionFn<IMatch> = (payload, params) => ({
  payload,
  params,
  type: EDIT_MATCH.PENDING,
});

export const acceptMatchAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: ACCEPT_MATCH.PENDING,
});

export const confirmOwnMatchAction: IActionFn<{
  id: string;
  type: 'accept' | 'decline';
}> = (payload, params) => {
  return ({
    payload,
    params,
    type: CONFIRM_OWN_MATCH.PENDING,
  })
};

export const deleteMatchAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: DELETE_MATCH.PENDING,
});

export const declineDirectChallangeAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: DECLINE_DIRECT_CHALLANGE.PENDING,
});

export const toggleSecondaryMatchModalAction: IActionFn<
  MatchesReducerState['secondModal']
> = (payload) => ({
  payload,
  type: TOGGLE_SECONDARY_MATCH_MODAL,
});

export const getCurrentMatchStateAction: IActionFn<string> = (payload, params) => {
  return ({
    payload,
    params,
    type: GET_CURRENT_MATCH_STATE.PENDING,
  })
};

export const sendMatchResultAction: IActionFn<ISendMatchResult> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: SEND_MATCH_RESULT.PENDING,
});

export const toggleDetailMatchAction: IActionFn<IMatch | null> = (payload) => ({
  payload,
  type: TOGGLE_DETAIL_MATCH,
});

export const saveMatchResultsAction: IActionFn<MatchResults> = (payload) => ({
  payload,
  type: SAVE_MATCH_RESULTS,
});

export const clearMatchResultsAction = () => ({
  type: CLEAR_MATCH_RESULTS,
});
