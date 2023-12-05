import {
  ApiDefinition,
  JsonBody,
  JsonBody_QueryString,
  JsonBody_UrlParams,
  JsonBody_UrlParams_QueryString,
  QueryString,
  UrlParams,
  UrlParams_QueryString,
} from '@typed-web-api/common';
import { Request } from 'express';

export type TypedExpressRequest<
  TApi extends ApiDefinition,
  TEndpointName extends keyof TApi,
> = Omit<Omit<Omit<Request, 'body'>, 'params'>, 'query'> &
  TApi[TEndpointName]['payload'] extends JsonBody_UrlParams_QueryString<
  infer TBody,
  infer TParams,
  infer TQuery
>
  ? {
      body?: TBody;
      params: Partial<TParams>;
      query: Partial<TQuery>;
    }
  : TApi[TEndpointName]['payload'] extends JsonBody_UrlParams<infer TBody, infer TParams>
    ? {
        body?: TBody;
        params: Partial<TParams>;
        query: Request['query'];
      }
    : TApi[TEndpointName]['payload'] extends JsonBody_QueryString<infer TBody, infer TQuery>
      ? {
          body?: TBody;
          params: Request['params'];
          query: Partial<TQuery>;
        }
      : TApi[TEndpointName]['payload'] extends UrlParams_QueryString<infer TParams, infer TQuery>
        ? {
            body: Request['body'];
            params: Partial<TParams>;
            query: Partial<TQuery>;
          }
        : TApi[TEndpointName]['payload'] extends JsonBody<infer TBody>
          ? {
              body?: TBody;
              params: Request['params'];
              query: Request['query'];
            }
          : TApi[TEndpointName]['payload'] extends UrlParams<infer TParams>
            ? {
                body: Request['body'];
                params: Partial<TParams>;
                query: Request['query'];
              }
            : TApi[TEndpointName]['payload'] extends QueryString<infer TQuery>
              ? {
                  body: Request['body'];
                  params: Request['params'];
                  query: Partial<TQuery>;
                }
              : {
                  body: Request['body'];
                  params: Request['params'];
                  query: Request['query'];
                };
