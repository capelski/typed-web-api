export type TypedResponse<T> = Omit<Response, 'json'> & {
  json: () => Promise<T>;
};
