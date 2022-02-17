import { Roles } from 'interfaces';

export interface IJwtToken {
  email: string;
  exp: number;
  iat: number;
  roles: Roles[];
}
