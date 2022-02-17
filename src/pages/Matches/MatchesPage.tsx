/* eslint-disable */
import { Icon } from '@material-ui/core';
import { deleteMatchAction, getMatchesAction } from 'actions';
import {
  changeFiltersDataAction,
  changeSortValueAction
} from 'actions/filtersActions';
import {
  Button,
  FormSortDropDown,
  FromFilterDropDown
} from 'Components/common/form';
import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
import { MatchCard } from 'Components/MatchCard';
import PageHeader from 'Components/PageHeader';
import Pagination from 'Components/Pagination';
import {
  matchFilterCheckboxes,
  matchFilterSliderMarks,
  QueryOrder,
  sortMatchOptions
} from 'const';
import {
  CreateMathModalContext,
  DetailMatchModalContext,
  InfoModalContext
} from 'context';
import { makeSelector } from 'helpers';
import { usePagination } from 'hooks';
import { IMatch, IMatchesFilterQuery, IUserProfileResp } from 'interfaces';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MatchesReducerState } from 'reducers';
import './matches-page.scss';

export const MatchesPage = () => {
  const { getList, queryParams, sortValue, filters, isLoading } = usePagination({
    getListAction: getMatchesAction,
    queryName: 'matchesQueryParams',
    reducerName: 'matchesReducer',
  });

  const {
    matchList: {
      data,
      pagination: { pageCount },
    },
  } = useSelector<any, MatchesReducerState>(makeSelector(['matchesReducer']));

  useEffect(() => {
    getList(queryParams, sortValue, filters);
  }, []);

  const userData = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const { openCreateMatchModal } = useContext(CreateMathModalContext);
  const { openDetailMatchModal } = useContext(DetailMatchModalContext);
  const { openInfoModal } = useContext(InfoModalContext);

  const handleSort = (order: QueryOrder, filters) => {
    dispatch(changeSortValueAction(order));
    getList(queryParams, order, filters);
  };

  const handleFilter = (filter: IMatchesFilterQuery) => {
    dispatch(changeFiltersDataAction(filter));
    getList(queryParams, sortValue, filter);
  };

  const onRefresh = () => {
    getList(queryParams, sortValue, filters);
  };


  const createBtn = (
    <Button onClick={openCreateMatchModal()} btnType="create">
      Create Match
    </Button>
  );

  const renderControls = () => {
    return (
      <div className="match-page__controls">
        <span>All Matches</span>
        <div className="match-page__controls-box">
          <FormSortDropDown
            options={sortMatchOptions}
            defaultValue={sortValue}
            onSort={handleSort}
            filters={filters}
          />
          <FromFilterDropDown
            options={matchFilterCheckboxes}
            sliderMarks={matchFilterSliderMarks}
            onFilter={handleFilter}
            defaultValues={filters}
          />
          <Button className="match-page__controls-item" onClick={onRefresh}>
            <>
              <Icon className="icon-refresh" />
              Refresh
            </>
          </Button>
        </div>
      </div>
    );
  };

  const dispatch = useDispatch();

  const handleTurn = (card) => {
    const id = userData.activeCompetitionId;
    id && dispatch(deleteMatchAction(id));
    openDetailMatchModal(card)();
  };

  const handleClickCard = (card) => {
    const { userId, winner, status } = card;
    const { id, activeCompetitionId: hasActive } = userData;
    const isOwn = id === userId;

    const canTurnOtherMatch = !!hasActive && !isOwn && !winner && !status;

    if (canTurnOtherMatch) {
      return openInfoModal({
        onOk: () => handleTurn(card),
        title: 'You have already created your own match',
        text: 'Delete your own match first to play with others.Do you want to delete it and proceed with a new match?',
        type: 'delete',
      });
    } else {
      return openMatchDetailModal(card);
    }
  };

  const openMatchDetailModal = (card: IMatch) => () => {
    openDetailMatchModal(card)();
  };

  let matchesLength = data.length;
  return (
    <div className="match-page">
      <div className='height--full'>
        <PageHeader title={renderControls()} btns={createBtn} />
        <div className={`match-page__list ${(matchesLength <= 0) ? 'no-matches' : ''}`}>
          {
            isLoading ? <LoadingButton></LoadingButton> : ((data.length > 0)) ? data.map((card) => {
              return (
                <MatchCard
                  onClick={handleClickCard(card)}
                  key={card.id}
                  matchData={card}
                  profileId={userData.id}
                />
              );
            }) : <h2 className="matches not found">No matches available.</h2>
          }
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
    </div>
  );
};
