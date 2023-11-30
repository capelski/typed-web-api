import { Dictionary, splitPathMethod } from '@typed-web-api/common';
import { IRouter } from 'express';
import { exposeEndpointHandler } from './expose-endpoint-handler';
import { ServerEndpoints } from './server-endpoints';

export type UseServerEndpointsOptions = {
  /** Throw an error on invalid endpoint names. Defaults to false */
  failOnInvalidNames?: boolean;
};

export type UseServerEndpointsResult = {
  failedEndpoints: Dictionary<string>;
  successfulEndpoints: string[];
};

export function useServerEndpoints<T extends ServerEndpoints<any>>(
  app: IRouter,
  endpoints: T,
  { failOnInvalidNames }: UseServerEndpointsOptions = {},
): UseServerEndpointsResult {
  const result: UseServerEndpointsResult = {
    failedEndpoints: {},
    successfulEndpoints: [],
  };

  Object.keys(endpoints).forEach((endpointName) => {
    try {
      const { path, method } = splitPathMethod(endpointName);
      exposeEndpointHandler(app, method, path, endpoints[endpointName]);
      result.successfulEndpoints.push(endpointName);
    } catch (error) {
      result.failedEndpoints[endpointName] = (error as Error).message;
    }
  });

  if (failOnInvalidNames && Object.keys(result.failedEndpoints).length > 0) {
    throw new Error(Object.values(result.failedEndpoints).join('\n'));
  }

  return result;
}
