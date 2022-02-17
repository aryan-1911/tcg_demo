import { useTypedController } from '@hookform/strictly-typed';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CreditCardImage from 'assets/images/creditcard.png';
import {
  CARD_EXP_DATE_PATTERN,
  CARD_NUMBER_PATTERN,
  CVV_CODE_PATTER,
  PAYMENT_CARD_VALIDATION,
  PAYMENT_CVV_VALIDATION,
  PAYMENT_EXP_DATE_VALIDATION,
  REQUIRED
} from 'const';
import { ICardInputData } from 'interfaces';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormRadioButton, FormTextInput } from '..';
import './form-payment.scss';


export const creditCardInititalState: ICardInputData = {
  number: '',
  expDate: '',
  cvc: '',
  name: '',
  type: 'credit',
};

interface IFormPaymentProps {
  nestedName?: string;
  handlerBlur?: (name: string) => void;
}

export const FormPayment = React.forwardRef<HTMLDivElement, IFormPaymentProps>(
  (props, ref) => {
    const [expanded, setExpanded] = useState<ICardInputData['type'] | null>(
      null,
    );

    const { nestedName = '', handlerBlur } = props;

    const { register, errors, control, reset, getValues } = useFormContext();
    const TypedController: any = useTypedController({ control });

    const nestedErrors = errors[nestedName] ? errors[nestedName] : errors;

    const handleReset = (panel: ICardInputData['type']) => {
      const values = getValues();
      let state: any = { ...creditCardInititalState, type: panel };
      if (nestedName) {
        state = { ...values, [nestedName]: { ...state } };
      }
      reset(state);
    };

    const handleToggleMenu = (panel: ICardInputData['type']) => (
      event: React.ChangeEvent<{}>,
      isExpanded: boolean,
    ) => {
      const panelName = panel !== expanded ? panel : null;
      handleReset(panel);
      setExpanded(panelName);
    };

    const preffix = nestedName ? `${nestedName}.` : '';

    const renderCardForm = () => {
      return (
        <div className="payment-card-block">
          <TypedController
            name={`${preffix}number`}
            rules={PAYMENT_CARD_VALIDATION}
            render={(props) => {
              return (
                <FormTextInput
                  onChange={props.onChange}
                  value={props.value}
                  inputMask={CARD_NUMBER_PATTERN}
                  name={`${preffix}number`}
                  label="Card Number"
                  placeholder="Enter your card number"
                  error={nestedErrors.number}
                  handlerBlur={handlerBlur}
                />
              );
            }}
          />

          <div className="payment-card-security-inputs">
            <TypedController
              name={`${preffix}expDate`}
              rules={PAYMENT_EXP_DATE_VALIDATION}
              render={(props) => (
                <FormTextInput
                  onChange={props.onChange}
                  value={props.value}
                  inputMask={CARD_EXP_DATE_PATTERN}
                  name={`${preffix}expDate`}
                  label="Expiration date"
                  placeholder="MM/YY"
                  error={nestedErrors.expDate}
                  handlerBlur={handlerBlur}
                />
              )}
            />

            <TypedController
              name={`${preffix}cvc`}
              rules={PAYMENT_CVV_VALIDATION}
              render={(props) => (
                <FormTextInput
                  type="password"
                  onChange={props.onChange}
                  value={props.value}
                  inputMask={CVV_CODE_PATTER}
                  maskChar=""
                  name={`${preffix}cvc`}
                  label="Security code"
                  placeholder="CVV"
                  error={nestedErrors.cvc}
                  handlerBlur={handlerBlur}
                />
              )}
            />
          </div>
          <TypedController
            name={`${preffix}name`}
            rules={REQUIRED}
            render={(props) => (
              <FormTextInput
                onChange={props.onChange}
                value={props.value}
                name={`${preffix}name`}
                label="Name on card"
                placeholder="Name on card"
                error={nestedErrors.name}
                handlerBlur={handlerBlur}
              />
            )}
          />
        </div>
      );
    };

    return (
      <div className="payment-form">
        {nestedErrors.type && (
          <div className="input-error payment-form__type-error">
            Payment card is required
          </div>
        )}
        <Accordion
          onChange={handleToggleMenu('credit')}
          ref={ref}
          expanded={expanded === 'credit'}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary id="panel1bh-header">
            <TypedController
              name={`${preffix}type`}
              render={(props) => {
                return (
                  <FormControlLabel
                    ref={register}
                    control={
                      <FormRadioButton
                        checked={expanded === 'credit'}
                        showImage={true}
                        image={CreditCardImage}
                        onChange={() => props.onChange('credit')}
                        name={`${preffix}type`}
                        value="credit"
                      />
                    }
                    name={`${preffix}type`}
                    value="credit"
                    label="Credit card"
                  />
                );
              }}
            />
          </AccordionSummary>
          <AccordionDetails className="payment-card-block">
            {renderCardForm()}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  },
);
