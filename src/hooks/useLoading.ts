import { makeSelector } from 'helpers';
import { useSelector } from 'react-redux';

export const useLoading = (
  getInParam: string | string[],
  deps: any[] = [],
): boolean => {
  const getInKeys =
    typeof getInParam === 'string'
      ? [getInParam, 'isLoading'] // if it's reducer name
      : getInParam;
  return (
    useSelector(makeSelector(getInKeys)) ||
    deps.some((d) => typeof d === 'undefined' || !Boolean(d))
  );
};
