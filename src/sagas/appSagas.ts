import { call, put, takeLatest } from 'redux-saga/effects';

import { makeAction, httpApi, HttpResp, getHeaders } from 'helpers';
import { uploadFileAction } from 'actions';
import { SentMedia } from 'reducers';
import { StatusCode, UPLOAD_FILE } from 'const';

function* uploadFile({ payload }: ReturnType<typeof uploadFileAction>) {
  const sentMedia: SentMedia = {
    url: '',
    status: 0,
    file: payload.file,
    id: payload.mapKey,
  };
  try {
    const formData = new FormData();
    formData.append('file', payload.file);

    const headers = getHeaders();
    headers['Content-Type'] = 'multipart/form-data';

    const res: HttpResp<{ url: string }> = yield call(httpApi, {
      headers,
      method: 'POST',
      partUrl: `/upload`,
      data: formData,
    });

    if (res && !res.error) {
      sentMedia.status = StatusCode.OK;
      sentMedia.url = res.url;
      yield put(makeAction(UPLOAD_FILE.SUCCESS, sentMedia));
    } else {
      sentMedia.status = res.status;
      yield put(makeAction(UPLOAD_FILE.FAILURE, sentMedia));
    }
  } catch (error) {
    sentMedia.status = StatusCode.INTERNAL_ERROR;
    yield put(makeAction(UPLOAD_FILE.FAILURE, sentMedia));
  }
}

export function* appSaga() {
  yield takeLatest(UPLOAD_FILE.PENDING, uploadFile);
}
