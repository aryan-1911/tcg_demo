import { createDepositCardAction } from 'actions';
import { creditCardInititalState, FormPayment } from 'Components/common/form';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { makeSelector } from 'helpers';
import { ICardInputData } from 'interfaces';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export const CreateCreditCardModal = (props: IModalProps) => {
  const dispatch = useDispatch();
  const { closeEditor, isPrompt } = props;
  const methods = useForm<ICardInputData>({
    defaultValues: { ...creditCardInititalState },
  });
  const { handleSubmit, setError } = methods;

  const isLoading = useSelector<any, boolean>(makeSelector(['depositReducer', 'isLoading']));

  const onSubmit = handleSubmit((data: ICardInputData) => {
    if (!data.name) {
      setError('type', { message: 'errro' });
      return;
    }
    // Fileter the number and remove _ before sent it to server.
    data.number = data.number.replace(/_/g, "");
    dispatch(createDepositCardAction(data, { redirect: closeEditor }));
  });
  return (
    <UniversalModal
      visible={isPrompt}
      title="Add payment method"
      className="category-editor-modal"
      onCancel={closeEditor}
      onOk={onSubmit}
      isLoading={isLoading}
    >
      <FormProvider {...methods}>
        <form className="credit-cards-form" onSubmit={onSubmit}>
          <FormPayment />
        </form>
      </FormProvider>
    </UniversalModal>
  );
};
