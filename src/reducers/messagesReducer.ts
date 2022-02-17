import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import { makeCombinedAction, sortDialogs } from 'helpers';

import {
  CHECK_EXIST_USER,
  CLEAR_SELECTED_DIALOG,
  GET_ALL_DIALOGS,
  GET_DIALOG,
  GET_UNREAD_MESSAGE_COUNTS,
  SEARCH_EXIST_USER,
} from 'const';
import {
  IDialog,
  resetDialogListModel,
  DialogList,
  QueryParams,
  resetQueryParamsModel,
} from 'interfaces';

export interface MessagesReducerState {
  isLoading: boolean;
  isSearchLoading: boolean
  isExistUserId: string | false | null;
  dialogList: DialogList;
  messagesQueryParams: QueryParams;
  selectedDialog: IDialog | null;
  unreadCounts: number;
}

// tslint:disable-next-line: no-object-literal-type-assertion
const initialState = Immutable.fromJS({
  isLoading: false,
  isSearchLoading: false,
  isExistUserId: null,
  dialogList: resetDialogListModel(),
  messagesQueryParams: {
    ...resetQueryParamsModel(false),
  },
  selectedDialog: null,
  unreadCounts: 0,
} as MessagesReducerState);

const { PENDING, DONE, FAILURE } = makeCombinedAction(
  GET_ALL_DIALOGS,
  GET_DIALOG,
);

const messagesReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set('isLoading', true);
    },
    [`${FAILURE}||${DONE}`]: (state: any) => {
      return state.set('isLoading', false);
    },
    [SEARCH_EXIST_USER.PENDING]: (state: any) => {
      return state.set('isSearchLoading', true);
    },
    [SEARCH_EXIST_USER.SUCCESS]: (state: any) => {
      return state.set('isSearchLoading', false);
    },
    [SEARCH_EXIST_USER.FAILURE]: (state: any) => {
      return state.set('isSearchLoading', false);
    },
    [CHECK_EXIST_USER.SUCCESS]: (state: any, { payload }) => {
      return state.set('isExistUserId', payload);
    },
    [GET_ALL_DIALOGS.PENDING]: (state: any, { payload }) => {
      const {
        messagesQueryParams: prevParams,
      } = state.toJS() as MessagesReducerState;
      const updatedParams: QueryParams = payload
        ? { ...prevParams, ...payload }
        : prevParams;

      return state.set('messagesQueryParams', Immutable.fromJS(updatedParams));
    },
    [GET_ALL_DIALOGS.SUCCESS]: (state: any, { payload }) => {
      const {
        dialogList: { data: prevDialogs },
        messagesQueryParams: { limit = 1 },
      } = state.toJS() as MessagesReducerState;

      const {
        pagination: { currentPage, itemCount },
      } = payload as MessagesReducerState['dialogList'];

      let updatedDialogs = prevDialogs;

      if (currentPage === 1) {
        updatedDialogs = new Array(itemCount).fill(null);
      }

      updatedDialogs.splice((currentPage - 1) * limit, limit, ...payload.data);
      return state.set(
        'dialogList',
        Immutable.fromJS({
          ...payload,
          data: updatedDialogs,
        }),
      );
    },
    [GET_DIALOG.SUCCESS]: (state: any, { payload }) => {
      const prevSelectedDialog = (state.toJS() as MessagesReducerState)
        .selectedDialog;
      if (!payload) {
        return state.set('selectedDialog', Immutable.fromJS(payload));
      }

      let selectedDialog: IDialog = {
        ...payload,
        messages: (payload.messages as IDialog['messages']).reverse(),
      };

      if (prevSelectedDialog?.id === selectedDialog.id) {
        const prevMessages = prevSelectedDialog.messages;

        const lastPrevMessage = prevMessages[0];
        const lastCurrentMessage = selectedDialog.messages[0];
        const isPrevMessages =
          new Date(lastPrevMessage.created.date) >
          new Date(lastCurrentMessage.created.date);

        if (isPrevMessages) {
          selectedDialog = {
            ...selectedDialog,
            messages: [...selectedDialog.messages, ...prevMessages],
          };
        }
      }

      const dialogList = (state.toJS() as MessagesReducerState).dialogList;
      const updatedDialogs = dialogList.data.map((d) => {
        if (!d) return d;
        if (d.username === selectedDialog.partner.username) {
          d.unread = '0';
        }
        return d;
      });
      return state
        .set('selectedDialog', Immutable.fromJS(selectedDialog))
        .set('dialogList', { ...dialogList, data: updatedDialogs });
    },
    [GET_UNREAD_MESSAGE_COUNTS.SUCCESS]: (state: any, { payload }) => {
      return state.set('unreadCounts', payload);
    },
    [CLEAR_SELECTED_DIALOG]: (state: any, { payload }) => {
      return state.set('selectedDialog', payload);
    },
  },
  initialState,
);

export default messagesReducer;
