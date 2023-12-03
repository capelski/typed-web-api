import { RequestPayload } from './request-payload';

export type EndpointDefinition<TResponse, TRequest extends RequestPayload = {}> = {
  response: TResponse;
  payload: TRequest;
};

export type ApiDefinition = {
  [endpointName: string]: EndpointDefinition<any>;
};
