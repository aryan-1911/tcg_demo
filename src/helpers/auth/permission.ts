import { Roles } from 'interfaces';

export const checkByAdmin = (roles: Roles[]) => {
  return roles.includes(Roles.ROLE_ADMIN);
};
