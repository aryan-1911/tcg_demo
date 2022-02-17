export interface IImmutableMap<T> {
  toJS(): T;
  get<K extends keyof T>(name: K): T[K];
  set<S>(k: string, o: S): IImmutableMap<T & S>;
  getIn(searchKeyPath: any[], notSetValue?: any): T;
  setIn(searchKeyPath: any[], notSetValue?: any): T;
}

export type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};
