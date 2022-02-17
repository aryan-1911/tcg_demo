import { Local } from 'config';
import { ISignInResp } from 'interfaces';
import { jwt } from './jwt';
import { storageSvc } from './local-storage';

class AuthSessionService {
  private _expiredDate = 0;

  constructor() {
    this.saveExpiredDate();
  }

  private saveExpiredDate(token?: string) {
    // tslint:disable-next-line: variable-name
    const access_token = token || storageSvc.getItem(Local.TOKEN);
    if (access_token) {
      const details = jwt.getDetails(access_token);
      this._expiredDate = details ? details.exp * 1000 : 0;
    }
  }

  isRegistered() {
    return !!this.getToken();
  }

  saveData({ token, refresh_token }: ISignInResp): void {
    this.clearData();

    const storage = localStorage;
    storageSvc.setItem(Local.TOKEN, token, storage);
    storageSvc.setItem(Local.REFRESH_TOKEN, refresh_token, storage);

    this.saveExpiredDate(token);
  }

  isExpired(): boolean {
    return (
      this.isRegistered() &&
      this._expiredDate > 0 &&
      this._expiredDate < +new Date()
    );
  }

  getToken(): string | null {
    return storageSvc.getItem(Local.TOKEN);
  }

  getRefreshToken(): string | null {
    return storageSvc.getItem(Local.REFRESH_TOKEN);
  }

  clearData() {
    storageSvc.removeItem(Local.TOKEN);
    storageSvc.removeItem(Local.REFRESH_TOKEN);
  }
}

export const session = new AuthSessionService();
