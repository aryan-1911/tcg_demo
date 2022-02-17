import { IMatch } from 'interfaces';
import { createContext } from 'react';

export const DetailMatchModalContext = createContext({
  openDetailMatchModal: (card: IMatch) => () => { },
  closeDetailMatchModal: () => { },
});
