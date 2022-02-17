export const FORMAT_DATE_WITH_TIME = 'MM-dd-yyyy hh:mm';
export const FORMAT_DATE_WITH_TIME_CST = 'MM-DD-YYYY HH:mm:ss';
export const FORMAT_DATE_SERVER = 'yyyy-MM-dd';

export enum QueryOrder {
  RECENT = 'recent',
  ASC = 'asc',
  DESC = 'desc',
}

export enum SORT_BY {
  created = 'created',
  entry = 'entry',
}

export const QueryDef = {
  LIMIT: 9,
  OFFSET: 0,
  ORDER: QueryOrder.RECENT,
  SORT_BY: SORT_BY.created,
};
