import { gameTypeServerLabels } from 'const';
import { ICardInputData, Roles } from 'interfaces';

export interface IUserProfile {
  username: string;
  fullname: string;
  paypal_email: string;
  isAffiliated?: number,
  referral_code?: string,
  hasActiveAffiliateRequest?: number,
  birthdate: string;
  phone: string;
  showIncome: boolean;
  gamePokemon: string;
  gameMtg: string;
  gameYugioh: string;
  gameMagic: string;
  prefix: string;
  avatar: string;
  allowChallenge?: number;
  dispute_amount?: number;
}

export interface ISpecificProfileResp {
  id: string;
  avatar: string;
  nicknames: {
    [key in typeof gameTypeServerLabels[keyof typeof gameTypeServerLabels]]:
    | string
    | null;
  };
  statistic: {
    balance: number;
    losePercent: number | null;
    loses: number;
    winPercent: number | null;
    wins: number;
  };
  username: string;
  activeCompetitionId?: string;
  roles: Roles[];
  date?: number | Date;
  allowChallenge?: number;
  dispute_amount?: number;
}

export interface IUserProfileResp extends ISpecificProfileResp {
  balance: number;
  birthdate: string;
  email: string;
  fullname: string;
  paypal_email: string;
  isAffiliated?: number,
  referral_code?: string,
  hasActiveAffiliateRequest?: number,
  phone: string | null;
  prefix: string;
  showIncome: boolean;
  isConfirmed: boolean;
  activeCompetitionId?: string;
  allowChallenge?: number;
  dispute_amount?: number;
}

export interface IContactUsFormValues {
  subject: string;
  message: string;
  attachments: File[];
}

export interface IUserProfileInfo {
  avatar: string;
  phonenumber: string;
  gamePokemon: string;
  gameMtg: string;
  gameYugioh: string;
  gameMagic: string;
}

export type IUploadUserPhoto = string;

export interface IPartialUserInfoEditing {
  avatar: string;
  username: string;
  fullname: string;
  birthdate: string;
  phone: string;
  showIncome: boolean;
  gamePokemon: string;
  gameMtg: string;
  gameYugioh: string;
  gameMagic: string;
  prefix: number;
  payPal: boolean;
  creditCard: ICardInputData;
  allowChallenge?: number;
  dispute_amount?: number;
}

export interface IPartialUserInfoEditingRequest {
  avatar: string;
  phone: number;
  prefix: number;
  gamePokemon: string;
  gameMtg: string;
  gameYugioh: string;
  gameMagic: string;
  stripeCard: {
    number: string;
    expMonth: number;
    expYear: number;
    name: string;
    cvc: string;
  } | null;
}
