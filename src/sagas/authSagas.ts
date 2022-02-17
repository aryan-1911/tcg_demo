import {
  changeEmailAction,
  changePasswordAction, confirmResetPasswordAction, emailConfirmationAction, forgotPasswordAction, resendEmailAction, signInAction,
  signOutAction,
  signUpAction
} from 'actions';
import { ShowToastError, ShowToastSuccess } from 'Components/Toast';
import history from 'config/history';
import {
  AuthRoute, CHANGE_EMAIL, CHANGE_PASSWORD, CONFIRM_RESET_PASSWORD, EMAIL_CONFIRMATION, FORGOT_PASSWORD, ProfileRoute, RegistrationRoute, RESEND_EMAIL, SIGN_IN,
  SIGN_OUT,
  SIGN_UP
} from 'const';
import {
  encodeDataToUrl,
  httpApi,
  HttpResp,
  makeAction,
  session
} from 'helpers';
import {
  IConfirmEmail,
  ISignInResp,
  ISignUpResp,
  ITokenResp
} from 'interfaces';
import { call, put, takeLatest } from 'redux-saga/effects';


const authHeaders = {
  'Content-Type': 'application/json',
};

function* confirmEmail({
  payload,
  params = {},
}: ReturnType<typeof emailConfirmationAction>) {
  const { redirect } = params;
  try {
    const res: HttpResp<ITokenResp & IConfirmEmail> = yield call(httpApi, {
      method: 'POST',
      partUrl: `/user/verify_email/${payload.act}`,
      headers: authHeaders,
    });
    if (res && !res.error) {

      yield put(makeAction(EMAIL_CONFIRMATION.SUCCESS, res));
      session.saveData({
        token: res.token,
        refresh_token: '',
      });
      if (redirect) {
        if (res.userIsNew) {
          redirect(RegistrationRoute.USER_PROFILE_INFO);
        } else {
          redirect(ProfileRoute.ROOT);
        }
      }
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(EMAIL_CONFIRMATION.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(EMAIL_CONFIRMATION.FAILURE, error));
  }
}

function* signUp({ payload, params = {} }: ReturnType<typeof signUpAction>) {
  const { username, fullname, birthdate, password, email, referral_code } = payload;
  let data: any = {
    username,
    fullname,
    birthdate,
    password,
    email,
  }
  if (!!referral_code) {
    data.referral_code = referral_code;
  }
  const { redirect } = params;
  try {
    const res: HttpResp<ISignUpResp> = yield call(httpApi, {
      method: 'POST',
      partUrl: '/user/signup',
      headers: authHeaders,
      data,
    });
    if (res && !res.error) {
      yield put(makeAction(SIGN_UP.SUCCESS, res));

      session.saveData({
        token: res.token,
        refresh_token: '',
      });

      if (redirect) {
        redirect();
      }
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(SIGN_UP.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(SIGN_UP.FAILURE, error));
  }
}

function* signIn({ payload, params = {} }: ReturnType<typeof signInAction>) {
  const { password, email } = payload;
  const { redirect } = params;
  try {
    const res: HttpResp<ISignInResp> = yield call(httpApi, {
      method: 'POST',
      partUrl: '/user/login',
      headers: authHeaders,
      data: {
        email,
        password,
      },
    });

    if (res && !res.error) {
      yield put(makeAction(SIGN_IN.SUCCESS, res));
      session.saveData({
        token: res.token,
        refresh_token: '',
      });
      if (redirect) {
        redirect();
      }
      window.location.reload();
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(SIGN_IN.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(SIGN_IN.FAILURE, error));
  }
}

function* signOut({ payload }: ReturnType<typeof signOutAction>) {
  yield put(makeAction(SIGN_OUT.SUCCESS));
  history.push(AuthRoute.ROOT);
  session.clearData();
  localStorage.removeItem('userId');
  try {
    yield call(httpApi, {
      partUrl: '/user/logout',
    });
  } catch (error) {
    yield put(makeAction(SIGN_OUT.FAILURE, error));
  }
}

const refreshToken = (): { payload: string } => ({ payload: '' });
export function* refreshTokenSaga({
  payload,
}: ReturnType<typeof refreshToken>): any {
  try {
    const resp: HttpResp<ISignInResp> = yield call(httpApi, {
      method: 'POST',
      partUrl: '/oauth/token',
      data: encodeDataToUrl({
        grant_type: 'refresh_token',
        refresh_token: payload,
      }),
    });
    if (resp && !resp.error) {
      session.saveData(resp);
    }
  } catch (error) {
  }
}

function* changeEmail({ payload }: ReturnType<typeof changeEmailAction>) {
  const { email, password } = payload;
  try {
    const res: HttpResp<ITokenResp> = yield call(httpApi, {
      method: 'POST',
      partUrl: '/user/change_email',
      data: {
        email,
        password,
      },
    });
    if (res && !res.error) {
      yield put(makeAction(CHANGE_EMAIL.SUCCESS, res));
      ShowToastSuccess({
        title: 'Please check inbox of your new email to confirm it',
      });
      yield put(signOutAction(null));
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(CHANGE_EMAIL.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(CHANGE_EMAIL.FAILURE, error));
  }
}

function* changePassword({ payload }: ReturnType<typeof changePasswordAction>) {
  const { confirm_password, current_password, new_password } = payload;
  try {
    const res: HttpResp<ITokenResp> = yield call(httpApi, {
      method: 'POST',
      partUrl: '/user/change_password',
      data: {
        current_password,
        new_password,
        confirm_password,
      },
    });
    if (res && !res.error) {
      session.saveData({
        token: res?.token,
        refresh_token: '',
      });
      yield put(makeAction(CHANGE_PASSWORD.SUCCESS, res));
      ShowToastSuccess({
        title: 'Your password has been changed!',
      });
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(CHANGE_PASSWORD.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(CHANGE_PASSWORD.FAILURE, error));
  }
}

function* forgotPassword({
  payload,
  params = {},
}: ReturnType<typeof forgotPasswordAction>) {
  const { email } = payload;
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      method: 'POST',
      partUrl: '/user/remind_password',
      data: {
        email,
      },
    });
    if (res && !res.error) {
      yield put(makeAction(FORGOT_PASSWORD.SUCCESS, res));
      ShowToastSuccess({
        title: 'Check your email',
      });
      if (redirect) {
        redirect();
      }
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(FORGOT_PASSWORD.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(FORGOT_PASSWORD.FAILURE, error));
  }
}

function* confirmResetPassword({
  payload,
  params = {},
}: ReturnType<typeof confirmResetPasswordAction>) {
  const { hash, id, password } = payload;
  const { redirect } = params;
  try {
    const res: HttpResp = yield call(httpApi, {
      method: 'POST',
      partUrl: `/user/remind_password_change/${id}?hash=${hash}`,
      data: {
        password,
      },
    });
    if (res && !res.error) {
      yield put(makeAction(CONFIRM_RESET_PASSWORD.SUCCESS, res));
      ShowToastSuccess({
        title: 'Your password has been changed!',
      });
      if (redirect) {
        redirect();
      }
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(CONFIRM_RESET_PASSWORD.FAILURE, res));
    }
  } catch (error) {
    yield put(makeAction(CONFIRM_RESET_PASSWORD.FAILURE, error));
  }
}

function* resendEmail({
  payload,
  params = {},
}: ReturnType<typeof resendEmailAction>) {
  try {
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/user/resend_email`,
      method: 'POST',
    });
    if (res && !res.error) {
      ShowToastSuccess({
        title: 'Check your email.',
      });
      yield put(makeAction(RESEND_EMAIL.SUCCESS));
    } else {
      yield put(makeAction(RESEND_EMAIL.FAILURE));
    }
  } catch (error) {
    yield put(makeAction(RESEND_EMAIL.FAILURE, error));
  }
}

export function* authSaga() {
  yield takeLatest(SIGN_IN.PENDING, signIn);
  // yield takeLatest(REFRESH_TOKEN, refreshTokenSaga); // Don't use it! (check httpApi)
  yield takeLatest(SIGN_OUT.PENDING, signOut);
  yield takeLatest(SIGN_UP.PENDING, signUp);
  yield takeLatest(FORGOT_PASSWORD.PENDING, forgotPassword);
  yield takeLatest(CHANGE_EMAIL.PENDING, changeEmail);
  yield takeLatest(CHANGE_PASSWORD.PENDING, changePassword);
  yield takeLatest(EMAIL_CONFIRMATION.PENDING, confirmEmail);
  yield takeLatest(CONFIRM_RESET_PASSWORD.PENDING, confirmResetPassword);
  yield takeLatest(RESEND_EMAIL.PENDING, resendEmail);
}
