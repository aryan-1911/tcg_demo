import {
  addFundsAction,
  approvePaypalDepositAction,
  chooseDepositCardAction,
  createDepositCardAction,
  deleteDepositCardAction, fetchUserInfoAction, getPaymentCardsdAction,
  reedemCouponAction,
  withDrawMoneyAction
} from 'actions';
import { ShowToastError, ShowToastSuccess } from 'Components/Toast';
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
import {
  httpApi,
  HttpResp,
  makeAction,
  prepareCreditCardRequest
} from 'helpers';
import { call, put, takeLatest } from 'redux-saga/effects';

function* getPaymentCards({
  payload,
  params = {},
}: ReturnType<typeof getPaymentCardsdAction>) {
  try {
    const { redirect } = params;

    const res: HttpResp = yield call(httpApi, {
      partUrl: '/payment/card/info',
      method: 'GET',
    });
    if (res && !res.error) {
      yield put(makeAction(GET_PAYMENT_CARDS.SUCCESS, res.message || []));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(GET_PAYMENT_CARDS.FAILURE, res.description));
    }
  } catch (error) {
    yield put(makeAction(GET_PAYMENT_CARDS.FAILURE, error));
  }
}

function* createDepositCard({
  payload,
  params = {},
}: ReturnType<typeof createDepositCardAction>) {
  try {
    const { redirect } = params;

    const preparedData = prepareCreditCardRequest(payload);

    const res: HttpResp = yield call(httpApi, {
      partUrl: '/payment/card/add/stripe',
      method: 'POST',
      data: preparedData,
    });

    if (res && !res.error) {
      yield put(makeAction(CREATE_DEPOSIT_CARD.SUCCESS));
      yield put(getPaymentCardsdAction(null));
      if (redirect) {
        redirect();
      }
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(CREATE_DEPOSIT_CARD.FAILURE, res.description));
    }
  } catch (error) {
    yield put(makeAction(CREATE_DEPOSIT_CARD.FAILURE, error));
  }
}

function* chooseDepositCard({
  payload,
  params = {},
}: ReturnType<typeof chooseDepositCardAction>) {
  try {
    const { redirect } = params;
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/payment/card/main/stripe/${payload}`,
      method: 'POST',
    });

    if (res && !res.error) {
      yield put(makeAction(CHOOSE_DEPOSIT_CARD.SUCCESS));
      yield put(getPaymentCardsdAction(null));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(CHOOSE_DEPOSIT_CARD.FAILURE, res.description));
    }
  } catch (error) {
    yield put(makeAction(CHOOSE_DEPOSIT_CARD.FAILURE, error));
  }
}

function* deleteDepositCard({
  payload,
  params = {},
}: ReturnType<typeof deleteDepositCardAction>) {
  try {
    const { redirect } = params;

    const res: HttpResp = yield call(httpApi, {
      partUrl: `/payment/card/remove/stripe/${payload}`,
      method: 'DELETE',
    });

    if (res && !res.error) {
      yield put(makeAction(DELETE_DEPOSIT_CARD.SUCCESS));
      yield put(getPaymentCardsdAction(null));
      if (redirect) {
        redirect();
      }
    } else {
      yield put(makeAction(DELETE_DEPOSIT_CARD.FAILURE, res.description));
    }
  } catch (error) {
    yield put(makeAction(DELETE_DEPOSIT_CARD.FAILURE, error));
  }
}

function* addFunds({
  payload,
  params = {},
}: ReturnType<typeof addFundsAction>) {
  try {
    const { redirect } = params;
    const { stripe, ...req } = payload;
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/payment/new/stripe`,
      method: 'POST',
      data: { ...req },
    });
    if (res && !res.error) {
      const { client_secret } = res.message;
      const data = yield stripe.confirmCardPayment(client_secret);
      if (data.paymentIntent?.status === 'succeeded') {
        ShowToastSuccess({
          title: 'Payment successful!',
        });
        yield put(makeAction(ADD_FUNDS.SUCCESS));
        if (redirect) {
          redirect(res);
        }
      } else {
        ShowToastError({
          title: data.error?.message,
        });
        yield put(makeAction(ADD_FUNDS.FAILURE, res.description));
      }
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(ADD_FUNDS.FAILURE, res.description));
    }
  } catch (error) {
    yield put(makeAction(ADD_FUNDS.FAILURE, error));
  }
}

