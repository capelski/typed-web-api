import { ApiDefinition, splitPathMethod } from '@typed-web-api/common';
import { buildRequestInit } from './build-request-init';
import { buildUrl } from './build-url';
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
    ...[path_method, options]: TypedFetchArguments<TApi, TPath_Method>
  ) {
    const { method, path } = splitPathMethod(String(path_method));

    const url = buildUrl(path, { ...options, baseUrl: baseOptions.baseUrl });
    const requestInit = buildRequestInit(method, options);

    return fetchDependency(url, requestInit) as Promise<
      TypedResponse<TApi[TPath_Method]['response']>
    >;
  };
};
