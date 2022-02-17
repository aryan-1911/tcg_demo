import { has } from 'lodash';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export interface IOpenFormParams {
  initialValues: IInitualValues;
  cards?: any[];
  onOk: () => void;
}

interface IInitualValues {
  [key: string]: any;
}

interface PromptState<T> {
  promptTitle: string;
  btnTitle: string;
  onOk?: () => void;
  formInitialValues: T;
}

const isString = <T extends string>(
  variableToCheck: any,
): variableToCheck is T => (variableToCheck as T).toLowerCase !== undefined;

export function useFormInModal<T = IInitualValues, K = string>(
  arr: T[],
  title: string,
) {
  const promptInitialState: PromptState<T> = {
    promptTitle: `New ${title}`,
    btnTitle: `Create ${title}`,
    // tslint:disable-next-line: no-object-literal-type-assertion
    formInitialValues: {} as T,
    onOk: undefined,
  };

  const [modalType, setModalType] = useState<K>();
  const [isEditModal, setEditModal] = useState<boolean>(false);
  const [isPrompt, setPromptState] = useState(false);
  const [
    { promptTitle, btnTitle, formInitialValues, onOk },
    setPromptParams,
  ] = useState(promptInitialState);

  const closeEditor = () => {
    setPromptState(false);
    setPromptParams(promptInitialState);
  };

  const history = useHistory();
  const openEditor = (
    cardItem?: IOpenFormParams | IInitualValues | K,
  ) => () => {
    const card = cardItem as IOpenFormParams | IInitualValues;
    if (!!card && has(card.initialValues, 'isDirectChallangeId')) {
      history.push(`/profile/${card.initialValues.isDirectChallangeId}`);
    }
    if (!cardItem) {
      setPromptParams(promptInitialState);
    } else if (isString(cardItem)) {
      setModalType(cardItem as K);
    } else {
      const card = cardItem as IOpenFormParams | IInitualValues;
      let cardId = '';
      let cards = arr;

      if (card.initialValues) {
        cardId = (cardItem as IOpenFormParams).initialValues.id;
        cards = (cardItem as IOpenFormParams).cards || arr;
      } else {
        cardId = (cardItem as IInitualValues).id;
      }
      // @ts-ignore
      if (cardItem.isDirect) {
        setPromptParams({
          promptTitle: `Direct ${title}`,
          btnTitle: `Direct ${title}`,
          onOk: card.onOk,
          formInitialValues:
            // @ts-ignore
            cards?.find(({ id }: IInitualValues) => id === cardId) ||
            // tslint:disable-next-line: no-object-literal-type-assertion
            ({} as T),
        });
      } else {
        setPromptParams({
          promptTitle: `Edit ${title}`,
          btnTitle: `Edit ${title}`,
          onOk: card.onOk,
          formInitialValues:
            // @ts-ignore
            cards?.find(({ id }: IInitualValues) => id === cardId) ||
            // tslint:disable-next-line: no-object-literal-type-assertion
            ({} as T),
        });
      }
    }

    setPromptState(true);
  };

  return {
    promptTitle,
    modalType,
    btnTitle,
    formInitialValues,
    isPrompt,
    isEditModal,
    closeEditor,
    openEditor,
    onOk,
  };
}
