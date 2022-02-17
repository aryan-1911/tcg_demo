import {
  checkExistUserAction,
  deleteDialogAction,
  getAllDialogsAction,
  getDialogAction,
  getDialogWithCentrifugeAction,
  getUnreadMessageCountsAction,
  searchExistUserAction,
  sendMessageAction
} from 'actions';
import { ShowToastError } from 'Components/Toast';
import store from 'config/store';
import {
  CHECK_EXIST_USER,
  DELETE_DIALOG,
  GET_ALL_DIALOGS,
  GET_DIALOG,
  GET_DIALOG_WITH_CENTRIFUGE,
  GET_UNREAD_MESSAGE_COUNTS, MESSAGE_CANT_MESSAGE, MESSAGE_QUERY_LIMIT, SEARCH_EXIST_USER, SEND_MESSAGE
} from 'const';
import {
  encodeDataToUrl, httpApi,
  HttpResp, makeAction, makeSelector
} from 'helpers';
import { IDialog, IPreviewDialog, QueryParams } from 'interfaces';
import { MessagesReducerState } from 'reducers';
import { call, put, select, takeLatest } from 'redux-saga/effects';


function* checkExistUser({
  payload,
  params = {},
}: ReturnType<typeof checkExistUserAction>) {
  try {
    const { redirect } = params;

    const res: HttpResp<{ id: string; username: string }> = yield call(
      httpApi,
      {
        partUrl: `/user/get/username/${payload}`,
        method: 'GET',
      },
    );
    if (res && !res.error) {
      yield put(makeAction(CHECK_EXIST_USER.SUCCESS, res.id));
      if (redirect) {
        redirect(res.id);
      }
    } else {
      yield put(makeAction(CHECK_EXIST_USER.SUCCESS, false));
      if (redirect) {
        redirect(false);
      }
    }
  } catch (error) {
    yield put(makeAction(CHECK_EXIST_USER.FAILURE, error));
  }
}

function* searchExistUser({
  payload,
  params = {},
}: ReturnType<typeof searchExistUserAction>) {
  try {
    const { redirect } = params;

    const req = {
      search: undefined,
    };

    const res: HttpResp<any> = yield call(
      httpApi,
      {
        partUrl: `/user/search?username=${payload}`,
        method: 'GET',
      },
    );
    if (res && !res.error) {
      yield put(makeAction(SEARCH_EXIST_USER.SUCCESS, res.id));
      if (redirect) {
        redirect(res.message.data);
      }
    } else {
      yield put(makeAction(SEARCH_EXIST_USER.SUCCESS, false));
      if (redirect) {
        redirect(false);
      }
    }
  } catch (error) {
    yield put(makeAction(SEARCH_EXIST_USER.FAILURE, error));
  }
}


function* sendMessage({
  payload,
  params = {},
}: ReturnType<typeof sendMessageAction>) {
  const { redirect } = params;
  try {
    const res: HttpResp<{ id: string; username: string }> = yield call(
      httpApi,
      {
        partUrl: `/message/create`,
        method: 'POST',
        data: payload,
      },
    );
    if (res && !res.error) {
      yield put(makeAction(SEND_MESSAGE.SUCCESS));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(SEND_MESSAGE.FAILURE));
      ShowToastError({
        title: MESSAGE_CANT_MESSAGE,
      });
    }
  } catch (error) {
    yield put(makeAction(SEND_MESSAGE.FAILURE, error));
  }
}

function* getAllDialogs({
  payload,
  params = {},
}: ReturnType<typeof getAllDialogsAction>) {
  const { redirect } = params;

  const messagesQueryParams: QueryParams = yield select(
    makeSelector(['messagesReducer', 'messagesQueryParams']),
  );

  const req = {
    ...messagesQueryParams,
    ...payload,
    username: messagesQueryParams.search,
    search: undefined,
  };

  try {
    const res: HttpResp<IPreviewDialog[]> = yield call(httpApi, {
      partUrl: `/message/dialogs?${encodeDataToUrl(req)}`,
      method: 'GET',
    });
    if (res && !res.error) {
      yield put(makeAction(GET_ALL_DIALOGS.SUCCESS, res.message));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(GET_ALL_DIALOGS.FAILURE));
    }
  } catch (error) {
    yield put(makeAction(GET_ALL_DIALOGS.FAILURE, error));
  }
}

