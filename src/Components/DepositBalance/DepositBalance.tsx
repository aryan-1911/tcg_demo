import { Icon } from '@material-ui/core';
import { useStripe } from '@stripe/react-stripe-js';
import { addFundsAction, withDrawMoneyAction } from 'actions';
import { Button } from 'Components/common/form';
import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
import { ShowToastError } from 'Components/Toast';
import { depostMessages } from 'const';
import { formatPrice, makeSelector } from 'helpers';
import { useFormInModal } from 'hooks';
import { ICreditCard, IUserProfileResp } from 'interfaces';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './deposit-balance.scss';
import MoneyModal from './MoneyModal';
import RedeemMoneyModal from './RedeemMoneyModal';
import WithdrawModal from './WithdrawModal';

type MonyModalTypes = 'withdraw' | 'funds' | 'redeem-coupon';

interface IDepositBalanceProps {
  balance: number;
  cards: ICreditCard[];
  onAddFunds(
    data: ReturnType<typeof addFundsAction>['payload'] & WithTermsAndConditions,
    reset: () => void,
  ): void;
  onWithdrawMoney(
    data: ReturnType<typeof withDrawMoneyAction>['payload'] &
      WithTermsAndConditions,
    reset: () => void,
  ): void;
  onReedemCoupon(
    data: any,
    reset: () => void,
  ): void;
  blockedAmount:number|undefined;
}

function DepositBalance(props: IDepositBalanceProps) {
  let { balance,onAddFunds, cards, onWithdrawMoney,onReedemCoupon,blockedAmount} = props;
  const stripe = useStripe();
  // PROMPTS
  const { isPrompt, closeEditor, openEditor, modalType } = useFormInModal<
    null,
    MonyModalTypes
  >([], '');

  const history = useHistory();
  const {
    paypal_email,
    isConfirmed
  } = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const handleRedirect = () => {
    return history.push(`/profile/edit-profile`);
  };

  const handleAddFunds = (
    data: ReturnType<typeof addFundsAction>['payload'] & WithTermsAndConditions,
    reset: () => void,
  ) => {
    onAddFunds(data, () => {
      closeEditor();
      reset();
    });
  };

  const handleWithdrawMoney = (
    data: ReturnType<typeof withDrawMoneyAction>['payload'] &
      WithTermsAndConditions,
    reset: () => void,
  ) => {
    onWithdrawMoney(data, () => {
      closeEditor();
      reset();
    });
  };

  const handleReedemCoupon = (
    data: ReturnType<any> & WithTermsAndConditions,
    reset: () => void,
  ) => {
    onReedemCoupon(data, () => {
      closeEditor();
      reset();
    });
  };

  const showReedemCouponErrPopup = () => {
    if (!isConfirmed) {
      ShowToastError({
        title: 'Please confirm your email.',
        subtitle: 'You have to confirm your email first to redeem any coupon.',
        btnTitle: 'Ok',
      });
      closeEditor();
      return;
    } else {
      openEditor('redeem-coupon')
    }
  }


  const showwithdrawErrPopup = () => {
    if (!isConfirmed) {
      ShowToastError({
        title: 'Please confirm your email.',
        subtitle: 'You have to confirm your email first to make any withdrawal.',
        btnTitle: 'Ok'
      });
      closeEditor();
      return;
    } else if (!paypal_email) {
      ShowToastError({
        title: depostMessages.addpaypal.title,
        subtitle: depostMessages.addpaypal.subtitle,
        btnTitle: depostMessages.addpaypal.btnTitle,
        onClick: () => handleRedirect(),
      });
      closeEditor();
      return;
    } else {
      openEditor('withdraw')
    }
  }

  const btnHandler = (data: any, reset: any) => {
    if (modalType === 'withdraw') {
      return handleWithdrawMoney(data, reset);
    }
    if (modalType === 'redeem-coupon') {
      return handleReedemCoupon(data, reset);
    }
    return handleAddFunds({ ...data, stripe }, reset);
  };

  return (
    <div className="deposit-balance">
      <span className="deposit-balance__text">Current balance</span>
      <span className="deposit-balance__value">
        <div className="current">
            <span>$</span>{balance?formatPrice(balance, true):(balance === 0?0:<LoadingButton/>)} 
        </div>
        {/* <div className="blocked">
          <div className="blocked-wrap">
            (
           <span className='blocked-info' data-tooltip="This amount is blocked which can not be withdrawn due to any active game or active disputes.">
             <span className="sign">$</span>
             <span className="amount">{blockedAmount?formatPrice(blockedAmount, true):(balance === 0?0:0)}</span>
          </span>
          <span className="star">*</span>
            )
          </div>
        </div> */}
      </span>
      <div className="deposit-balance__buttons">
        <Button btnType="create" onClick={openEditor('funds')}>
          Add Funds
        </Button>
        <Button btnType="create" onClick={isConfirmed ? openEditor('redeem-coupon') : showReedemCouponErrPopup}>
          Redeem Coupon
        </Button>
        <Button
          btnStyle="white-fill"
          preffix={<Icon className="icon-arrow-up" />}
          onClick={(isConfirmed && paypal_email) ? openEditor('withdraw') : showwithdrawErrPopup}
        >
          Withdraw money
        </Button>
      </div>
      <RedeemMoneyModal
        closeEditor={closeEditor}
        isPrompt={isPrompt && modalType === 'redeem-coupon'}
        onOk={btnHandler}
        cards={cards}
        disableBackdropClick={true}
      />
      <MoneyModal
        closeEditor={closeEditor}
        isPrompt={isPrompt && modalType === 'funds'}
        onOk={btnHandler}
        cards={cards}
        disableBackdropClick={true}
      />
      <WithdrawModal
        closeEditor={closeEditor}
        isPrompt={isPrompt && modalType === 'withdraw'}
        onOk={btnHandler}
        balance={balance}
      />
    </div>
  );
}

export default DepositBalance;
