import { creditCardIcons } from 'const';

const creditCardType = require('credit-card-type');

export const formatCreditCardNumber = (cardNumber: string): string => {
  const cardArr = cardNumber.split(' ');

  return cardArr
    .map((n, i) => {
      if (i === cardArr.length - 1) {
        return n;
      }

      return n
        .split('')
        .map(() => '*')
        .join('');
    })
    .join(' ');
};

export const getCardIconByNumber = (cardNumber: string) => {
  const ambiguousCards = creditCardType(cardNumber);
  if (!ambiguousCards[0]) return null;
  const cardType = ambiguousCards[0].type;

  return creditCardIcons[cardType] || null;
};

export const formatExpDate = (expMonth: number, expYear: number): string => {
  const year = String(expYear).slice(2, 4);
  return `${expMonth}/${year}`;
};
