// tslint:disable: variable-name

import { QueryDef, QueryOrder, resetMatchFilter, SORT_BY } from 'const';
import { IMatchesFilterQuery } from 'interfaces';

export class QueryParams {
  search?: string;
  filter?: IMatchesFilterQuery = resetMatchFilter();
  limit?: number = QueryDef.LIMIT;
  sort_direction?: QueryOrder = QueryDef.ORDER;
  query?: string = '';
  page?: number = 1; // page
  sort_by?: SORT_BY = QueryDef.SORT_BY;
  user_id?: string = '';
}

// for immutable
export const resetQueryParamsModel = (isFilter: boolean): QueryParams => {
  const result: QueryParams = {
    search: '',
    limit: QueryDef.LIMIT,
    sort_direction: QueryDef.ORDER,
    sort_by: QueryDef.SORT_BY,
  };
  if (isFilter) {
    result.filter = resetMatchFilter();
  }

  return result;
};
