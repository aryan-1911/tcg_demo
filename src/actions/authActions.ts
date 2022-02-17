import {
  CHANGE_EMAIL, CHANGE_PASSWORD, CONFIRM_RESET_PASSWORD, EMAIL_CONFIRMATION, FORGOT_PASSWORD, RESEND_EMAIL, SET_USER_PROFILE_INFO, SIGN_IN,
  SIGN_OUT,
  SIGN_UP
} from 'const';
import {
  IActionFn, IChangeEmail,
  IChangePassword, ISignInAction, ISignUpAction, IUserProfileInfo
} from 'interfaces';

export const signInAction: IActionFn<ISignInAction> = (payload, params) => ({
  payload,
  params,
  type: SIGN_IN.PENDING,
});

export const signOutAction: IActionFn = (payload) => ({
  payload,
  type: SIGN_OUT.PENDING,
});

export const signUpAction: IActionFn<ISignUpAction> = (payload, params) => ({
  payload,
  params,
  type: SIGN_UP.PENDING,
});

export const emailConfirmationAction: IActionFn<{ act: string }> = (
  payload,
  params,
) => {
  return {
    payload,
    params,
    type: EMAIL_CONFIRMATION.PENDING,
  }
};

export const resendEmailAction: IActionFn = (payload, params) => ({
  payload,
  params,
  type: RESEND_EMAIL.PENDING,
});

export const setUserProfileInfoAction: IActionFn<IUserProfileInfo> = (
  payload,
) => ({
  payload,
  type: SET_USER_PROFILE_INFO.PENDING,
});

export const forgotPasswordAction: IActionFn<{ email: string }> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: FORGOT_PASSWORD.PENDING,
});

export const changeEmailAction: IActionFn<IChangeEmail> = (payload) => ({
  payload,
  type: CHANGE_EMAIL.PENDING,
});

export const changePasswordAction: IActionFn<IChangePassword> = (payload) => ({
  payload,
  type: CHANGE_PASSWORD.PENDING,
});

export const confirmResetPasswordAction: IActionFn<{
  id: string;
  hash: string;
  password: string;
}> = (payload, params) => ({
  payload,
  params,
  type: CONFIRM_RESET_PASSWORD.PENDING,
});
