import {
  validateCCV,
  validateExpDate,
  validateFullName,
  validateNoWhitespace,
  validatePassword,
  validatePaymentCardNumber,
  validatePaymentMoneyField,
  validateUsername
} from 'const';
import { validateWithdrawalMoneyField } from './deposit/deposit';
import {
  NOT_EMPTY_PATTERN, PATTERN_EMAIL,
  PATTERN_PASSWORD,
  PHONE_PATTERN
} from './patterns';

export const EMAIL_VALIDATION = {
  required: true,
  pattern: PATTERN_EMAIL,
};

export const PASSWORD_VALIDATION = {
  required: true,
  pattern: PATTERN_PASSWORD,
};

export const PHONE_VALIDATION = {
  required: true,
  pattern: PHONE_PATTERN,
};

export const REQUIRED = {
  required: true,
};

export const NO_WHITESPACE_ALLOWED = {
  required: false,
  validate: validateNoWhitespace,
};

export const MESSAGE_VALIDATION = {
  required: true,
  pattern: NOT_EMPTY_PATTERN,
};

export const PAYMENT_CARD_VALIDATION = {
  required: true,
  validate: validatePaymentCardNumber,
};

export const PAYMENT_EXP_DATE_VALIDATION = {
  required: true,
  validate: validateExpDate,
};

export const PAYMENT_CVV_VALIDATION = {
  required: true,
  validate: validateCCV,
};

export const PAYMENT_DEPOSIT_VALIDATION = {
  required: true,
  validate: validatePaymentMoneyField,
};

export const PAYMENT_WITHDRAWAL_VALIDATION = {
  required: true,
  validate: validateWithdrawalMoneyField,
};

export const USERNAME_VALIDATION = {
  required: true,
  validate: validateUsername,
};

export const FULLNAME_VALIDATION = {
  required: true,
  validate: validateFullName,
};

export const CONFIRM_PASSWORD_VALIDATION = (password: string) => ({
  required: true,
  validate: validatePassword(password),
});
