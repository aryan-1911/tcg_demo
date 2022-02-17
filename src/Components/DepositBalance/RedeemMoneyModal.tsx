import { useTypedController } from '@hookform/strictly-typed';
import { FormTextInput } from 'Components/common/form';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { UniversalModalFooter } from 'Components/common/UniversalModal/UniversalModalFooter';
import { CreateCreditCardContex } from 'context';
import { makeSelector } from 'helpers';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';


function RedeemMoneyModal(props: any) {
  const dispatch = useDispatch();
  const { onOk, isPrompt, closeEditor, cards ,disableBackdropClick} = props;

  const { openCreateCardModal } = useContext(CreateCreditCardContex);

  const [canUpdate, dispatchUpdate] = useState(false);
  const methods = useForm<any>({
    defaultValues: {
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

  // Check whether the card and term & conditions are checked or not
  const isLoading = useSelector<any, boolean>(
    makeSelector(['depositReducer', 'isLoading']),
  );

  const onSubmit = handleSubmit((data) => {
    onOk(data, reset);
  });

  const renderAmountInput = () => {
    return (
      <>
        <TypedController
          name="redeemCouponCode"
          render={(props) => {
           return (
            <FormTextInput
              {...props}
              name="redeemCouponCode"
              type="text"
              placeholder="Enter redeem coupon code"
            />
          )}}
        />
      </>
    );
  };
  return (
    <UniversalModal
      visible={isPrompt}
      title="Redeem Coupon"
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
          <UniversalModalFooter
            onSubmit={onSubmit}
            title="Redeem"
            isLoading={isLoading}
          />
        </form>
      </FormProvider>
    </UniversalModal>
  );
}

export default RedeemMoneyModal;
