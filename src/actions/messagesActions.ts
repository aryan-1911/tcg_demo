import {
  CHECK_EXIST_USER, CLEAR_SELECTED_DIALOG, DELETE_DIALOG, GET_ALL_DIALOGS, GET_DIALOG,
  GET_DIALOG_WITH_CENTRIFUGE, GET_MESSAGE_PERSON_LIST, GET_UNREAD_MESSAGE_COUNTS, SEARCH_EXIST_USER, SEND_MESSAGE
} from 'const';
import { IActionFn, QueryParams } from 'interfaces';

export const getMessagePersonListAction: IActionFn<string> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: GET_MESSAGE_PERSON_LIST.PENDING,
});

export const checkExistUserAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: CHECK_EXIST_USER.PENDING,
});

export const searchExistUserAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: SEARCH_EXIST_USER.PENDING,
});

export const sendMessageAction: IActionFn<{
  receiver: string;
  message: string;
}> = (payload, params) => ({
  payload,
  params,
  type: SEND_MESSAGE.PENDING,
});

export const getAllDialogsAction: IActionFn<QueryParams | null> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: GET_ALL_DIALOGS.PENDING,
});

export const getDialogAction: IActionFn<{
  id: string;
  queryParam: QueryParams;
}> = (payload) => ({
  payload,
  type: GET_DIALOG.PENDING,
});

export const getDialogWithCentrifugeAction: IActionFn<string> = (payload) => ({
  payload,
  type: GET_DIALOG_WITH_CENTRIFUGE.PENDING,
});

export const getUnreadMessageCountsAction: IActionFn = (payload) => ({
  payload,
  type: GET_UNREAD_MESSAGE_COUNTS.PENDING,
});

export const deleteDialogAction: IActionFn<string> = (payload) => ({
  payload,
  type: DELETE_DIALOG.PENDING,
});

export const clearSelectedDialogAction: IActionFn<null> = (payload) => ({
  payload,
  type: CLEAR_SELECTED_DIALOG,
});
