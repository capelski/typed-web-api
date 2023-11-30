import { ApiDefinition } from '@typed-web-api/common';
import { RequestHandler } from 'express';
import { EndpointResponse } from './endpoint-response';

export type EndpointHandler<T> = (...args: Parameters<RequestHandler>) => EndpointResponse<T>;

export type ServerEndpoints<TApi extends ApiDefinition> = {
  [TPath_Method in keyof TApi]: EndpointHandler<TApi[TPath_Method]['response']>;
};
