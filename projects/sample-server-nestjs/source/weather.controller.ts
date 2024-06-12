import { BadRequestException, Body, Controller, Param, Query } from '@nestjs/common';
import { HttpMethod, ServerEndpoints } from '@typed-web-api/nestjs';
import { validateCityName, WeatherEndpoints } from 'sample-common';
import { AppService } from './app.service';

@Controller()
export class WeatherController implements ServerEndpoints<WeatherEndpoints> {
  constructor(private readonly appService: AppService) {}

  @HttpMethod()
  '/weather_get'(@Query('cityName') cityName: string) {
    const cityNameValidation = validateCityName(cityName);

    if (!cityNameValidation.valid) {
      throw new BadRequestException({ errorMessage: cityNameValidation.message });
    }

    // Asynchronous just for demonstration purposes
    return Promise.resolve(this.appService.getRandomWeather());
  }

  @HttpMethod()
  '/weather_post'(@Body('cityName') cityName: string) {
    const cityNameValidation = validateCityName(cityName);

    if (!cityNameValidation.valid) {
      throw new BadRequestException({ errorMessage: cityNameValidation.message });
    }

    return this.appService.getRandomWeather();
  }

  @HttpMethod()
  '/weather/:cityName_get'(@Param('cityName') cityName: string) {
    const cityNameValidation = validateCityName(cityName);

    if (!cityNameValidation.valid) {
      throw new BadRequestException({ errorMessage: cityNameValidation.message });
    }

    return this.appService.getRandomWeather();
  }
}
