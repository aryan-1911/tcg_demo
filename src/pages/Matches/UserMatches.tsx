import { Icon } from '@material-ui/core';
import { getProfileMatchesAction, getUserMatchesAction } from 'actions';
import { Button } from 'Components/common/form';
import { MatchCard } from 'Components/MatchCard';
import PageHeader from 'Components/PageHeader';
import Pagination from 'Components/Pagination';
import { CreateMathModalContext } from 'context';
import { makeSelector } from 'helpers';
import { useFormInModal, usePagination } from 'hooks';
import { IMatch, IUserProfileResp, MatchList } from 'interfaces';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { MatchesReducerState } from 'reducers';
import { MatchDetail } from './Components';
import './matches-page.scss';


export const UserMatches = () => {
  const userData = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const { pathname } = useLocation();
  const profileId = pathname.slice(pathname.lastIndexOf('/') + 1);

  const isSpecificPage = profileId !== userData.id;

  const reducerName = isSpecificPage ? 'userReducer' : 'profileReducer';

  const { getList, isLoading, queryParams } = usePagination({
    getListAction: (params) => {
      return isSpecificPage
        ? getUserMatchesAction({ ...params, user_id: profileId })
        : getProfileMatchesAction(params);
    },
    queryName: 'matchesQueryParams',
    reducerName: reducerName,
  });

  const { competition } = useSelector<any, MatchesReducerState['secondModal']>(
    makeSelector(['matchesReducer', 'secondModal']),
  );

  const {
    data,
    pagination: { pageCount },
  } = useSelector<any, MatchList>(makeSelector([reducerName, 'matchList']));

  const history = useHistory();

  const { openCreateMatchModal } = useContext(CreateMathModalContext);

  // Detail match modal
  const {
    formInitialValues: detailFormInitialValues,
    isPrompt: isDetailPrompt,
    closeEditor: closeDetailEditor,
    openEditor: openDetailEditor,
  } = useFormInModal(data, 'match');

  const openEditMatchModal = (card: IMatch) => () => {
    openCreateMatchModal(card)();
    closeDetailEditor();
  };

  const openMatchDetailModal = (card: IMatch) => () => {
    openDetailEditor(card)();
  };

  const renderControls = () => {
    return (
      <>
        <span>{isSpecificPage ? 'Match History' : 'Match History'}</span>
        <Button
          className="match-page__back"
          preffix={<Icon className="icon-direction_arrow" />}
          onClick={() => history.goBack()}
        >
          Go back
        </Button>
      </>
    );
  };

  const isStarted =
    detailFormInitialValues.id === competition?.competition.id &&
    competition?.status !== 'NEW';

  return (
    <div className="match-page">
      <div>
        <PageHeader title={renderControls()} />
        <div className="match-page__list">
          {data.map((card) => {
            return (
              <MatchCard
                onClick={openMatchDetailModal(card)}
                key={card.id}
                matchData={card}
                profileId={profileId}
              />
            );
          })}
        </div>
      </div>
      <div className="match-page__box">
        <div className="match-page__pagination">
          <Pagination
            initialQuery={queryParams}
            pageCount={pageCount}
            getList={getList}
          />
        </div>
      </div>
      <MatchDetail
        userData={userData}
        initialValues={detailFormInitialValues}
        isPrompt={isDetailPrompt}
        closeEditor={closeDetailEditor}
        openEditMatchModal={openEditMatchModal}
        isStarted={isStarted}
        specProfileId={profileId}
      />
    </div>
  );
};
