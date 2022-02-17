import { useState } from 'react';

export interface IOpenParams {
  onOk: () => void;
  title: string;
  text?: string;
  type: 'delete' | 'confirm';
}

export function useConfirmModal() {
  const initialState: IOpenParams = {
    onOk: () => {},
    title: 'Delete',
    text: '',
    type: 'delete',
  };

  const [isPrompt, setPromptState] = useState(false);
  const [state, setState] = useState(initialState);

  const closeEditor = () => {
    setPromptState(false);
    setState(initialState);
  };

  const openEditor = (params: IOpenParams) => () => {
    setPromptState(true);
    setState(params);
  };

  return {
    isOpenInfoModal: isPrompt,
    closeInfoModal: closeEditor,
    openInfoModal: openEditor,
    onInfoOk: state.onOk,
    modalTitle: state.title,
    modalType: state.type,
    modalText: state.text,
  };
}
