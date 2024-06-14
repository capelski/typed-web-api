import { Dictionary } from './dictionary';

export type QueryStringBase = Dictionary<string>;
export type UrlParamsBase = Dictionary<string>;

export type JsonBody<TJsonBody extends {}> = {
  jsonBody: TJsonBody;
};

export type UrlParams<TParams extends UrlParamsBase> = {
  urlParams: TParams;
};

export type QueryString<TQuery extends QueryStringBase> = {
  queryString: TQuery;
};

export type JsonBody_UrlParams<
  TJsonBody extends {},
  TParams extends UrlParamsBase,
> = JsonBody<TJsonBody> & UrlParams<TParams>;

export type JsonBody_QueryString<
  TJsonBody extends {},
  TQuery extends QueryStringBase,
> = JsonBody<TJsonBody> & QueryString<TQuery>;

export type UrlParams_QueryString<
  TParams extends UrlParamsBase,
  TQuery extends QueryStringBase,
> = UrlParams<TParams> & QueryString<TQuery>;

export type JsonBody_UrlParams_QueryString<
  TJsonBody extends {},
  TParams extends UrlParamsBase,
  TQuery extends QueryStringBase,
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