function* reedemCoupon({
  payload,
  params = {},
}: ReturnType<typeof reedemCouponAction>) {
  try {
    const { redirect } = params;
    const { redeemCouponCode, ...req } = payload;
    let coupon = payload?.redeemCouponCode;
    const res: HttpResp = yield call(httpApi, {
      partUrl: `/coupon/redeem/${coupon}`,
      method: 'POST',
      data: { ...req },
    });
    if (res && !res.error) {
      ShowToastSuccess({
        title: 'Reedem successful!',
      });
      yield put(makeAction(REEDEM_COUPON.SUCCESS));
      if (redirect) {
        redirect(res);
      }
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(REEDEM_COUPON.FAILURE, res.description));
    }
  } catch (error) {
    yield put(makeAction(REEDEM_COUPON.FAILURE, error));
  }
}

function* withdrawMoney({
  payload,
  params = {},
}: ReturnType<typeof withDrawMoneyAction>) {
  try {
    const { redirect } = params;

    const res: HttpResp = yield call(httpApi, {
      partUrl: `/payment/payout/paypal`,
      method: 'POST',
      data: payload,
    });

    if (res && !res.error) {
      yield put(makeAction(WITHDRAW_MONEY.SUCCESS, payload));
      yield put(fetchUserInfoAction(null));
      ShowToastSuccess({
        title: 'Withdraw Successful!',
      });
      if (redirect) {
        redirect(res);
      }
    } else {
      if (redirect) {
        redirect(res);
      }
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(WITHDRAW_MONEY.FAILURE, res.description));
    }
  } catch (error) {
    yield put(makeAction(WITHDRAW_MONEY.FAILURE, error));
  }
}

function* approvePaypalDeposit({
  payload,
  params = {},
}: ReturnType<typeof approvePaypalDepositAction>) {
  try {
    const { redirect } = params;

    const res: HttpResp = yield call(httpApi, {
      partUrl: `/payment/paypal/capture`,
      method: 'POST',
      data: payload,
    });

    if (res && !res.error) {
      ShowToastSuccess({
        title: 'Payment successful!',
      });
      yield put(makeAction(APPROVE_PAYPAL_DEPOSIT.SUCCESS));
      if (redirect) {
        redirect(res);
      }
    } else {
      ShowToastError({
        title: res.description,
      });
      yield put(makeAction(APPROVE_PAYPAL_DEPOSIT.FAILURE, res.description));
      if (redirect) {
        redirect(res);
      }
    }
  } catch (error) {
    yield put(makeAction(APPROVE_PAYPAL_DEPOSIT.FAILURE, error));
  }
}

export function* depositSaga() {
  yield takeLatest(GET_PAYMENT_CARDS.PENDING, getPaymentCards);
  yield takeLatest(CREATE_DEPOSIT_CARD.PENDING, createDepositCard);
  yield takeLatest(CHOOSE_DEPOSIT_CARD.PENDING, chooseDepositCard);
  yield takeLatest(DELETE_DEPOSIT_CARD.PENDING, deleteDepositCard);
  yield takeLatest(ADD_FUNDS.PENDING, addFunds);
  yield takeLatest(REEDEM_COUPON.PENDING, reedemCoupon);
  yield takeLatest(WITHDRAW_MONEY.PENDING, withdrawMoney);
  yield takeLatest(APPROVE_PAYPAL_DEPOSIT.PENDING, approvePaypalDeposit);
}
