import { useTypedController } from '@hookform/strictly-typed';
import { approvePaypalDepositAction } from 'actions';
import cn from 'classnames';
import { Button, FormRadioButton, FormTextInput } from 'Components/common/form';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { UniversalModalFooter } from 'Components/common/UniversalModal/UniversalModalFooter';
import { ShowToastError } from 'Components/Toast';
import { PAYPAL_CLIENT_ID } from 'config';
import { creditCardIcons, PAYMENT_DEPOSIT_VALIDATION, REQUIRED } from 'const';
import { CreateCreditCardContex } from 'context';
import { formatExpDate, makeSelector } from 'helpers';
import { ICreditCard } from 'interfaces';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { DepositReducerState } from 'reducers';

type FormValues = {
  amount: number | '';
  cardId: string;
} & WithTermsAndConditions;

export interface IMoneyModalProps {
  isPrompt: boolean;
  cards: ICreditCard[];
  onOk(data: FormValues, reset: () => void): void;
  closeEditor(): void;
  disableBackdropClick:boolean;
  // setCurBal:Function;
  // handlePayPalPamentSuccess:(value:string) => void;
}

function MoneyModal(props: IMoneyModalProps) {
  const dispatch = useDispatch();
  const { onOk, isPrompt, closeEditor, cards ,disableBackdropClick} = props;

  const { openCreateCardModal } = useContext(CreateCreditCardContex);

  const [canUpdate, dispatchUpdate] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      amount: 25,
      cardId: '',
      terms_and_conditions: false,
    },
  });

  const {
    register,
    control,
    handleSubmit,
    getValues,
    errors,
    reset,
    watch,
  } = methods;

  const TypedController: any = useTypedController({ control });

  const displayError = () => {
    if (errors.cardId) {
      return 'Select a payment method';
    }
  };

  // Check whether the card and term & conditions are checked or not

  const whatchedAmount = watch('amount');
  const isLoading = useSelector<any, boolean>(
    makeSelector(['depositReducer', 'isLoading']),
  );


  const { creditCards } = useSelector<any, DepositReducerState>(
    makeSelector(['depositReducer']),
  );

  let doesUserHasCards = creditCards.length;
  
  const onSubmit = handleSubmit((data) => {
    if(!doesUserHasCards){
      ShowToastError({
        title:'Attention!',
        subtitle:'Please add payment method.',
        btnTitle:'ok',
      })
    }else{
      onOk(data, reset);
    }
  });

  const[amountInputValue,setAmountInputValue] = useState(0);

  const renderAmountInput = () => {
    return (
      <>
        <TypedController
          name="amount"
          rules={PAYMENT_DEPOSIT_VALIDATION}
          render={(props) => {
            const amtValue:any = props.value;
            setAmountInputValue(amtValue);             
           return (
            <FormTextInput
              {...props}
              preffix={<span className="red-dollar">$</span>}
              name="amount"
              type="number"
              placeholder="Enter amount min. $10."
              error={errors.amount}
            />
          )}}
        />
      </>
    );
  };

  return (
    <UniversalModal
      visible={isPrompt}
      title="Add Funds"
      className="category-editor-modal money-modal-wrap"
      disableBackdropClick
      onCancel={closeEditor}
    >
      <FormProvider {...methods}>
        <form className="deposit-money-form" onSubmit={onSubmit}>
          <div className="deposit-money-form__row">
            <div className="deposit-money-form__amount without-label">
              {renderAmountInput()}
            </div>
          </div>
          <div
            className={cn(
              'deposit-money-form__row',
              errors.cardId && 'error-field',
            )}
          >
            <div className="input-error group">{displayError()}</div>
            {cards.map((card) => {
              const {
                id,
                brand,
                expMonth,
                expYear,
                last4,
                name: nameOnCard,
              } = card;
              const cardIco = creditCardIcons[brand];
              const expDate = formatExpDate(expMonth, expYear);
              return (
                <div className="deposit-money-form__card" key={id}>
                  <TypedController
                    name="cardId"
                    rules={REQUIRED}
                    render={(props) => {
                      return (
                        <div className="payment-method" ref={register}>
                          <div
                            className="payment-method__box"
                            onClick={() => {
                              dispatchUpdate(!canUpdate);
                              props.onChange(id);
                            }}
                          >
                            <div className="payment-method__number">
                              <FormRadioButton
                                {...props}
                                checked={getValues('cardId') === id}
                                onChange={() => {
                                  dispatchUpdate(!canUpdate);
                                  props.onChange(id);
                                }}
                                name="cardId"
                                value={id}
                              />

                              {cardIco}
                              <span>**** **** **** {last4}</span>
                            </div>
                            <span className="payment-method__name">
                              {nameOnCard}
                            </span>
                            <span className="payment-method__date">
                              {expDate}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className={`paypal-btn-wrap ${(amountInputValue < 10)?'disablePayPal':''}`}>
            <PayPalButton
              createOrder={(data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: 'USD',
                        value: whatchedAmount,
                      },
                    },
                  ],
                });
              }
            }
            onApprove={(data: any, actions: any) => {
              dispatch(
                  approvePaypalDepositAction(data, {
                    redirect: (res) => {
                      // if(res.status === 'ok'){
                      //   ShowToastSuccess({
                        //     title: 'Successful!',
                      //   });                      
                      //   if(data.amount !== ""){
                        //     // handlePayPalPamentSuccess(data.amount);
                        //     handlePayPalPamentSuccess(amountInputValue.toString());
                        //   }
                      // }else{
                        //   const title = res.description || 'Something went wrong.';
                        //   ShowToastError({
                          //     title: title,
                          //   });
                          // }   
                          closeEditor();
                          
                        },
                      }),
                      );
                    }}
                    options={{
                clientId: PAYPAL_CLIENT_ID,
              }}
              onError={(err: object) => {
                console.error(err);
              }}
              />
         </div>
          <div className="deposit-money-form__row">
            <div className="deposit-money-form__add-btn">
              <Button onClick={openCreateCardModal()} btnType="create">
                Add new payment method
              </Button>
            </div>
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

export default MoneyModal;
