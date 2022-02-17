import { Icon, IconButton, Tooltip } from '@material-ui/core';
import {
  addFundsAction,
  getMatchesAction,
  getPaymentCardsdAction,
  reedemCouponAction,
  withDrawMoneyAction
} from 'actions';
import { Button } from 'Components/common/form';
import CreditCards from 'Components/CreditCards';
import DepositBalance from 'Components/DepositBalance';
import { CreateCreditCardModal } from 'Components/Modals';
import PageHeader from 'Components/PageHeader';
import { ShowToastError } from 'Components/Toast';
import { MAX_WITHDROW_MONEY, TAX_FORM_LINK } from 'const';
import { depostMessages, TAX_FORM_TOOLTIP } from 'const/deposit/deposit';
import { CreateCreditCardContex } from 'context';
import { downloadFile, makeSelector } from 'helpers';
import { useFormInModal, usePagination } from 'hooks';
import { IUserProfileResp } from 'interfaces';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DepositReducerState } from 'reducers';
import './deposit-page.scss';

function DepositPage() {
  const dispatch = useDispatch();
  const { creditCards } = useSelector<any, DepositReducerState>(
    makeSelector(['depositReducer']),
  );

  const {
    balance: currentBalance,
    statistic: { balance: wonBalance },
    dispute_amount:blockedAmount,
  } = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const { getList, queryParams, sortValue, filters, isLoading } = usePagination({
    getListAction: getMatchesAction,
    queryName: 'matchesQueryParams',
    reducerName: 'matchesReducer',
  });

  useEffect(() => {
    getList(queryParams, sortValue, filters)
  }, [])

  useEffect(() => {
    dispatch(getPaymentCardsdAction(null));
  }, [dispatch]);


  const handleAddFunds = (
    data: ReturnType<typeof addFundsAction>['payload'] & WithTermsAndConditions,
    reset: () => void,
  ) => {
    delete data.terms_and_conditions;
    dispatch(
      addFundsAction(data, {
        redirect: (res) => {
          reset();
        },
      }));
  };

  const handlePayPalPamentSuccess = (upcomingData: string) => {
  }

  const handleWithdrawMoney = (
    data: ReturnType<typeof withDrawMoneyAction>['payload'] &
      WithTermsAndConditions,
    reset: () => void,
  ) => {
    delete data.terms_and_conditions;

    if (data.amount >= MAX_WITHDROW_MONEY) {
      ShowToastError({
        ...depostMessages.withdowMax,
        onClick: handleDownloadTaxtForm,
      });
      return;
    }
    dispatch(
      withDrawMoneyAction(data, {
        redirect: (res) => {
          reset();
        },
      }),
    );
  };

  const handleReedemCoupon = (data: any,
    reset: () => void,) => {
    dispatch(reedemCouponAction(data, {
      redirect: (res) => {
        reset();
      }
    }))
    //TODO : wrote function for redeem coupen code
  }

  // Create credit card modal
  const {
    isPrompt: isCreditCardOpen,
    closeEditor: closeCreateCardModal,
    openEditor: openCreateCardModal,
  } = useFormInModal([], '');

  const handleDownloadTaxtForm = () => {
    const path = TAX_FORM_LINK;
    downloadFile(path, 'Tax Form');
  };

  return (
    <CreateCreditCardContex.Provider
      value={{ openCreateCardModal, closeCreateCardModal }}
    >
      <PageHeader title="Deposit & Withdraw" />
      <div className="deposit-page">
        <div className="deposit-page__balance">
          <div className="deposit-page__balance-col">
            <DepositBalance
              cards={creditCards}
              balance={currentBalance}
              blockedAmount={blockedAmount}
              onAddFunds={handleAddFunds}
              onWithdrawMoney={handleWithdrawMoney}
              onReedemCoupon={handleReedemCoupon}
            />
          </div>
          <div className="deposit-page__balance-col">
            <span className="deposit-page-cards__title">
              Tax Form
              <Tooltip title={TAX_FORM_TOOLTIP} className="tooltip">
                <IconButton aria-label="alert">
                  <i className="icon-ic_alert"></i>
                </IconButton>
              </Tooltip>
            </span>
            <Button
              className="deposit-page-tax__btn"
              onClick={handleDownloadTaxtForm}
              preffix={<Icon className="icon-ic_document" />}
            >
              Generate tax form
            </Button>
          </div>
        </div>
        <div className="deposit-page-cards">
          <span className="deposit-page-cards__title">My Cards</span>
          <CreditCards cards={creditCards} />
        </div>
      </div>
      <CreateCreditCardModal
        isPrompt={isCreditCardOpen}
        closeEditor={closeCreateCardModal}
      />
    </CreateCreditCardContex.Provider>
  );
}

export default DepositPage;
