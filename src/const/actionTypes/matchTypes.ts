import { makeActionType } from 'helpers';

// MATCHES
export const GET_MATCHES = makeActionType('GET_MATCHES');
export const CREATE_MATCH = makeActionType('CREATE_MATCH');
export const ACCEPT_MATCH = makeActionType('ACCEPT_MATCH');
export const CONFIRM_OWN_MATCH = makeActionType('CONFIRM_OWN_MATCH');
export const DELETE_MATCH = makeActionType('DELETE_MATCH');
export const DECLINE_DIRECT_CHALLANGE = makeActionType('DECLINE_DIRECT_CHALLANGE');
export const EDIT_MATCH = makeActionType('EDIT_MATCH');
export const GET_CURRENT_MATCH_STATE = makeActionType(
  'GET_CURRENT_MATCH_STATE',
);
export const SEND_MATCH_RESULT = makeActionType('SEND_MATCH_RESULT');

export const TOGGLE_DETAIL_MATCH = 'TOGGLE_DETAIL_MATCH';
export const OPEN_ACCEPT_MATCH = 'OPEN_ACCEPT_MATCH';
export const TOGGLE_SECONDARY_MATCH_MODAL = 'TOGGLE_SECONDARY_MATCH_MODAL';
export const SAVE_MATCH_RESULTS = 'SAVE_MATCH_RESULTS';
export const CLEAR_MATCH_RESULTS = 'CLEAR_MATCH_RESULTS';

export const GET_DIFF_SYSTEM_TIME = 'GET_DIFF_SYSTEM_TIME';
