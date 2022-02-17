import {
  allowChallengeAction,
  blockUserAction,
  directChallengeAction,
  fetchUserInfoAction,
  getMatchesAction,
  getUserAction,
  getUserMatchesAction,
  toggleDetailMatchAction,
  unblockUserAction
} from 'actions';
import { ShowToastError, ShowToastSuccess } from 'Components/Toast';
import store from 'config/store';
import { ALLOW_CHALLENGE, BLOCK_USER, DIRECT_CHALLENGE, GET_USER, GET_USER_MATCHES, UNBLOCK_USER } from 'const';
import { encodeDataToUrl, httpApi, HttpResp, makeAction, makeSelector } from 'helpers';
import { IMatch, IUserProfileResp, QueryParams } from 'interfaces';
import { call, put, select, takeLatest } from 'redux-saga/effects';



function* getUser({ payload }: ReturnType<typeof getUserAction>) {
  try {
    const res: HttpResp<IUserProfileResp> = yield call(httpApi, {
      method: 'GET',
      partUrl: `/user/profile/${payload}`,
    });
    if (res && !res.error) {
      yield put(makeAction(GET_USER.SUCCESS, res));
      yield put(getUserMatchesAction({ user_id: res.id }));
    } else {
      yield put(makeAction(GET_USER.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_USER.FAILURE, error));
  }
}

function* getUserMatches({ payload }: ReturnType<typeof getUserMatchesAction>) {
  const req = {
    page: payload.page,
    user_id: payload.user_id,
    limit: payload.limit,
    all: true,
  };

  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/competition/show?${encodeDataToUrl(req)}`,
      method: 'GET',
    });

    if (res && !res.error) {
      yield put(makeAction(GET_USER_MATCHES.SUCCESS, res.message));
    } else {
      yield put(makeAction(GET_USER_MATCHES.FAILURE, res.message));
    }
  } catch (error) {
    yield put(makeAction(GET_USER_MATCHES.FAILURE, error));
  }
}

function* blockUser({
  payload,
  params = {},
}: ReturnType<typeof blockUserAction>) {
  try {
    const { redirect } = params;
    const res: HttpResp<IUserProfileResp> = yield call(httpApi, {
      method: 'POST',
      partUrl: `/user/block/${payload}`,
    });
    if (res && !res.error) {
      yield put(makeAction(BLOCK_USER.SUCCESS, res));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(BLOCK_USER.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(BLOCK_USER.FAILURE, error));
  }
}

function* directChallenge({
  payload,
  params = {},
}: ReturnType<typeof directChallengeAction>) {
  const matchesQueryParams: QueryParams = yield select(
    makeSelector(['matchesReducer', 'matchesQueryParams']),
  );
  try {
    const { redirect } = params;
    const res: HttpResp<IMatch> = yield call(httpApi, {
      method: 'POST',
      partUrl: `/competition/create_direct_challenge`,
      data: payload,
    });
    if (res && !res.error) {
      yield put(
        getMatchesAction(matchesQueryParams, {
          redirect: () => {
            if (redirect) {
              redirect();
            }
            ShowToastSuccess({
              subtitle: 'Direct Challage Created successfully!',
              btnTitle: 'View Match Details',
              onClick: () => {
                store.dispatch(toggleDetailMatchAction(res.message));
              },
            });
          },
        }),
      );
      yield put(makeAction(DIRECT_CHALLENGE.SUCCESS, res));
      if (redirect) {
        redirect();
      }
    } else {
      ShowToastError({
        subtitle: res.description,
        btnTitle: 'Ok',
      });
      yield put(makeAction(DIRECT_CHALLENGE.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(DIRECT_CHALLENGE.FAILURE, error));
  }
}


function* allowChallenge({
  payload,
  params = {},
}: ReturnType<typeof allowChallengeAction>) {
  let { id, isAllow } = payload;
  try {
    const { redirect } = params;
    const res: HttpResp<any> = yield call(httpApi, {
      method: 'POST',
      partUrl: `/user/allow_challenge/${id}/${isAllow}`,
      data: payload,
    });
    if (res && !res.error) {
      ShowToastSuccess({
        subtitle: 'Successfully updated',
        btnTitle: 'Ok',
      });
      yield put(fetchUserInfoAction(null));
    } else {
      ShowToastError({
        subtitle: res.description,
        btnTitle: 'Ok',
      });
    }
  } catch (error) {

  }
}

function* unblockUser({
  payload,
  params = {},
}: ReturnType<typeof unblockUserAction>) {
  try {
    const { redirect } = params;
    const res: HttpResp<IUserProfileResp> = yield call(httpApi, {
      method: 'DELETE',
      partUrl: `/user/block/${payload}`,
    });
    if (res && !res.error) {
      yield put(makeAction(UNBLOCK_USER.SUCCESS, res));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(UNBLOCK_USER.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(UNBLOCK_USER.FAILURE, error));
  }
}

export function* userSaga() {
  yield takeLatest(GET_USER.PENDING, getUser);
  yield takeLatest(GET_USER_MATCHES.PENDING, getUserMatches);
  yield takeLatest(BLOCK_USER.PENDING, blockUser);
  yield takeLatest(BLOCK_USER.PENDING, unblockUser);
  yield takeLatest(DIRECT_CHALLENGE.PENDING, directChallenge);
  yield takeLatest(ALLOW_CHALLENGE.PENDING, allowChallenge);
}
