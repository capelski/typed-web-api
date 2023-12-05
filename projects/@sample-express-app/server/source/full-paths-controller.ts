import { FullPathEndpoints } from '@sample-express-app/common';
import { ServerEndpoints, TypedExpressRequest } from '@typed-web-api/express';
import { sampleEndpointCore } from './sample-endpoint-core';

export const fullPathsController: ServerEndpoints<FullPathEndpoints> = {
  '/full-path/weather_get'(req: TypedExpressRequest<FullPathEndpoints, '/full-path/weather_get'>) {
    return sampleEndpointCore(req.query.cityName);
  },

  '/full-path/weather_post'(
    req: TypedExpressRequest<FullPathEndpoints, '/full-path/weather_post'>,
  ) {
    return sampleEndpointCore(req.body?.cityName);
  },

  '/full-path/weather/:cityName_get'(
    req: TypedExpressRequest<FullPathEndpoints, '/full-path/weather/:cityName_get'>,
  ) {
    return sampleEndpointCore(req.params.cityName);
  },
};
