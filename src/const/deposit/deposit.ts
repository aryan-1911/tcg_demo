import { AppConfig } from 'config';
import { WHOLE_NUMBER } from 'const';

export const TAX_FORM_LINK = `${AppConfig.API_URL}/static/form-w-9.pdf`;
export const MAX_WITHDROW_MONEY = 500;
export const MIN_DEPOST_MONEY = 10;
export const MIN_WITHDROW_MONEY = 1;


export const depostMessages = {
  withdowMax: {
    title: 'Limit reached',
    subtitle: 'Please fill out the Tax Form to be able withdraw funds.',
    btnTitle: 'Generate tax form',
  },
  addpaypal: {
    title: 'PayPal Id is missing.',
    subtitle: 'Please edit your profile and add PayPal Id to make any withdrawal.',
    btnTitle: 'Add PayPal',
  },
};

export const TAX_FORM_TOOLTIP = `Please download and fill out this W-9  once you receive $600 or more from your winnings.   Once you hit $600 You will not be able to withdraw any more funds till your w-9 is filled out and returned.   Please send the completed form through contact us with your username and the words: "W-9 Form"  in the subject line. `;

export const paymentCardErrors = {
  number: 'Card number is invalid',
  expDate: {
    date: 'Invalid date',
    month: 'Invalid month',
  },
  ccv: 'Invalid ccv',
};

export const validatePaymentCardNumber = (value: string) =>
  value.split('_').length === 3 || value.split('_').length === 2 || value.split('_').length === 1 || paymentCardErrors.number;

export const validateExpDate = (value: string) => {
  const arr = value.split('_');

  if (arr.length !== 1) {
    return paymentCardErrors.expDate.date;
  }

  const [exMonth, exYear] = value.split('/');

  if (Number(exMonth) > 12) {
    return paymentCardErrors.expDate.month;
  }

  const today = new Date();
  const someday = new Date();
  someday.setFullYear(2000 + Number(exYear), Number(exMonth), 1);

  if (someday < today) {
    return paymentCardErrors.expDate.date;
  }

  return true;
};

export const validateCCV = (value: string) => {
  if (value.length < 3) {
    return paymentCardErrors.ccv;
  }
  return true;
};

export const validatePaymentMoneyField = (value: number | '') => {
  if (value < MIN_DEPOST_MONEY) {
    return `Minimum deposit value: ${MIN_DEPOST_MONEY}`;
  }
  if (!WHOLE_NUMBER.test(value.toString())) {
    return `You can't add decimal amount.`;
  }
  return true;
};


export const validateWithdrawalMoneyField = (value: number | '') => {
  if (value < MIN_WITHDROW_MONEY) {
    return `Minimum withdrawal value: ${MIN_WITHDROW_MONEY}`;
  }
  if (!WHOLE_NUMBER.test(value.toString())) {
    return `You can't add decimal amount.`;
  }
  return true;
};