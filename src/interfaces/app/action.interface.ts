export interface IAction<T = null> {
  type: string;
  payload: T;
  params?: {
    signal?: AbortSignal;
    redirect?: (param?: any) => void;
  };
}

export type IActionFn<T = null, Y = T> = (
  payload: T,
  params?: {
    signal?: AbortSignal;
    redirect?: (param?: any) => void;
  },
) => IAction<Y>;
