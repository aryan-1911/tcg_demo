import { IOpenParams } from 'hooks';
import { createContext } from 'react';

export const InfoModalContext = createContext({
  openInfoModal: (params: IOpenParams) => () => {},
  closeInfoModal: () => {},
});
