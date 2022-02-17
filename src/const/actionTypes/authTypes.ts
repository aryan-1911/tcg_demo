import { makeActionType } from 'helpers';

// AUTH
export const SIGN_IN = makeActionType('SIGN_IN');
export const SIGN_OUT = makeActionType('SIGN_OUT');
export const SIGN_UP = makeActionType('SIGN_UP');
export const EMAIL_CONFIRMATION = makeActionType('EMAIL_CONFIRMATION');
export const RESEND_EMAIL = makeActionType('RESEND_EMAIL');
export const SET_USER_PROFILE_INFO = makeActionType('SET_USER_PROFILE_INFO');
export const FORGOT_PASSWORD = makeActionType('FORGOT_PASSWORD');
export const CHANGE_PASSWORD = makeActionType('CHANGE_PASSWORD');
export const CONFIRM_RESET_PASSWORD = makeActionType('CONFIRM_RESET_PASSWORD');
export const CHANGE_EMAIL = makeActionType('CHANGE_EMAIL');
export const EDIT_USER_INFO = makeActionType('EDIT_USER_INFO');
export const PARTIAL_USER_INFO_EDITING = makeActionType(
  'PARTIAL_USER_INFO_EDITING',
);

// CENTRIFUGE
export const GET_CENTRIFUGE_TOKEN = makeActionType('GET_CENTRIFUGE_TOKEN');
