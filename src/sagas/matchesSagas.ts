import {
  acceptMatchAction, confirmOwnMatchAction, createMatchAction,
  declineDirectChallangeAction,
  deleteMatchAction, editMatchAction,
  fetchUserInfoAction, getCurrentMatchStateAction, getMatchesAction, sendMatchResultAction,
  toggleDetailMatchAction
} from 'actions';
import { ShowToastError, ShowToastSuccess } from 'Components/Toast';
import store from 'config/store';
import {
  ACCEPT_MATCH, CONFIRM_OWN_MATCH, CREATE_MATCH, DECLINE_DIRECT_CHALLANGE, DELETE_MATCH, EDIT_MATCH, GET_CURRENT_MATCH_STATE, GET_MATCHES, SEND_MATCH_RESULT
} from 'const';
import {
  encodeDataToUrl,
  httpApi,
  HttpResp,
  makeAction,
  makeSelector,
  prepareGetMatchesRequest
} from 'helpers';
import { IMatch, IUserProfileResp, QueryParams } from 'interfaces';
import { ICentrifugeAcceptMatch } from 'interfaces/centrifuge/match';
import { call, put, select, takeLatest } from 'redux-saga/effects';

function* getMatches({
  payload,
  params = {},
}: ReturnType<typeof getMatchesAction>) {
  const matchesQueryParams: QueryParams = yield select(
    makeSelector(['matchesReducer', 'matchesQueryParams']),
  );
  const { id: userId }: IUserProfileResp = yield select(
    makeSelector(['profileReducer', 'userData']),
  );

  const req = {
    ...matchesQueryParams,
    ...payload,
  };

  const preparedReq = prepareGetMatchesRequest(req, userId);

  const { redirect } = params;

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/competition/show?${encodeDataToUrl(preparedReq)}`,
      method: 'GET',
    });

    if (res && !res.error) {
      yield put(makeAction(GET_MATCHES.SUCCESS, res.message));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(GET_MATCHES.FAILURE, res.message));
    }
  } catch (error) {
    yield put(makeAction(GET_MATCHES.FAILURE, error));
  }
}

function* createMatch({
  payload,
  params = {},
}: ReturnType<typeof createMatchAction>) {
  const { redirect } = params;
  const matchesQueryParams: QueryParams = yield select(
    makeSelector(['matchesReducer', 'matchesQueryParams']),
  );
  try {
    const res: HttpResp<IMatch> = yield call(httpApi, {
      partUrl: `/competition/create`,
      method: 'POST',
      data: payload,
    });

    if (res && !res.error) {
      yield put(
        getMatchesAction(matchesQueryParams, {
          redirect: () => {
            store.dispatch(makeAction(CREATE_MATCH.SUCCESS));
            if (redirect) {
              redirect();
            }
            ShowToastSuccess({
              subtitle: 'Match created successfully!',
              btnTitle: 'View Match Details',
              onClick: () => {
                store.dispatch(toggleDetailMatchAction(res.message));
              },
            });
          },
        }),
      );
      yield put(fetchUserInfoAction(null));
    } else {
      ShowToastError({
        subtitle: res.description,
        btnTitle: 'Ok',
      });
      yield put(makeAction(CREATE_MATCH.FAILURE, res.message));
    }
  } catch (error) {
    yield put(makeAction(CREATE_MATCH.FAILURE, error));
  }
}


function* acceptMatch({
  payload,
  params = {},
}: ReturnType<typeof acceptMatchAction>) {
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/competition/accept/${payload}`,
      method: 'POST',
    });

    if (res && !res.error) {
      yield put(makeAction(ACCEPT_MATCH.SUCCESS));
    } else {
      yield put(makeAction(ACCEPT_MATCH.FAILURE, res.message));
      ShowToastError({ title: res.description });
    }
    if (redirect) {
      redirect(payload);
    }
  } catch (error) {
    yield put(makeAction(ACCEPT_MATCH.FAILURE, error));
  }
}

