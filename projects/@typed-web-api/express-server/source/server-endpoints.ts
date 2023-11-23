import { ApiDefinition, HttpMethods, splitPathMethod } from '@typed-web-api/common';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { EndpointResponse } from './endpoint-response';

export type AppOrRouter = {
  [key in HttpMethods]: (path: string, handler: RequestHandler) => void;
};

export type ServerEndpoints<TApi extends ApiDefinition> = {
  [TPath_Method in keyof TApi]: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => EndpointResponse<TApi[TPath_Method]['response']>;
};

export function useServerEndpoints<T extends ServerEndpoints<any>>(app: AppOrRouter, endpoints: T) {
  Object.keys(endpoints).forEach((path_method) => {
    try {
      const { path, method } = splitPathMethod(path_method);
      app[method](path, (req, res, next) => {
        const { payload, status } = endpoints[path_method](req, res, next);
        if (status) {
          res.status(status);
        }
        res.send(payload);
      });
    } catch (error) {
      console.error(error);
    }
  });
}
