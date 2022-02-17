import { toggleDetailMatchAction } from 'actions';
import { CreateMathModalContext, DetailMatchModalContext } from 'context';
import { makeSelector } from 'helpers';
import { useFormInModal } from 'hooks';
import { IMatch, IUserProfileResp } from 'interfaces';
import { MatchDetail } from 'pages/Matches/Components';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MatchesReducerState } from 'reducers';

export type WithDetailMatchModal = typeof DetailMatchModalContext;

export const withDetailMatchModal = (ChildComponent: any) => {
  const Wrapper: React.FC<any> = (props) => {
    const detailMatchLink = useSelector<any, any>((state) => {
      return state.getIn(['matchesReducer', 'detailMatch']);
    });

    const {
      detailMatch,
      matchList: { data },
      secondModal: { competition },
    } = useSelector<any, MatchesReducerState>(makeSelector(['matchesReducer']));

    const userData = useSelector<any, IUserProfileResp>(
      makeSelector(['profileReducer', 'userData']),
    );

    const dispatch = useDispatch();

    // Detail match modal
    const {
      formInitialValues: detailFormInitialValues,
      isPrompt: isDetailPrompt,
      closeEditor: closeDetailEditor,
      openEditor: openDetailEditor,
    } = useFormInModal(data, 'match');

    useEffect(() => {
      if (detailMatch) {
        openDetailEditor(detailMatch)();
      }
    }, [detailMatchLink]);

    const { openCreateMatchModal } = useContext(CreateMathModalContext);

    const openEditMatchModal = (card: IMatch) => () => {
      openCreateMatchModal(card)();
      handleCloseModal();
    };

    const handleCloseModal = () => {
      closeDetailEditor();
      dispatch(toggleDetailMatchAction(null));
    };

    const isStarted =
      detailFormInitialValues.id === competition?.competition.id &&
      competition?.status !== 'NEW';

    return (
      <>
        <DetailMatchModalContext.Provider
          value={{
            closeDetailMatchModal: handleCloseModal,
            openDetailMatchModal: openDetailEditor,
          }}
        >
          <ChildComponent {...props} />
          <MatchDetail
            userData={userData}
            initialValues={detailFormInitialValues}
            isPrompt={isDetailPrompt}
            closeEditor={handleCloseModal}
            openEditMatchModal={openEditMatchModal}
            isStarted={isStarted}
          />
        </DetailMatchModalContext.Provider>
      </>
    );
  };

  return Wrapper;
};
