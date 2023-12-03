import { HttpMethods } from './http-methods';

export type EndpointProps = {
  method: HttpMethods;
  path: string;
};