function* deleteMatch({
  payload,
  params = {},
}: ReturnType<typeof deleteMatchAction>) {
  const { redirect } = params;
  const matchesQueryParams: QueryParams = yield select(
    makeSelector(['matchesReducer', 'matchesQueryParams']),
  );
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/competition/delete/${payload}`,
      method: 'DELETE',
    });

    if (res && !res.error) {
      yield put(makeAction(DELETE_MATCH.SUCCESS));
      yield put(getMatchesAction(matchesQueryParams));
      yield put(fetchUserInfoAction(null));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(DELETE_MATCH.FAILURE, res.message));
    }
  } catch (error) {
    yield put(makeAction(DELETE_MATCH.FAILURE, error));
  }
}


function* declineDirectChallange({
  payload,
  params = {},
}: ReturnType<typeof declineDirectChallangeAction>) {
  const { redirect } = params;
  const matchesQueryParams: QueryParams = yield select(
    makeSelector(['matchesReducer', 'matchesQueryParams']),
  );
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/competition/decline/${payload}`,
      method: 'GET',
    });

    if (res && !res.error) {
      yield put(makeAction(DECLINE_DIRECT_CHALLANGE.SUCCESS));
      yield put(getMatchesAction(matchesQueryParams));
      yield put(fetchUserInfoAction(null));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(DECLINE_DIRECT_CHALLANGE.FAILURE, res.message));
    }
  } catch (error) {
    yield put(makeAction(DECLINE_DIRECT_CHALLANGE.FAILURE, error));
  }
}


function* editMatch({
  payload,
  params = {},
}: ReturnType<typeof editMatchAction>) {
  const { redirect } = params;
  const { id, ...rest } = payload;

  const matchesQueryParams: QueryParams = yield select(
    makeSelector(['matchesReducer', 'matchesQueryParams']),
  );

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/competition/edit/${id}`,
      method: 'PUT',
      data: rest,
    });
    if (res && !res.error) {
      yield put(makeAction(EDIT_MATCH.SUCCESS));
      yield put(getMatchesAction(matchesQueryParams));
      yield put(fetchUserInfoAction(null));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(EDIT_MATCH.FAILURE, res.message));
      ShowToastError({
        subtitle: res.description,
        btnTitle: 'Ok',
      });
    }
  } catch (error) {
    yield put(makeAction(EDIT_MATCH.FAILURE, error));
  }
}

function* confirmOwnMatch({
  payload,
  params = {},
}: ReturnType<typeof confirmOwnMatchAction>) {
  const { redirect } = params;
  const { id, type } = payload;
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/competition/accept/${id}/response/${type}`,
      method: 'POST',
    });
    if (res && !res.error) {
      yield put(makeAction(CONFIRM_OWN_MATCH.SUCCESS));
      if (redirect) {
        redirect(res);
      }
    } else {
      yield put(makeAction(CONFIRM_OWN_MATCH.FAILURE, res.message));
    }
  } catch (error) {
    yield put(makeAction(CONFIRM_OWN_MATCH.FAILURE, error));
  }
}

function* getCurrentMatchState({
  payload,
  params = {},
}: ReturnType<typeof getCurrentMatchStateAction>) {
  const { redirect } = params;

  try {
    const res: HttpResp<ICentrifugeAcceptMatch> = yield call(httpApi, {
      partUrl: `/competition/details/${payload}`,
      method: 'GET',
    });

    if (res && !res.error) {
      yield put(makeAction(GET_CURRENT_MATCH_STATE.SUCCESS, res.message));
      if (redirect) {
        redirect(res);
      }
    } else {
      yield put(makeAction(GET_CURRENT_MATCH_STATE.FAILURE, res.message));
    }
  } catch (error) {
    yield put(makeAction(GET_CURRENT_MATCH_STATE.FAILURE, error));
  }
}

function* sendMatchResult({
  payload,
  params = {},
}: ReturnType<typeof sendMatchResultAction>) {
  const { competitionId, winner } = payload;
  const { redirect } = params;

  try {
    const res: HttpResp<ICentrifugeAcceptMatch> = yield call(httpApi, {
      partUrl: `/competition/result/${competitionId}`,
      method: 'POST',
      data: { winner },
    });

    if (res && !res.error) {
      yield put(makeAction(SEND_MATCH_RESULT.SUCCESS, res.message));
      if (redirect) {
        redirect(res);
      }
    } else {
      yield put(makeAction(SEND_MATCH_RESULT.FAILURE, res.message));
    }
  } catch (error) {
    yield put(makeAction(SEND_MATCH_RESULT.FAILURE, error));
  }
}

export function* matchesSaga() {
  yield takeLatest(GET_MATCHES.PENDING, getMatches);
  yield takeLatest(CREATE_MATCH.PENDING, createMatch);
  yield takeLatest(ACCEPT_MATCH.PENDING, acceptMatch);
  yield takeLatest(DELETE_MATCH.PENDING, deleteMatch);
  yield takeLatest(DECLINE_DIRECT_CHALLANGE.PENDING, declineDirectChallange);
  yield takeLatest(EDIT_MATCH.PENDING, editMatch);
  yield takeLatest(CONFIRM_OWN_MATCH.PENDING, confirmOwnMatch);
  yield takeLatest(GET_CURRENT_MATCH_STATE.PENDING, getCurrentMatchState);
  yield takeLatest(SEND_MATCH_RESULT.PENDING, sendMatchResult);
}
