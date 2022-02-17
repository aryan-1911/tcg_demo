import { getStaticPageAction } from 'actions';
import { GET_STATIC_PAGE } from 'const';
import { httpApi, HttpResp, makeAction } from 'helpers';
import { call, put, takeLatest } from 'redux-saga/effects';

function* getStaticPage({
  payload,
  params = {},
}: ReturnType<typeof getStaticPageAction>) {
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      method: 'GET',
      partUrl: `/static/${payload}`,
    });
    if (res && !res.error) {
      yield put(makeAction(GET_STATIC_PAGE.SUCCESS, { ...res, type: payload }));
      if (redirect) {
        redirect(res.message.data);
      }
    } else {
      yield put(makeAction(GET_STATIC_PAGE.FAILURE, { ...res, type: payload }));
    }
  } catch (error) {
    yield put(makeAction(GET_STATIC_PAGE.FAILURE, error));
  }
}

export function* staticPagesSaga() {
  yield takeLatest(GET_STATIC_PAGE.PENDING, getStaticPage);
}
