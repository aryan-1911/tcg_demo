import { useTypedController } from '@hookform/strictly-typed';
import { FormTextInput } from 'Components/common/form';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { UniversalModalFooter } from 'Components/common/UniversalModal/UniversalModalFooter';
import { matchMessages, PAYMENT_WITHDRAWAL_VALIDATION } from 'const';
import { formatPrice, makeSelector } from 'helpers';
import { IUserProfileResp } from 'interfaces';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

type FormValues = {
  amount: number | '';
  email: string;
} & WithTermsAndConditions;

export interface IWithdrawModalProps {
  isPrompt: boolean;
  onOk(data: FormValues, reset: () => void): void;
  closeEditor(): void;
  balance: number;
}




function WithdrawModal(props: IWithdrawModalProps) {
  const { isPrompt, balance, onOk, closeEditor } = props;

  const {
    paypal_email
  } = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      amount: '',
      email: paypal_email,
      terms_and_conditions: false,
    },
  });

  const { control, handleSubmit, errors, reset, watch } = methods;

  const TypedController: any = useTypedController({ control });

  const onSubmit = handleSubmit((data) => {
      data.email=paypal_email;
      onOk(data, reset);
  });

  const isLoading = useSelector<any, boolean>(
    makeSelector(['depositReducer', 'isLoading']),
  );

  const renderAmountInput = () => {
    return (
      <div className="withdraw-input-wrapper">
        <div className="input-wrapper">
          <TypedController
            name="amount"
            rules={{
              required: true,
              max: {
                value: balance,
                message: matchMessages.BALANCE_ERROR,
              },
            } && PAYMENT_WITHDRAWAL_VALIDATION}
            render={(props) => (
              <FormTextInput
                {...props}
                preffix={<span className="red-dollar">$</span>}
                name="amount"
                type="number"
                placeholder="Enter amount min. $1."
                error={errors.amount}
              />
            )}
          />
          <span className="withdraw-available-amount">
            <span className="text">Available for withdraw</span>
            <span className="amount">
              <span>$</span>{balance && formatPrice(balance, true)}
            </span>
          </span>
        </div>
        <span className="withdraw-tax">
          Withdraw is subject to the <b>2.9%+30</b> cent fee from the{' '}
          <b>PayPal</b>
        </span>
      </div>
    );
  };
  return (
    <UniversalModal
      visible={isPrompt}
      title="WITHDRAW MONEY"
      className="category-editor-modal"
      onCancel={closeEditor}
    >
      <FormProvider {...methods}>
        <form className="deposit-money-form" onSubmit={onSubmit}>
          <div className="deposit-money-form__row">
            <div className="deposit-money-form__amount without-label">
              {renderAmountInput()}
            </div>
          </div>
          <div className="deposit-money-form__row">
            <TypedController
              name="email"
              // rules={EMAIL_VALIDATION}
              value={paypal_email}
              defaultValue={paypal_email}
              render={(props) => {
                return (
                <FormTextInput
                  label="Paypal Email address"
                  name="email"
                  placeholder="you@example.com"
                  disabled
                  {...props}
                  error={errors.email}
                  />
                  )}}
                  />
          </div>
          <UniversalModalFooter
            onSubmit={onSubmit}
            title="Complete payment"
            isLoading={isLoading}
          />
        </form>
      </FormProvider>
    </UniversalModal>
  );
}

export default WithdrawModal;