function* getDialog({
  payload,
  params = {},
}: ReturnType<typeof getDialogAction>) {
  const { id, queryParam } = payload;
  try {
    const updatedQueryParam = {
      ...queryParam,
      limit: queryParam.limit || MESSAGE_QUERY_LIMIT,
    };

    const res: HttpResp<IDialog> = yield call(httpApi, {
      partUrl: `/message/dialogs/${id}?${encodeDataToUrl(updatedQueryParam)}`,
      method: 'GET',
    });

    if (res && !res.error) {
      const dialog: IDialog = {
        ...res.message,
        id,
      };

      yield put(makeAction(GET_DIALOG.SUCCESS, dialog));
      yield put(getUnreadMessageCountsAction(null));
    } else {
      yield put(makeAction(GET_DIALOG.FAILURE));
    }
  } catch (error) {
    yield put(makeAction(GET_DIALOG.FAILURE, error));
  }
}

function* getDialogWithCentrifuge({
  payload,
  params = {},
}: ReturnType<typeof getDialogWithCentrifugeAction>) {
  try {
    const selectedDialog: MessagesReducerState['selectedDialog'] = yield select(
      makeSelector(['messagesReducer', 'selectedDialog']),
    );

    yield put(
      getAllDialogsAction(null, {
        redirect: () => {
          if (selectedDialog?.id === payload) {
            store.dispatch(getDialogAction({ id: payload, queryParam: {} }));
          } else if (!selectedDialog) {
            store.dispatch(getUnreadMessageCountsAction(null));
          }
        },
      }),
    );
  } catch (error) {
    yield put(makeAction(GET_DIALOG_WITH_CENTRIFUGE.FAILURE, error));
  }
}

function* getUnreadMessageCounts({
  payload,
  params = {},
}: ReturnType<typeof getUnreadMessageCountsAction>) {
  try {
    const res: HttpResp<{ count: number }> = yield call(httpApi, {
      partUrl: `/message/unread`,
      method: 'GET',
    });
    if (res && !res.error) {
      yield put(
        makeAction(GET_UNREAD_MESSAGE_COUNTS.SUCCESS, res.message.count),
      );
    } else {
      yield put(makeAction(GET_UNREAD_MESSAGE_COUNTS.FAILURE));
    }
  } catch (error) {
    yield put(makeAction(GET_UNREAD_MESSAGE_COUNTS.FAILURE, error));
  }
}

function* deleteDialog({
  payload,
  params = {},
}: ReturnType<typeof deleteDialogAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/message/dialogs/${payload}`,
      method: 'DELETE',
    });
    if (res && !res.error) {
      yield put(makeAction(GET_DIALOG.SUCCESS, null));
      yield put(getAllDialogsAction(null));
      yield put(makeAction(DELETE_DIALOG.SUCCESS));
    } else {
      yield put(makeAction(DELETE_DIALOG.FAILURE));
    }
  } catch (error) {
    yield put(makeAction(DELETE_DIALOG.FAILURE, error));
  }
}

export function* messagesSaga() {
  yield takeLatest(CHECK_EXIST_USER.PENDING, checkExistUser);
  yield takeLatest(SEARCH_EXIST_USER.PENDING, searchExistUser);
  yield takeLatest(SEND_MESSAGE.PENDING, sendMessage);
  yield takeLatest(GET_ALL_DIALOGS.PENDING, getAllDialogs);
  yield takeLatest(GET_DIALOG.PENDING, getDialog);
  yield takeLatest(GET_DIALOG_WITH_CENTRIFUGE.PENDING, getDialogWithCentrifuge);
  yield takeLatest(GET_UNREAD_MESSAGE_COUNTS.PENDING, getUnreadMessageCounts);
  yield takeLatest(DELETE_DIALOG.PENDING, deleteDialog);
}
