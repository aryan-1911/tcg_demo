import {
  CHANGE_FILTERS_DATA,
  CHANGE_SORT_VALUE, matchFilterSliderMarks,
  QueryOrder, RESET_ALL_FILTERS
} from 'const';
import Immutable from 'immutable';
import { IMatchesFilterQuery } from 'interfaces';
import { handleActions } from 'redux-actions';

export interface FiltersReducerState {
  filters: IMatchesFilterQuery;
  sortValue: QueryOrder;
}

const initialState = Immutable.fromJS({
  filters: {
    arena: false,
    bo1: false,
    bo3: false,
    bo5: false,
    custom: false,
    duel: false,
    expanded: false,
    historic: false,
    theme: false,
    modern: false,
    pioneer: false,
    legacy: false,
    vintage: false,
    pauper: false,
    my_matches: false,
    pokemon: false,
    standard: false,
    unlimited: false,
    entry: matchFilterSliderMarks[0].valueReal,
  },
  sortValue: QueryOrder.RECENT,
});

const filtersReducer = handleActions(
  {
    [CHANGE_FILTERS_DATA]: (state: any, { payload }) => {
      return state.set('filters', payload);
    },
    [CHANGE_SORT_VALUE]: (state: any, { payload }) => {
      return state.set('sortValue', payload);
    },
    [RESET_ALL_FILTERS]: () => {
      return initialState;
    },
  },
  initialState,
);

export default filtersReducer;
