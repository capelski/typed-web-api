import { BadRequestException, Body, Controller, Param, Query } from '@nestjs/common';
import { HttpMethod, ServerEndpoints } from '@typed-web-api/nestjs';
import { validateCityName, WeatherV3EndpointInput, WeatherV3Endpoints } from 'sample-common';
import { AppService } from './app.service';

/** Different implementation of WeatherEndpoints (breaking changes) exposed at a different URL */

@Controller()
export class WeatherV3Controller implements ServerEndpoints<WeatherV3Endpoints> {
  constructor(private readonly appService: AppService) {}

  @HttpMethod()
  '/v3/weather_get'(@Query() { city_name }: WeatherV3EndpointInput) {
    const cityNameValidation = validateCityName(city_name);

    if (!cityNameValidation.valid) {
      throw new BadRequestException({ errorMessage: cityNameValidation.message });
    }

    // Asynchronous just for demonstration purposes
    return Promise.resolve(this.appService.getRandomWeather());
  }

  @HttpMethod()
  '/v3/weather_post'(@Body() { city_name }: WeatherV3EndpointInput) {
    const cityNameValidation = validateCityName(city_name);

    if (!cityNameValidation.valid) {
      throw new BadRequestException({ errorMessage: cityNameValidation.message });
    }

    return this.appService.getRandomWeather();
  }

  @HttpMethod()
  '/v3/weather/:city_name_get'(@Param() { city_name }: WeatherV3EndpointInput) {
    const cityNameValidation = validateCityName(city_name);

    if (!cityNameValidation.valid) {
      throw new BadRequestException({ errorMessage: cityNameValidation.message });
    }

    return this.appService.getRandomWeather();
  }
}
