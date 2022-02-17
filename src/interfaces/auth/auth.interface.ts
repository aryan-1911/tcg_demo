export interface ISignInResp {
  token: string;
  refresh_token: string;
}

export interface ITokenResp {
  token: string;
  refresh_token: string;
}

export interface IChangeEmail {
  email: string;
  password: string;
}

export interface IChangePassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ISignUpAction {
  fullname: string;
  username: string;
  referral_code?: string;
  birthdate: string;
  email: string;
  password: string;
}

export interface ISignUpResp {
  token: string;
  refresh_token: string;
}

export interface ISignInAction {
  email: string;
  password: string;
}

export interface IConfirmEmail {
  userIsNew: boolean;
}
