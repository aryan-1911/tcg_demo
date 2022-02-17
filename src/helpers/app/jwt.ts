import { IJwtToken } from 'interfaces';

class JwtToken {
  static decode(token: string): IJwtToken {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  getDetails(token: string): IJwtToken | null {
    return typeof token === 'string' ? JwtToken.decode(token) : null;
  }

  isExpired(token: IJwtToken | string): boolean | null {
    let tokenParsed = token;
    try {
      if (typeof token === 'string') {
        tokenParsed = this.getDetails(token) as IJwtToken;
      }
      if (typeof tokenParsed === 'object' && tokenParsed.exp) {
        return tokenParsed.exp * 1000 < +new Date();
      }
      console.error('No token value!', token);
      return null;
    } catch (error) {
      console.error('ERR: No token value!', { token, error });
      return null;
    }
  }
}

export const jwt = new JwtToken();
