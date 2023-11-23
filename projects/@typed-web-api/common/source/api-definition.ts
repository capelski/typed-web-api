import { RequestPayload } from './request-payload';

export type EndpointDefinition<TResponse, TRequest extends RequestPayload = {}> = {
  response: TResponse;
  payload: TRequest;
};

export type ApiDefinition = {
  [path_method: string]: EndpointDefinition<any>;
};
