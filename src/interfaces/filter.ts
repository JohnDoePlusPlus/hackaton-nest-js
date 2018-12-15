export type Filter<T> = {
  [P in keyof T]: Array<T[P]>;
};
