import { isValidMethod, splitEndpointName } from '@typed-web-api/common';
import { IRouter } from 'express';
import { exposeEndpointHandler } from './expose-endpoint-handler';
import { ServerEndpoints } from './server-endpoints';

export type UseServerEndpointsResult = {
  exposedEndpoints: string[];
  failedEndpoints: string[];
};

export function useServerEndpoints<T extends ServerEndpoints<any>>(
  iRouter: IRouter,
  endpoints: T,
): UseServerEndpointsResult {
  const result: UseServerEndpointsResult = {
    exposedEndpoints: [],
    failedEndpoints: [],
  };

  Object.keys(endpoints).forEach((endpointName) => {
    const { path, method } = splitEndpointName(endpointName);

    if (isValidMethod(method)) {
      exposeEndpointHandler(iRouter, method, path, endpoints[endpointName]);
      result.exposedEndpoints.push(endpointName);
    } else {
      result.failedEndpoints.push(endpointName);
    }
  });

  return result;
}
