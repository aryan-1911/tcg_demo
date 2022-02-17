import { makeActionType } from 'helpers';

// DEPOSIT
export const GET_PAYMENT_CARDS = makeActionType('GET_PAYMENT_CARDS');
export const CREATE_DEPOSIT_CARD = makeActionType('CREATE_DEPOSIT_CARD');
export const CHOOSE_DEPOSIT_CARD = makeActionType('CHOOSE_DEPOSIT_CARD');
export const DELETE_DEPOSIT_CARD = makeActionType('DELETE_DEPOSIT_CARD');
export const ADD_FUNDS = makeActionType('ADD_FUNDS');
export const REEDEM_COUPON = makeActionType('REEDEM_COUPON');
export const WITHDRAW_MONEY = makeActionType('WITHDRAW_MONEY');
export const APPROVE_PAYPAL_DEPOSIT = makeActionType('APPROVE_PAYPAL_DEPOSIT');
