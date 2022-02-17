import { paymentCardErrors } from 'const';
import { getYear } from 'date-fns';
import { ICardInputData, ICreditCardRequest } from 'interfaces';

export const prepareCreditCardRequest = (
  creditCard: ICardInputData,
): ICreditCardRequest | null => {
  if (!creditCard.name) return null;

  const expDateArr = creditCard.expDate.split('/');
  const currentYear = getYear(new Date());
  const expYear = `${String(currentYear).slice(0, 2)}${expDateArr[1]}`;

  return {
    cvc: creditCard.cvc,
    expMonth: Number(expDateArr[0]),
    expYear: Number(expYear),
    name: creditCard.name,
    number: creditCard.number.replace(/ /g, ''),
  };
};
