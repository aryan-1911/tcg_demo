import { createContext } from 'react';

export const CreateCreditCardContex = createContext({
  openCreateCardModal: () => () => {},
  closeCreateCardModal: () => {},
});
