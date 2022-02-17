import { GET_STATIC_PAGE } from 'const';
import { makeCombinedAction } from 'helpers';
import Immutable from 'immutable';
import { StaticPageTypes } from 'interfaces';
import { handleActions } from 'redux-actions';


export interface StaticPagesReducerState {
  isLoading: boolean;
  termsAndConditionsData: string,
  privacyPolicyData: string,
  cookiePolicyData: string,
  sidebarShow: boolean | 'responsive';
}

// tslint:disable-next-line: no-object-literal-type-assertion
const initialState = Immutable.fromJS({
  isLoading: false,
  termsAndConditionsData: '',
  privacyPolicyData: '',
  cookiePolicyData: '',
} as StaticPagesReducerState);

const { PENDING, DONE, FAILURE } = makeCombinedAction(GET_STATIC_PAGE);

const staticPagesReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set('isLoading', true);
    },
    [`${FAILURE}||${DONE}`]: (state: any) => {
      return state.set('isLoading', false);
    },
    [GET_STATIC_PAGE.SUCCESS]: (state: any, { payload }) => {
      let { type } = payload;
      if (type === StaticPageTypes.TERMS) {
        return state.set('termsAndConditionsData', decodeURIComponent(payload.message.data));
      }

      if (type === StaticPageTypes.PRIVACY) {
        return state.set('privacyPolicyData', decodeURIComponent(payload.message.data));
      }

      if (type === StaticPageTypes.COOKIE) {
        return state.set('cookiePolicyData', decodeURIComponent(payload.message.data));
      }
    },
  },
  initialState,
);

export default staticPagesReducer;
