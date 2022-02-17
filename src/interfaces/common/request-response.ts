export interface IPagination {
  pageCount: number;
  currentPage: number;
  itemCount: number;
}

export interface PaginationWrapper<T = any> {
  data: T[];
  pagination: IPagination;
  error?: any;
  draw?: any;
}

export const resetListPaginatedModel = <T>(): PaginationWrapper<T> => ({
  data: [],
  pagination: {
    pageCount: 0,
    itemCount: 0,
    currentPage: 0,
  },
});
