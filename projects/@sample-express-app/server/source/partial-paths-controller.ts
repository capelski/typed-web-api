import { PartialPathEndpoints } from '@sample-express-app/common';
import { ServerEndpoints, TypedExpressRequest } from '@typed-web-api/express-server';
import { sampleEndpointCore } from './sample-endpoint-core';

export const partialPathsController: ServerEndpoints<PartialPathEndpoints> = {
  '/weather_get'(req: TypedExpressRequest<PartialPathEndpoints, '/weather_get'>) {
    return sampleEndpointCore(req.query.cityName);
  },

  '/weather_post'(req: TypedExpressRequest<PartialPathEndpoints, '/weather_post'>) {
    return sampleEndpointCore(req.body?.cityName);
  },

  '/weather/:cityName_get'(
    req: TypedExpressRequest<PartialPathEndpoints, '/weather/:cityName_get'>,
  ) {
    return sampleEndpointCore(req.params.cityName);
  },
};
