import { Dictionary } from './dictionary';

export type JsonBody<TJsonBody extends {}> = {
  jsonBody: TJsonBody;
};

export type UrlParams<TParams extends Dictionary<string>> = {
  urlParams: TParams;
};

export type QueryString<TQuery extends Dictionary<string>> = {
  queryString: TQuery;
};

export type JsonBody_UrlParams<
  TJsonBody extends {},
  TParams extends Dictionary<string>,
> = JsonBody<TJsonBody> & UrlParams<TParams>;

export type JsonBody_QueryString<
  TJsonBody extends {},
  TQuery extends Dictionary<string>,
> = JsonBody<TJsonBody> & QueryString<TQuery>;

export type UrlParams_QueryString<
  TParams extends Dictionary<string>,
  TQuery extends Dictionary<string>,
> = UrlParams<TParams> & QueryString<TQuery>;

export type JsonBody_UrlParams_QueryString<
  TJsonBody extends {},
  TParams extends Dictionary<string>,
  TQuery extends Dictionary<string>,
> = JsonBody<TJsonBody> & UrlParams<TParams> & QueryString<TQuery>;

export type RequestPayload =
  | {}
  | JsonBody<any>
  | UrlParams<any>
  | QueryString<any>
  | JsonBody_UrlParams<any, any>
  | JsonBody_QueryString<any, any>
  | UrlParams_QueryString<any, any>
  | JsonBody_UrlParams_QueryString<any, any, any>;
