import {
  applyForAffiliationAction,
  contactQueryAction,
  editUserInfoAction,
  fetchUserInfoAction,
  getProfileMatchesAction,
  partialUserInfoEditingAction
} from 'actions';
import { ShowToastError, ShowToastSuccess } from 'Components/Toast';
import {
  APPLY_FOR_AFFILIATION,
  CONTACT_QUERY,
  EDIT_USER_INFO,
  ERROR_INGAMENAME_TAKEN,
  FETCH_USER_INFO,
  GET_CENTRIFUGE_TOKEN,
  GET_DIFF_SYSTEM_TIME,
  GET_PROFILE_MATCHES,
  PARTIAL_USER_INFO_EDITING
} from 'const';
import {
  encodeDataToUrl, getFormData, getTimeDiff, headerWithToken,
  httpApi,
  HttpResp,
  makeAction, prepareContactUsRequestData, preparePartialUserEditInfo
} from 'helpers';
import { ITokenResp, IUserProfileResp } from 'interfaces';
import { call, put, takeLatest } from 'redux-saga/effects';

function* editUserInfo({ payload }: ReturnType<typeof editUserInfoAction>) {
  try {

    const phoneArr = payload.phone.split(' ');

    const res: HttpResp<ITokenResp> = yield call(httpApi, {
      method: 'POST',
      partUrl: '/user/edit',
      data: {
        ...payload,
        phone: phoneArr[1] === 'null' ? null : phoneArr[1],
        prefix: phoneArr[0].replace('+', ''),
      },
    });
    if (res && !res.error) {
      yield put(makeAction(EDIT_USER_INFO.SUCCESS, res));
      yield put(makeAction(FETCH_USER_INFO.PENDING));
      ShowToastSuccess({ title: 'Profile has been updated.' });
    } else {
      const title = res.description.includes(ERROR_INGAMENAME_TAKEN)
        ? res.description.split('. ')
        : res.description;

      ShowToastError({
        title: title,
      });
      yield put(makeAction(EDIT_USER_INFO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(EDIT_USER_INFO.FAILURE, error));
  }
}

function* fetchUserInfo({ payload }: ReturnType<typeof fetchUserInfoAction>) {
  try {
    const res: HttpResp<IUserProfileResp> = yield call(httpApi, {
      method: 'GET',
      partUrl: '/user/profile',
      isHeadersDateShow: true,
    });
    if (res && !res.error) {
      yield put(makeAction(FETCH_USER_INFO.SUCCESS, res));
      yield put(makeAction(GET_DIFF_SYSTEM_TIME, getTimeDiff(res.date)));
      yield put(getProfileMatchesAction({ user_id: res.id }));
    } else {
      yield put(makeAction(FETCH_USER_INFO.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(FETCH_USER_INFO.FAILURE, error));
  }
}

function* partialUserEditionInfo({
  payload,
  params = {},
}: ReturnType<typeof partialUserInfoEditingAction>) {
  const { redirect } = params;
  const preparedData = preparePartialUserEditInfo(payload);
  try {
    const res: HttpResp<ITokenResp> = yield call(httpApi, {
      method: 'POST',
      partUrl: '/user/submit',
      data: preparedData,
    });
    if (res && !res.error) {
      yield put(makeAction(PARTIAL_USER_INFO_EDITING.SUCCESS, res));
      if (redirect) {
        redirect();
      }
    } else {
      let resArr = res.description.split('. ');
      let inGameError = res.description.includes('This in-game name is already taken, please create another one.');
      let titleArr = resArr.map((item) => item.split(':')[0]);
      let subtitleArr = resArr.map((item) => item.split(':')[1]);
      if (inGameError) {
        ShowToastError({
          title: titleArr,
          subtitle: subtitleArr[0],
        });
      } else {
        ShowToastError({
          title: resArr,
          subtitle: 'Please check your details and try again.',
        });
      }
      yield put(makeAction(PARTIAL_USER_INFO_EDITING.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(PARTIAL_USER_INFO_EDITING.FAILURE, error));
  }
}

function* contactQuery({ payload }: ReturnType<typeof contactQueryAction>) {
  const preparedData = prepareContactUsRequestData(payload);
  try {
    const res: HttpResp = yield call(httpApi, {
      method: 'POST',
      partUrl: '/feedback/contact_us',
      data: getFormData(preparedData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headerWithToken(),
      },
    });
    if (res && !res.error) {
      yield put(makeAction(CONTACT_QUERY.SUCCESS, res));
      ShowToastSuccess({
        title: 'Thanks for contacting us.',
        subtitle: 'We will contact you as soon as possible.',
      });
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(CONTACT_QUERY.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(CONTACT_QUERY.FAILURE, error));
  }
}

function* applyForAffiliation({ params = {} }: ReturnType<typeof applyForAffiliationAction>) {
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      method: 'POST',
      partUrl: '/affiliate_request/add',
    });
    if (res && !res.error) {
      yield put(makeAction(APPLY_FOR_AFFILIATION.SUCCESS, res.message));
      ShowToastSuccess({
        subtitle: 'Your affiliate request is submitted.',
      });
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(APPLY_FOR_AFFILIATION.FAILURE, res));
      ShowToastError({
        title: res.description,
      });
    }
  } catch (error) {
  }
}


function* getCentrifugeToken() {
  try {
    const res: HttpResp = yield call(httpApi, {
      method: 'GET',
      partUrl: '/auth/messenger',
    });
    if (res && !res.error) {
      yield put(makeAction(GET_CENTRIFUGE_TOKEN.SUCCESS, res.message));
    } else {
      yield put(makeAction(GET_CENTRIFUGE_TOKEN.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(GET_CENTRIFUGE_TOKEN.FAILURE, error));
  }
}

function* getProfileMatches({
  payload,
}: ReturnType<typeof getProfileMatchesAction>) {
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
      yield put(makeAction(GET_PROFILE_MATCHES.SUCCESS, res.message));
    } else {
      yield put(makeAction(GET_PROFILE_MATCHES.FAILURE, res.message));
    }
  } catch (error) {
    yield put(makeAction(GET_PROFILE_MATCHES.FAILURE, error));
  }
}

export function* profileSaga() {
  yield takeLatest(EDIT_USER_INFO.PENDING, editUserInfo);
  yield takeLatest(FETCH_USER_INFO.PENDING, fetchUserInfo);
  yield takeLatest(PARTIAL_USER_INFO_EDITING.PENDING, partialUserEditionInfo);
  yield takeLatest(CONTACT_QUERY.PENDING, contactQuery);
  yield takeLatest(GET_CENTRIFUGE_TOKEN.PENDING, getCentrifugeToken);
  yield takeLatest(APPLY_FOR_AFFILIATION.PENDING, applyForAffiliation);
  yield takeLatest(GET_PROFILE_MATCHES.PENDING, getProfileMatches);
}
