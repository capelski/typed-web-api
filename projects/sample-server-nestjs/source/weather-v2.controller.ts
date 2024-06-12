import { Controller } from '@nestjs/common';
import { WeatherController } from './weather.controller';

/** Different implementation of WeatherEndpoints (no breaking changes) exposed at a different URL.
 * Re-using WeatherController for simplicity */

@Controller('/v2') // Controller prefix
export class WeatherV2Controller extends WeatherController {}
