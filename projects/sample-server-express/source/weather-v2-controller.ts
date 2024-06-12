import { ServerEndpoints } from '@typed-web-api/express';
import { WeatherEndpoints } from 'sample-common';
import { weatherController } from './weather-controller';

/** Different implementation of WeatherEndpoints (no breaking changes) exposed at a different URL.
 * Re-using weatherController for simplicity */

export const weatherV2Controller: ServerEndpoints<WeatherEndpoints> = weatherController;
