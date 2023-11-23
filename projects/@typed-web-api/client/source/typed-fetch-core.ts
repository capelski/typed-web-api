import { ApiDefinition, Dictionary, splitPathMethod } from '@typed-web-api/common';
import { TypedFetchArguments } from './typed-fetch-arguments';
import { TypedResponse } from './typed-response';

export type GetTypedFetchCoreOptions = {
  baseUrl?: string;
};

export type GetTypedFetchOptions = GetTypedFetchCoreOptions & {
  fetch?: Window['fetch'];
};

export const getTypedFetchCore = <TApi extends ApiDefinition>(
  fetchDependency: Window['fetch'],
  baseOptions: GetTypedFetchCoreOptions = {},
) => {
  return function typedFetch<TPath_Method extends keyof TApi>(
    ...args: TypedFetchArguments<TApi, TPath_Method>
  ) {
    const [path_method, options] = args;

    const jsonBody = options && 'jsonBody' in options && options.jsonBody;
    const queryString = options && 'queryString' in options && options.queryString;
    const urlParams = options && 'urlParams' in options && options.urlParams;

    const { method, path } = splitPathMethod(String(path_method));

    const prefixedUrl = options?.urlPrefix ? options.urlPrefix + path : path;
    const basedUrl = baseOptions.baseUrl ? baseOptions.baseUrl + prefixedUrl : prefixedUrl;

    const paramUrl = urlParams
      ? Object.keys(urlParams).reduce((reduced, paramName) => {
          const paramValue = urlParams[paramName];
          return reduced.replace(`:${paramName}`, paramValue);
        }, basedUrl)
      : basedUrl;

    const queryUrl =
      queryString && Object.keys(queryString).length > 0
        ? paramUrl + '?' + new URLSearchParams(queryString).toString()
        : paramUrl;

    let body = options?.init?.body;
    let headers = options?.init?.headers || {};

    if (jsonBody) {
      body = JSON.stringify(jsonBody);
      (headers as Dictionary<string>)['Content-Type'] = 'application/json';
    }

    return fetchDependency(queryUrl, {
      ...options?.init,
      headers,
      body,
      method,
    }) as Promise<TypedResponse<TApi[TPath_Method]['response']>>;
  };
};
