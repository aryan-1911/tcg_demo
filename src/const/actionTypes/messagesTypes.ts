import { makeActionType } from 'helpers';

// MESSAGES
export const GET_MESSAGE_PERSON_LIST = makeActionType(
  'GET_MESSAGE_PERSON_LIST',
);
export const CHECK_EXIST_USER = makeActionType('CHECK_EXIST_USER');
export const SEARCH_EXIST_USER = makeActionType('SEARCH_EXIST_USER');
export const SEND_MESSAGE = makeActionType('SEND_MESSAGE');
export const GET_ALL_DIALOGS = makeActionType('GET_ALL_DIALOGS');
export const GET_DIALOG = makeActionType('GET_DIALOG');
export const GET_DIALOG_WITH_CENTRIFUGE = makeActionType(
  'GET_DIALOG_WITH_CENTRIFUGE',
);
export const GET_UNREAD_MESSAGE_COUNTS = makeActionType(
  'GET_UNREAD_MESSAGE_COUNTS',
);
export const DELETE_DIALOG = makeActionType('DELETE_DIALOG');

export const CLEAR_SELECTED_DIALOG = 'CLEAR_SELECTED_DIALOG';
