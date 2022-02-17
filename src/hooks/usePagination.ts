import { QueryOrder } from 'const';
import { makeSelector } from 'helpers';
import { useLoading } from 'hooks';
import { IActionFn, IMatchesFilterQuery, QueryParams } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';

interface IUsePaginationProps {
  reducerName: string;
  queryName: string;
  getListAction: IActionFn<QueryParams>;
}

export const usePagination = (props: IUsePaginationProps) => {
  const { reducerName, queryName, getListAction } = props;
  const dispatch = useDispatch();

  const filters = useSelector<any, IMatchesFilterQuery>(
    makeSelector(['filtersReducer', 'filters']),
  );

  const sortValue = useSelector<any, QueryOrder>(
    makeSelector(['filtersReducer', 'sortValue']),
  );

  const queryParams = useSelector(makeSelector([reducerName, queryName]));

  const isLoading = useLoading(reducerName);

  const getList = (
    evQueryParams?: QueryParams,
    sortValue?: QueryOrder,
    filters?: IMatchesFilterQuery,
  ) => {
    const params: QueryParams = {
      ...queryParams,
      ...evQueryParams,
      sort_direction: sortValue,
      filter: filters,
    };
    dispatch(getListAction(params));
  };

  return { getList, isLoading, queryParams, filters, sortValue };
};
