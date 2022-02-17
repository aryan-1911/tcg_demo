import { IOpenFormParams } from 'hooks';
import { createContext } from 'react';

export const CreateMathModalContext = createContext({
  openCreateMatchModal: (
    params?: IOpenFormParams | IOpenFormParams['initialValues'],
  ) => () => { },
  closeCreateMatchModal: () => { },
});
