import { createDisputeAction, fetchUserInfoAction } from 'actions';
import { ShowToastError, ShowToastSuccess } from 'Components/Toast';
import { CREATE_DISPUTE } from 'const';
import {
  getFormData,
  headerWithToken,
  httpApi,
  HttpResp,
  makeAction, prepareDisputeRequestData
} from 'helpers';
import { call, put, takeLatest } from 'redux-saga/effects';


function* createDispute({
  payload,
  params = {},
}: ReturnType<typeof createDisputeAction>) {
  try {
    const { redirect } = params;
    const preparedData = prepareDisputeRequestData(payload);

    const res: HttpResp<string> = yield call(httpApi, {
      partUrl: '/dispute/add',
      method: 'POST',
      data: getFormData(preparedData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headerWithToken(),
      },
    });
    if (res && !res.error) {
      yield put(makeAction(CREATE_DISPUTE.SUCCESS));
      ShowToastSuccess({
        title: "Submitted.",
        subtitle: "Please give us up to 24 hours to solve your dispute.",
        btnTitle: "Ok",
        onClick: () => window.location.reload(),
      });
      yield put(fetchUserInfoAction(null));
      if (redirect) {
        redirect({ res, payload });
      }
    } else {
      ShowToastError({
        title: res.description,
      });
      if (redirect) {
        redirect({ res, payload });
      }
      yield put(makeAction(CREATE_DISPUTE.FAILURE, res.description));
    }
  } catch (error) {
    yield put(makeAction(CREATE_DISPUTE.FAILURE, error));
  }
}

export function* disputeSaga() {
  yield takeLatest(CREATE_DISPUTE.PENDING, createDispute);
}
