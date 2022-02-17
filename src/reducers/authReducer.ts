import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD, CONTACT_QUERY,
  EMAIL_CONFIRMATION, FORGOT_PASSWORD, RESEND_EMAIL, RESET_CONTACT_FORM, SIGN_IN, SIGN_OUT, SIGN_UP
} from 'const';
import { ContactUsType } from 'const/contactUsStatuses';
import { makeCombinedAction } from 'helpers';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';



const { PENDING, DONE, FAILURE } = makeCombinedAction(
  SIGN_IN,
  SIGN_UP,
  FORGOT_PASSWORD,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CONTACT_QUERY,
  EMAIL_CONFIRMATION,
  RESET_CONTACT_FORM,
  RESEND_EMAIL,
);

interface IAuthReducerState {
  isLoading: boolean;
  isMessageSent: ContactUsType;
  logedOut: boolean;
}

const initialState = Immutable.fromJS({
  isLoading: false,
  isMessageSent: '',
  logedOut: false,
} as IAuthReducerState);

const authReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set('isLoading', true);
    },
    [`${FAILURE}||${DONE}`]: (state: any) => {
      return state.set('isLoading', false);
    },
    [CONTACT_QUERY.SUCCESS]: (state: any, { payload }) => {
      return state.set('isMessageSent', Immutable.fromJS(payload.status));
    },
    [RESET_CONTACT_FORM.PENDING]: (state: any, { payload }) => {
      return state
        .set('isMessageSent', Immutable.fromJS(payload))
        .set('isLoading', Immutable.fromJS(false));
    },
    [SIGN_OUT.SUCCESS]: (state) => {
      return state.set('logedOut', true);
    },
  },
  initialState,
);

export default authReducer;
