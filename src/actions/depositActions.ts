import { Stripe } from '@stripe/stripe-js';
import {
  ADD_FUNDS,
  APPROVE_PAYPAL_DEPOSIT,
  CHOOSE_DEPOSIT_CARD,
  CREATE_DEPOSIT_CARD,
  DELETE_DEPOSIT_CARD,
  GET_PAYMENT_CARDS,
  REEDEM_COUPON,
  WITHDRAW_MONEY
} from 'const';
import { IActionFn, ICardInputData } from 'interfaces';

export const getPaymentCardsdAction: IActionFn<null> = (payload, params) => ({
  payload,
  params,
  type: GET_PAYMENT_CARDS.PENDING,
});

export const createDepositCardAction: IActionFn<ICardInputData> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: CREATE_DEPOSIT_CARD.PENDING,
});

export const chooseDepositCardAction: IActionFn<string> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: CHOOSE_DEPOSIT_CARD.PENDING,
});

export const deleteDepositCardAction: IActionFn<string> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: DELETE_DEPOSIT_CARD.PENDING,
});

export const addFundsAction: IActionFn<{
  amount: number | '';
  cardId: string;
  stripe: Stripe;
}> = (payload, params) => {
  return ({
    payload,
    params,
    type: ADD_FUNDS.PENDING,
  })
};

export const reedemCouponAction: IActionFn<{
  redeemCouponCode: string;
}> = (payload, params) => {
  return ({
    payload,
    params,
    type: REEDEM_COUPON.PENDING,
  })
};

export const withDrawMoneyAction: IActionFn<{
  amount: number | '';
  email: string;
}> = (payload, params) => ({
  payload,
  params,
  type: WITHDRAW_MONEY.PENDING,
});

export const approvePaypalDepositAction: IActionFn<object> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: APPROVE_PAYPAL_DEPOSIT.PENDING,
});
