export const LIMIT_FLIGHTS = 50;
// export const PATTERN_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PATTERN_EMAIL = /^[^<>()[\]\\.,;:\s@\"][a-zA-Z0-9+_.-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PATTERN_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[<>{}\"\/|;:.,~!?@#$%^=&*])(?=[\S]{8,15}$)/g;

export const PHONE_PATTERN = /(.+) ([0-9])/;
export const PATTERN_PASSWORD_MATCH = [
  {
    name: 'passwordLength',
    minPasswordLength: 8,
    maxPasswordLength: 15,
    description: 'Should be minimum of 8 and maximum of 15 characters',
    id: 0
  },
  {
    name: new RegExp(/[a-z]/),
    description: 'Include at least one lowercase letter (a-z)',
    id: 1,
  },
  {
    name: new RegExp(/[A-Z]/),
    description: 'Include at least one uppercase letter (A-Z)',
    id: 2,
  },
  {
    name: new RegExp(/[0-9]/),
    description: 'Include at least one number (0-9)',
    id: 3,
  },
  {
    name: new RegExp(/[<>{}\"/|;:.,~!?@#$%^=&*_+]/),
    description: 'Include at least one special character',
    id: 4,
  },
  {
    name: new RegExp(/^[^\s]+(\s+[^\s]+)*$/),
    description: 'Whitespace not allowed at start and end.',
    id: 5,
  },
];
export const CARD_NUMBER_PATTERN = '9999 9999 9999 9999';

export const CARD_EXP_DATE_PATTERN = '99/99';
export const CVV_CODE_LENGTH = 3;
export const CVV_CODE_PATTER = '9999';
export const NOT_EMPTY_PATTERN = /[^\s]/;
export const NO_WHITESPACE = /^[^\s]+(\s+[^\s]+)*$/;


// profile
export const USERNAME_PATTERN = /^[0-9a-zA-Z_.-]+$/;
export const FULLNAME_PATTERN = /^(?![\s])^[A-Z][a-zA-Z\s]+$/;
export const TCGUSERNAME_PATTERN = /\btcg|t.c.g|t-c-g|t_c_g|tcg showdown|tcg_showdown|tcg.showdown|tcg-showdown|tcgshowdown\b/gi;


//Whole Number

export const WHOLE_NUMBER = /^(0|[1-9]\d*)$/;