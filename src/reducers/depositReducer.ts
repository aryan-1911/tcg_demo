import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import { makeCombinedAction } from 'helpers';
import { ICreditCard } from 'interfaces';
import {
  ADD_FUNDS,
  CHOOSE_DEPOSIT_CARD,
  CREATE_DEPOSIT_CARD,
  DELETE_DEPOSIT_CARD,
  GET_PAYMENT_CARDS,
  WITHDRAW_MONEY,
} from 'const';

export interface DepositReducerState {
  isLoading: boolean;
  creditCards: ICreditCard[];
}

// tslint:disable-next-line: no-object-literal-type-assertion
const initialState = Immutable.fromJS({
  isLoading: false,
  creditCards: [],
} as DepositReducerState);

const { PENDING, DONE, FAILURE } = makeCombinedAction(
  CREATE_DEPOSIT_CARD,
  ADD_FUNDS,
  WITHDRAW_MONEY,
  GET_PAYMENT_CARDS,
  DELETE_DEPOSIT_CARD,
  CHOOSE_DEPOSIT_CARD,
);

const depositReducer = handleActions(
  {
    [PENDING]: (state: any) => {
      return state.set('isLoading', true);
    },
    [`${FAILURE}||${DONE}`]: (state: any) => {
      return state.set('isLoading', false);
    },
    [GET_PAYMENT_CARDS.SUCCESS]: (state: any, { payload }) => {
      return state.set('creditCards', Immutable.fromJS(payload));
    },
  },
  initialState,
);

export default depositReducer;
