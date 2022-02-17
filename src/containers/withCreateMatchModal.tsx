import { MatchCreateModal } from 'Components/Modals';
import { ShowToastError } from 'Components/Toast';
import { matchMessages } from 'const';
import { CreateMathModalContext } from 'context';
import { makeSelector } from 'helpers';
import { IOpenFormParams, useFormInModal } from 'hooks';
import { IUserProfileResp, MatchList } from 'interfaces';
import React from 'react';
import { useSelector } from 'react-redux';

export type WithCreateMatchModal = typeof CreateMathModalContext;

export const withCreateMatchModal = (ChildComponent: any) => {
  const Wrapper: React.FC<any> = (props) => {
    const { data } = useSelector<any, MatchList>(
      makeSelector(['matchesReducer', 'matchList']),
    );

    // console.log('matchesReducer data from withCreateMatchModal',data );
    const { activeCompetitionId, balance } = useSelector<any, IUserProfileResp>(
      makeSelector(['profileReducer', 'userData']),
    );

    // Create match modal
    const {
      promptTitle: createPromptTitle,
      formInitialValues: createFormInitialValues,
      isPrompt: isCreatePrompt,
      closeEditor: closeCreateEditor,
      openEditor: openCreateEditor,
      isEditModal,
    } = useFormInModal(data, 'match');

    const handleOpen = (params?: IOpenFormParams['initialValues']) => {
      const onOpen = openCreateEditor(params);

      return () => {
        if (Boolean(activeCompetitionId) && !params) {
          ShowToastError({
            title: matchMessages.HAVE_ACTIVE_MATCH,
          });
          return () => {};
        }
        if (!balance) {
          ShowToastError({
            title: matchMessages.BALANCE_ERROR,
          });
          return () => {};
        }
        onOpen();
      };
    };

    return (
      <>
        <CreateMathModalContext.Provider
          value={{
            closeCreateMatchModal: closeCreateEditor,
            openCreateMatchModal: handleOpen,
          }}
        >
          <ChildComponent {...props} />
          <MatchCreateModal
            initialValues={createFormInitialValues}
            isPrompt={isCreatePrompt}
            closeEditor={closeCreateEditor}
            promptTitle={createPromptTitle}
            isEditModal={isEditModal}
          />
        </CreateMathModalContext.Provider>
      </>
    );
  };

  return Wrapper;
};
