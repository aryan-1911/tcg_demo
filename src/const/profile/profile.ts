import { FULLNAME_PATTERN, NO_WHITESPACE, TCGUSERNAME_PATTERN, USERNAME_PATTERN } from 'const';

const profileErrors = {
  username: 'Please use only letters, numbers, dot, hyphen and underscore',
  fullname: 'Please use only letters and start with uppercase.',
  password: 'Please make sure your passwords match.',
  tcgusername: 'This username is not available.',
  whitespace: 'Whitespace not allowed at start and end.',
  usernameWithoutwhitespace: 'Do not use whitespace anywhere in your username.',
  usernameLength: 'Username should not be more than 25 characters.'
};

export const validateUsername = (value: string) => {
  if (!NO_WHITESPACE.test(value)) {
    return profileErrors.usernameWithoutwhitespace;
  }
  if (TCGUSERNAME_PATTERN.test(value)) {
    return profileErrors.tcgusername;
  }
  if (!USERNAME_PATTERN.test(value)) {
    return profileErrors.username;
  }
  if (value.length > 25) {
    return profileErrors.usernameLength;
  }
  return true;
};

export const validateFullName = (value: string) => {
  if (!FULLNAME_PATTERN.test(value)) {
    return profileErrors.fullname;
  }
  if (!NO_WHITESPACE.test(value)) {
    return profileErrors.whitespace;
  }
  return true;
};

export const validatePassword = (newPassword: string) => (value: string) => {
  if (newPassword !== value) {
    return profileErrors.password;
  }
  if (!NO_WHITESPACE.test(value)) {
    return profileErrors.whitespace;
  }
  return true;
};

export const validateNoWhitespace = (value: string) => {
  if (!NO_WHITESPACE.test(value)) {
    return "Whitespace not allowed.";
  }
  return true;
};


export const defaultCountryCode = 'us';

export const MIN_CHAR_PHONE = 8;

export const CREDIT_CARD = 'creditCard';

export const ERROR_INGAMENAME_TAKEN = 'This in-game name is already taken';
