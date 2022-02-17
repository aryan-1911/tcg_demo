import { GET_STATIC_PAGE } from 'const';
import { IActionFn, StaticPageTypes } from 'interfaces';

export const getStaticPageAction: IActionFn<StaticPageTypes> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: GET_STATIC_PAGE.PENDING,
});
