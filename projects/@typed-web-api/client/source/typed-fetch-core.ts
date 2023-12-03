import { ApiDefinition, splitEndpointName } from '@typed-web-api/common';
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
  return function typedFetch<TEndpointName extends keyof TApi>(
    ...[endpointName, options]: TypedFetchArguments<TApi, TEndpointName>
  ) {
    const { method, path } = splitEndpointName(String(endpointName));

    const url = buildUrl(path, { ...options, baseUrl: baseOptions.baseUrl });
    const requestInit = buildRequestInit(method, options);

    return fetchDependency(url, requestInit) as Promise<
      TypedResponse<TApi[TEndpointName]['response']>
    >;
  };
};
