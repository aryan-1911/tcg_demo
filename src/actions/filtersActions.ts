import { IActionFn, IMatchesFilterQuery } from 'interfaces';
import { QueryOrder, CHANGE_FILTERS_DATA, CHANGE_SORT_VALUE } from 'const';

export const changeFiltersDataAction: IActionFn<IMatchesFilterQuery> = (
  payload,
) => ({
  payload,
  type: CHANGE_FILTERS_DATA,
});

export const changeSortValueAction: IActionFn<QueryOrder> = (payload) => ({
  payload,
  type: CHANGE_SORT_VALUE,
});
