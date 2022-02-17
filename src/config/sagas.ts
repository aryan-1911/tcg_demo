import { all, fork } from 'redux-saga/effects';
import {
  appSaga,
  authSaga,
  disputeSaga,
  matchesSaga,
  profileSaga,
  depositSaga,
  userSaga,
  messagesSaga,
  staticPagesSaga,
} from 'sagas';

export default function* root() {
  yield all([fork(appSaga)]);
  yield all([fork(authSaga)]);
  yield all([fork(disputeSaga)]);
  yield all([fork(matchesSaga)]);
  yield all([fork(profileSaga)]);
  yield all([fork(depositSaga)]);
  yield all([fork(userSaga)]);
  yield all([fork(messagesSaga)]);
  yield all([fork(staticPagesSaga)]);
}
