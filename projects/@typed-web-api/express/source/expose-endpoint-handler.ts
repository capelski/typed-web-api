import { HttpMethods } from '@typed-web-api/common';
import { IRouter, RequestHandler } from 'express';
import { EndpointHandler } from './server-endpoints';

export function exposeEndpointHandler(
  app: IRouter,
  method: HttpMethods,
  path: string,
  handler: EndpointHandler<any>,
) {
  const wrapper: RequestHandler = async (req, res, next) => {
    const { payload, status } = await handler(req, res, next);
    if (status) {
      res.status(status);
    }
    res.send(payload);
  };

  app[method](path, wrapper);

  return wrapper;
}
