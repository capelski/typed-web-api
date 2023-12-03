import { EndpointProps } from './endpoint-props';
import { HttpMethods } from './http-methods';

export const splitEndpointName = (endpointName: string): EndpointProps => {
  const parts = endpointName.split('_');
  const method = parts[parts.length - 1] as HttpMethods;
  const path = parts.slice(0, parts.length - 1).join('_');

  return {
    method,
    path,
  };
};
